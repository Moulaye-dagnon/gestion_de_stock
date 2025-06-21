import React from "react";
import { AiOutlineStock } from "react-icons/ai";

export default function AuthLayout({ children }) {
  return (
    <div className="md:flex md:justify-between md:items-center mx-auto  max-w-4xl ">
      <div className=" hidden md:block w-60">
        <AiOutlineStock size={"100%"} />
      </div>
      <div className="flex justify-center items-center flex-col">
        {children}
      </div>
    </div>
  );
}
