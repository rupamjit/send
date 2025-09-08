import { db } from "@/utils/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({
    pdf: {
      maxFileSize: "32GB",
      maxFileCount: 1,
    },
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    return {
      file: {
        name: file.name,
        size: file.size,
        type: file.type,
        key: file.key,
        ufsUrl: file.ufsUrl,
      },
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
