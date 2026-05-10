
import { db } from "@/utils/db";
import bcrypt from "bcryptjs";

//  Types 
export interface CreateSharePayload {
  expiryTime: number;
  text?: string;
  key?: string;
  name?: string;
  type?: string;
  ufsUrl?: string;
  size?: number;
  password?: string;
  isOneTime?: boolean;
  maxViews?: number;
  createdBy?: string; // hashed IP
}

export interface ShareResult {
  success: boolean;
  accessCode?: string;
  error?: string;
}

//  Helpers 

function generateCode(): string {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function generateUniqueCode(): Promise<string> {
  let attempts = 0;
  while (attempts < 5) {
    const code = generateCode();
    const existing = await db.share.findUnique({
      where: { codeHash: code },
      select: { id: true },
    });
    if (!existing) return code;
    attempts++;
  }
  throw new Error("Failed to generate unique code");
}

function hashIp(ip: string): string {
  // Simple hash — no personal data stored
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

//  Service Functions 

export async function createShare(
  payload: CreateSharePayload
): Promise<ShareResult> {
  try {
    const {
      expiryTime,
      text,
      key,
      name,
      type,
      ufsUrl,
      size,
      password,
      isOneTime = false,
      maxViews,
      createdBy,
    } = payload;

    const code = await generateUniqueCode();
    const sizeInMb = size
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : undefined;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    await db.share.create({
      data: {
        codeHash: code,
        textContent: text,
        fileKey: key,
        fileId: ufsUrl,
        fileName: name,
        size: sizeInMb,
        type,
        password: hashedPassword,
        isOneTime,
        maxViews,
        createdBy: createdBy ? hashIp(createdBy) : undefined,
        expiresAt: new Date(Date.now() + expiryTime * 60 * 1000),
        uploadedConfirmed: !!key,
      },
    });

    return { success: true, accessCode: code };
  } catch (error) {
    console.error("[createShare]", error);
    return { success: false, error: "Failed to create share" };
  }
}

export async function getShare(code: string) {
  try {
    const share = await db.share.findUnique({
      where: { codeHash: code },
      include: { files: true },
    });

    if (!share) return { error: "not_found" as const };
    if (share.isDeleted) return { error: "not_found" as const };
    if (new Date() > share.expiresAt) return { error: "expired" as const };

    // Max views check
    if (share.maxViews && share.viewCount >= share.maxViews) {
      return { error: "expired" as const };
    }

    // Increment view count
    await db.share.update({
      where: { id: share.id },
      data: { viewCount: { increment: 1 } },
    });

    // One-time view — soft delete after first view
    if (share.isOneTime && share.viewCount >= 1) {
      await db.share.update({
        where: { id: share.id },
        data: { isDeleted: true },
      });
    }

    return { data: share };
  } catch (error) {
    console.error("[getShare]", error);
    return { error: "server_error" as const };
  }
}

export async function verifySharePassword(
  code: string,
  password: string
): Promise<boolean> {
  try {
    const share = await db.share.findUnique({
      where: { codeHash: code },
      select: { password: true },
    });

    if (!share?.password) return false;
    return await bcrypt.compare(password, share.password);
  } catch {
    return false;
  }
}

export async function incrementDownload(code: string) {
  try {
    await db.share.update({
      where: { codeHash: code },
      data: { downloadCount: { increment: 1 } },
    });
  } catch (error) {
    console.error("[incrementDownload]", error);
  }
}

export async function getShareStats(code: string) {
  try {
    const share = await db.share.findUnique({
      where: { codeHash: code },
      select: {
        codeHash: true,
        viewCount: true,
        downloadCount: true,
        createdAt: true,
        expiresAt: true,
        maxViews: true,
        isOneTime: true,
        fileName: true,
        type: true,
      },
    });
    return share;
  } catch {
    return null;
  }
}

export async function cleanupExpiredShares() {
  try {
    const expired = await db.share.findMany({
      where: {
        isDeleted: false,
        expiresAt: { lt: new Date() },
      },
      select: {
        id: true,
        fileKey: true,
        files: { select: { fileKey: true } },
      },
    });

    if (expired.length === 0) return { deleted: 0, fileKeys: [] };

    // Collect all file keys for UploadThing deletion
    const fileKeys: string[] = expired.flatMap((s) => [
      ...(s.fileKey ? [s.fileKey] : []),
      ...s.files.map((f) => f.fileKey),
    ]);

    // Soft delete all expired shares
    await db.share.updateMany({
      where: { id: { in: expired.map((s) => s.id) } },
      data: { isDeleted: true },
    });

    return { deleted: expired.length, fileKeys };
  } catch (error) {
    console.error("[cleanupExpiredShares]", error);
    return { deleted: 0, fileKeys: [] };
  }
}