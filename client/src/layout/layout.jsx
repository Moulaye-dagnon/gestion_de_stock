import { Outlet } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";
import NavComponent from "../components/NavComponent/NavComponent";

export function Layout() {
  const [isSideOpen, setIsSideOpen] = useState(true);
  const [globalFilter, setGlobalFilter] = useState([]);

  const handleToggleSidebar = () => setIsSideOpen(!isSideOpen);

  return (
    <div className=" h-screen min-h-screen max-h-screen flex flex-col  relative overflow-hidden">
      {isSideOpen && (
        <div
          className="absolute inset-0  backdrop-blur-xs z-10 md:hidden"
          onClick={handleToggleSidebar}
        />
      )}
      <div
        className={` w-full h-full overflow-hidden  flex-1 grid grid-cols-1  ${
          isSideOpen ? "  md:grid-cols-[200px_1fr]  gap-2" : "grid-cols-1"
        }`}
      >
        <div
          className={`h-full w-[200px]  ${
            isSideOpen
              ? " inset-y-0 left-0 opacity-100 translate-x-0 z-20"
              : " -translate-x-full hidden opacity-0 "
          } absolute  md:static  translate-none `}
        >
          <Sidebar Open={isSideOpen} />
        </div>
        <div className=" overflow-auto flex flex-col gap-y-2 h-full w-full relative ">
          <NavComponent
            inputValue={globalFilter}
            setInput={setGlobalFilter}
            handleToggleSidebar={handleToggleSidebar}
          />
          <Outlet context={{ globalFilter, setGlobalFilter }} />
        </div>
      </div>
    </div>
  );
}
