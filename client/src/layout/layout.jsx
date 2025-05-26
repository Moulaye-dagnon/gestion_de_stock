import { Outlet } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";
import NavComponent from "../components/NavComponent/NavComponent";

export function Layout() {
  const [isSideOpen, setIsSideOpen] = useState(true);
  const handleToggleSidebar = () => setIsSideOpen(!isSideOpen);
  return (
    <div className="min-h-screen flex flex-col  relative">
      {isSideOpen && (
        <div
          className="absolute inset-0  backdrop-blur-xs z-10 md:hidden"
          onClick={handleToggleSidebar}
        />
      )}
      <div className="  flex-1 grid grid-cols-1 md:grid-cols-[200px_1fr]">
        <div
          className={`h-full w-[200px]  ${
            isSideOpen
              ? "absolute inset-y-0 left-0 translate-x-0 z-20"
              : "absolute -translate-x-full hidden "
          } md:static md:block translate-none `}
        >
          <Sidebar Open={isSideOpen} />
        </div>
        <div className="mx-0.5 flex flex-col gap-y-2">
          <NavComponent handleToggleSidebar={handleToggleSidebar} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
