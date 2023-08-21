import Breadcrumbs from "@/app/_breadcrumbs";
import DashNavbar from "@/components/dashboard/DashNavbar";
import { ReactNode } from "react";

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
