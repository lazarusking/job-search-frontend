"use client";
import DashNavbar from "@/components/dashboard/DashNavbar";
import { Montserrat } from "next/font/google";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const path = usePathname();
  console.log(segment, path);
  return <DashNavbar>{children}</DashNavbar>;
}
