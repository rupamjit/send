import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const HandleSharingCode = () => {
  return (
    <Dialog>
      <DialogTrigger>
        {/* <span className="cursor-pointer bg-amber-400">
          <Search size={20}/>
        </span> */}
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
            <InputOTP maxLength={6}>
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
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HandleSharingCode;
