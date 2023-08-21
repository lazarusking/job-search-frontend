"use client";
import DashImage from "@/components/dashboard/DashImage";
import DashRoutes from "@/components/dashboard/DashRoutes";
import MobileDashHeader from "@/components/dashboard/MobileDashHeader";
import useToggle from "@/hooks/useToggle";
import { ReactNode } from "react";
export default function DashNavbar({ children }: { children: ReactNode }) {
  const [show, toggle] = useToggle();

  return (
    <main>
      <MobileDashHeader toggle={toggle} />
      <div
        className={`${show ? "" : "hidden"} lg:block navbar-menu relative z-50`}
      >
        <div
          onClick={toggle}
          className="navbar-backdrop fixed lg:hidden inset-0 bg-gray-800 opacity-10"
        />
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-3/4 sm:w-60 sm:max-w-xs bg-slate-900 text-white border-r overflow-y-auto">
          <div className="w-full items-center px-6 py-4 lg:border-b border-gray-700">
            <DashImage />
          </div>
          <DashRoutes />
        </nav>
      </div>
      <section className="mx-auto lg:ml-64">{children}</section>
    </main>
  );
}
