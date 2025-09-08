import React from "react";
import HandleSharingCode from "./HandleSharingCode";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" px-6 py-3 flex items-center justify-between">
      <Link href="/">
        <p className="text-lg font-extrabold ">Send.io</p>
      </Link>
      <HandleSharingCode />
    </div>
  );
};

export default Navbar;
