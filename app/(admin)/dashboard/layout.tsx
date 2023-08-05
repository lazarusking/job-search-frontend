import Breadcrumbs from "@/app/_breadcrumbs";
import withAuth from "@/components/AuthWrapper";
import DashNavbar from "@/components/dashboard/DashNavbar";
import { Montserrat } from "next/font/google";
import { ReactNode } from "react";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
// export default withAuth(DashboardRootLayout, "recruiter");

export default function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashNavbar>
      <Breadcrumbs />

      {children}
    </DashNavbar>
  );
}
