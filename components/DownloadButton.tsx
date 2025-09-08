"use client";

import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

interface DownloadButtonProps {
  fileKey: string;
  fileName: string;
  size?: string;
  fileUrl?:string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({fileUrl, fileName, size }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl!;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2  text-white rounded-lg transition-colors"
      title="Download file"
    >
      <Download className="w-4 h-4" />
      Download {fileName}
      {size && <span className="text-xs opacity-75">({size})</span>}
    </Button>
  );
};

export { DownloadButton };