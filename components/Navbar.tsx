import React from "react";
import HandleSharingCode from "./HandleSharingCode";

const Navbar = () => {
  return (
    <div className=" px-6 py-3 flex items-center justify-between">
      <p className="text-lg font-extrabold ">Send.io</p>
      <HandleSharingCode />
    </div>
  );
};

export default Navbar;
