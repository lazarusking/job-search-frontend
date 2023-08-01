import { ReactNode, Suspense } from "react";
import Breadcrumbs from "../../_breadcrumbs";
import Loading from "@/app/loading";

export default function JobLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Breadcrumbs />
        {children}
      </Suspense>
    </>
  );
}
