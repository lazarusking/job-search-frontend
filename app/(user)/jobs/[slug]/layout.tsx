import Breadcrumbs from "@/app/_breadcrumbs";
import { ReactNode } from "react";

export default function JobSlugLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
}
