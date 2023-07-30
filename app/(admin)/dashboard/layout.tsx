"use client";
import withAuth from "@/components/AuthWrapper";
import DashNavbar from "@/components/dashboard/DashNavbar";
import { Montserrat } from "next/font/google";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default withAuth(Layout);

function Layout({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const path = usePathname();
  console.log(segment, path);
  return <DashNavbar>{children}</DashNavbar>;
}
