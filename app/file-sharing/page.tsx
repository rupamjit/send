"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";


const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [expiryTime, setExpiryTime] = useState([15]);
  const [fileDetails,setFileDetails] = useState(null)

  

  const { isUploading, startUpload } = useUploadThing("fileUploader", {
    onClientUploadComplete: (fileDetails) => {
      setFileDetails(fileDetails[0])
      console.log(fileDetails[0])
      toast("Successfully Verified");
    },
    onUploadError: () => {
      toast("Something Went wrong");
    },
  });
  console.log("FileDetails",fileDetails)

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      startUpload([selectedFile]);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours} ${hours === 1 ? "hour" : "hours"}`;
      }
      return `${hours} ${
        hours === 1 ? "hour" : "hours"
      } ${remainingMinutes} minutes`;
    } else {
      return "1 day";
    }
  };

  return (
    <div className="mt-20">
      <div className="flex  items-center p-7 justify-between">
        <Button
          asChild
          className="text-black  bg-orange-400 hover:bg-amber-500"
        >
          <Link className="cursor-pointer" href={"/text-sharing"}>
            Share Text
          </Link>
        </Button>
        {isUploading ? (
          <Button className="text-black cursor-pointer bg-orange-400 hover:bg-amber-500">
            <Loader2 className="animate-spin w-4 h-4" /> Loading...
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                // disabled={!file || isUploading}
                className="text-black cursor-pointer bg-orange-400 hover:bg-amber-500"
              >
                Share
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-start gap-2">
                  <div className="relative size-5 flex items-center justify-center">
                    <span className="absolute inline-flex size-5 animate-ping rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex size-3 rounded-full bg-orange-500"></span>
                  </div>
                  Are you ready to publish?
                </DialogTitle>
                <DialogDescription className="border-2 mt-4 rounded-2xl">
                  <div className="p-4 flex items-center justify-between gap-6">
                    <div className="flex-shrink-0 min-w-0">
                      <p className="text-black text-md font-bold">Expires in</p>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTime(expiryTime[0])}
                      </p>
                    </div>
                    <div className="flex-1 max-w-xs min-w-0">
                      <Slider
                        value={expiryTime}
                        onValueChange={setExpiryTime}
                        defaultValue={[15]}
                        max={1440}
                        step={15}
                        className="w-full"
                      />
                    </div>
                  </div>
                </DialogDescription>
                <Button className="cursor-pointer mt-2">Share</Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="w-full p-7   max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload onChange={handleFileUpload} />
        {isUploading && (
          <p className="mt-4 text-center text-blue-500">Uploading...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
