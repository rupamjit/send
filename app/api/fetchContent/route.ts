import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();

  const content = await db.share.findFirst({
    where: { codeHash: code },
  });
  return NextResponse.json(content?.codeHash);
}
