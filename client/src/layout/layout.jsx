import { Outlet } from "react-router";

export function Layout() {
  return (
    <div>
      <h1 className="py-5 border-2 bg-slate-500 text-slate-50 flex justify-center">
        Mon menu
      </h1>
      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
}
