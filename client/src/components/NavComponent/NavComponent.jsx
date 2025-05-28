import React, { useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

function NavComponent({ handleToggleSidebar, inputValue, setInput }) {
  return (
    <div className=" flex justify-start items-center py-5 px-4 text-center bg-white  ">
      <div onClick={handleToggleSidebar} className="w-5 cursor-pointer mr-3 ">
        <BsLayoutSidebar size={"100%"} />
      </div>
      <div className=" relative flex-none w-8/10 border border-my-border rounded-b-md">
        <input
          className="w-full block border border-transparent    pl-10 grow py-1.5   text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          type="text"
          id="search"
          placeholder="Cherché un produit, un fournisseur , ..."
          value={inputValue ?? ""}
          name="search"
          onChange={(e) => setInput(e.target.value)}
        />
        <span className=" absolute top-2 left-2 w-6 ">
          <BsSearch size={"100%"} />
        </span>
      </div>
    </div>
  );
}

export default NavComponent;
