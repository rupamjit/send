import { getContent } from "@/actions/getContent";
import { CopyButton } from "@/components/CopyButton";
import { DownloadButton } from "@/components/DownloadButton";
import React from "react";
import Image from "next/image";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const content = await getContent(id);

  if (!content) {
    return (
      <div className="h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Content Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The content you&apos;re looking for doesn&apos;t exist or has expired.
          </p>
        </div>
      </div>
    );
  }

  const expiresAt = content.expiresAt || new Date();
  const date = new Date(expiresAt);

  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  const isExpired = new Date() > date;

  if (isExpired) {
    return (
      <div className="h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Content Expired
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This content expired on {formatted}
          </p>
        </div>
      </div>
    );
  }

  const isText = content.textContent && !content.fileKey;
  const isImage = content.type?.startsWith('image/');
  const isFile = content.fileKey && !isImage;


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Shared Content
            </h1>
            <p className="text-lg font-extrabold highlighted  font-mono">
              {content.codeHash}
            </p>
          </div>
        </div>

        <div className="p-6">
          {isText && (
            <div className="space-y-4">
              <div className="max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 font-mono">
                  {content.textContent}
                </pre>
              </div>
              <div className="flex justify-center">
                <CopyButton textToCopy={content.textContent!} />
              </div>
            </div>
          )}

          {isImage && content.fileKey && (
            <div className="space-y-4">
              <div className="relative max-h-96 overflow-hidden rounded-lg border">
                <Image
                  src={content.fileId!}
                  alt={content.fileName || "Shared image"}
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                  unoptimized 
                />
              </div>
              <div className="flex justify-center">
                <DownloadButton 
                  fileKey={content.fileKey}
                  fileName={content.fileName || "image"}
                  size={content.size!}
                />
              </div>
            </div>
          )}

          {isFile && (
            <div className="space-y-4">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border text-center">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {content.fileName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Type: {content.type}
                  {content.size && <span className="ml-2">• Size: {content.size}</span>}
                </p>
              </div>
              <div className="flex justify-center">
                <DownloadButton 
                fileUrl={content.fileId!}
                  fileKey={content.fileKey!}
                  fileName={content.fileName || "file"}
                  size={content.size!}
                />
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 text-center border-t border-gray-200 dark:border-gray-800 pt-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
            This content will expire on
          </p>
          <p className="text-base font-medium text-gray-900 dark:text-gray-100">
            {formatted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;