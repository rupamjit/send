"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { calculateFormatTime } from "@/utils/calculateFormatTime";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [text, setText] = useState<string>("");
  const [expiryTime, setExpiryTime] = useState([15]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSharing = async () => {
    // console.log(text)
    setIsLoading(true);
    const data = await axios.post("/api/share", {
      text,
      expiryTime: expiryTime[0],
    });
    if (data.status == 200) {
      const accessCode = data.data.accessCode;

      redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/share/${accessCode}`);
      setIsLoading(false);
    }
    toast("Something Went Wrong");
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <div className="flex items-center gap-4">
        <Button asChild className="text-black bg-orange-400 hover:bg-amber-500">
          <Link className="cursor-pointer" href={"/file-sharing"}>
            Share File
          </Link>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={text == "" || text == null}
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
                      {calculateFormatTime(expiryTime[0])}
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
              {isLoading ? (
                <Button
                  disabled
                  type="submit"
                  onClick={handleSharing}
                  className="cursor-pointer mt-2"
                >
                  <span>
                    <Loader2 className="animate-spin h-4 w-4" />
                  </span>
                  Loading...
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={handleSharing}
                  className="cursor-pointer mt-2"
                >
                  Share
                </Button>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid w-full gap-3">
        <Label htmlFor="message" className="text-md font-extrabold">
          Your message
        </Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message here."
          id="message"
        />
      </div>
    </div>
  );
};

export default Page;
