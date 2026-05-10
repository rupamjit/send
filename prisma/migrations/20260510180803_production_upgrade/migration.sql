-- CreateTable
CREATE TABLE "Share" (
    "id" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "textContent" TEXT,
    "type" TEXT,
    "fileKey" TEXT,
    "fileId" TEXT,
    "fileName" TEXT,
    "size" TEXT,
    "password" TEXT,
    "isOneTime" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "maxViews" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "uploadedConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShareFile" (
    "id" TEXT NOT NULL,
    "shareId" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShareFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Share_codeHash_key" ON "Share"("codeHash");

-- CreateIndex
CREATE INDEX "Share_codeHash_idx" ON "Share"("codeHash");

-- CreateIndex
CREATE INDEX "Share_expiresAt_idx" ON "Share"("expiresAt");

-- CreateIndex
CREATE INDEX "Share_isDeleted_expiresAt_idx" ON "Share"("isDeleted", "expiresAt");

-- CreateIndex
CREATE INDEX "ShareFile_shareId_idx" ON "ShareFile"("shareId");

-- AddForeignKey
ALTER TABLE "ShareFile" ADD CONSTRAINT "ShareFile_shareId_fkey" FOREIGN KEY ("shareId") REFERENCES "Share"("id") ON DELETE CASCADE ON UPDATE CASCADE;
