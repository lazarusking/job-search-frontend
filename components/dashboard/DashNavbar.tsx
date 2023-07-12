"use client";
import DashImage from "@/components/dashboard/DashImage";
import DashRoutes from "@/components/dashboard/DashRoutes";
import MobileDashHeader from "@/components/dashboard/MobileDashHeader";
import { ReactNode, useEffect } from "react";
export default function DashNavbar({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Burger menus
    document.addEventListener("DOMContentLoaded", function () {
      // open
      const burger = document.querySelectorAll(".navbar-burger");
      const menu = document.querySelectorAll(".navbar-menu");
      console.log(burger);
      if (burger.length && menu.length) {
        for (let i = 0; i < burger.length; i++) {
          burger[i].addEventListener("click", function () {
            for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle("hidden");
            }
          });
        }
      }

      // close
      const close = document.querySelectorAll(".navbar-close");
      const backdrop = document.querySelectorAll(".navbar-backdrop");

      if (close.length) {
        for (let i = 0; i < close.length; i++) {
          close[i].addEventListener("click", function () {
            for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle("hidden");
            }
          });
        }
      }

      if (backdrop.length) {
        for (let i = 0; i < backdrop.length; i++) {
          backdrop[i].addEventListener("click", function () {
            for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle("hidden");
            }
          });
        }
      }
    });

    return () => {};
  });

  return (
    <div>
      <MobileDashHeader />
      <div className="hidden lg:block navbar-menu relative z-50">
        <div className="navbar-backdrop fixed lg:hidden inset-0 bg-gray-800 opacity-10" />
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-xs bg-slate-900 text-white border-r overflow-y-auto">
          <div className="w-full items-center px-6 py-4 lg:border-b border-gray-700">
            <DashImage />
          </div>
          <DashRoutes />
        </nav>
      </div>
      <div className="mx-auto lg:ml-80">{children}</div>
    </div>
  );
}
