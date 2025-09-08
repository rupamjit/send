import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

function generateCode() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const POST = async (req: NextRequest) => {
  const { expiryTime, key, size, name, type, ufsUrl,text } = await req.json();


  const code = generateCode();


  const sizeInMb = `${(size / (1024 * 1024)).toFixed(2)} MB`;

  const share = await db.share.create({
    data: {
      size: sizeInMb,
      fileName: name,
      type,
      fileId: ufsUrl,
      fileKey: key,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + expiryTime * 60 * 1000),
      codeHash: code,
      textContent:text
    },
  });

console.log(text)
    return NextResponse.json({ 
      message: "Share created successfully",
      accessCode: code,
      shareId: share.id
    });
};
