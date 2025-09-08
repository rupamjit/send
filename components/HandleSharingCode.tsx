"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Search } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const HandleSharingCode = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogChange = useCallback((open) => {
    setIsOpen(open);
    if (!open) {
      setCode("");
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (code.length === 6) {
      const getData = async () => {
        try {
          setIsLoading(true);
          const res = await axios.post("/api/fetchContent", { code });

          if (res.status === 200 && res.data) {
            setIsOpen(false);
            router.push(
              `${process.env.NEXT_PUBLIC_BASE_URL}/share/${res.data}`
            );
            return;
          }

          toast("Invalid Code!");
        } catch (err) {
          console.error(err);
          toast("Something went wrong!");
        } finally {
          setIsLoading(false);
        }
      };

      getData();
    }
  }, [code, router]);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger>
        <span className="inline-flex items-center justify-center h-10 w-10 cursor-pointer bg-amber-400 rounded-lg border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-500 shadow-md hover:shadow-lg transition-all duration-300 group">
          {" "}
          <Search
            size={15}
            className="text-white group-hover:scale-110 transition-transform duration-300"
          />{" "}
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Your Sharing Code</DialogTitle>
          <DialogDescription>
            Use your sharing code to retrieve your content. It&lsquo;s
            case-sensitive.
          </DialogDescription>
          <div className="mt-4 py-4">
            <InputOTP
              value={code}
              onChange={(val) => setCode(val.toUpperCase())}
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot className=" h-15 w-15" index={0} />
                <InputOTPSlot className=" h-15 w-15" index={1} />
                <InputOTPSlot className=" h-15 w-15" index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot className=" h-15 w-15" index={3} />
                <InputOTPSlot className=" h-15 w-15" index={4} />
                <InputOTPSlot className=" h-15 w-15" index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isLoading ? (
              <p className="text-md font-bold">
                <Loader2 className="animate-spin h-4 w-4" />
                Redirecting...
              </p>
            ) : null}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HandleSharingCode;
