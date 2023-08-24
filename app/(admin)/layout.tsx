"use client";
import withAuth from "@/components/AuthWrapper";
import { ReactNode } from "react";

// const inter = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });
export default withAuth(DashboardLayout, "recruiter");

function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
