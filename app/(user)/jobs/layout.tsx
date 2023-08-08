"use client";
import { ReactNode, Suspense } from "react";
import Breadcrumbs from "../../_breadcrumbs";
import Loading from "@/app/loading";
import withAuth from "@/components/AuthWrapper";

export default withAuth(JobLayout, "job_seeker");

export function JobLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Breadcrumbs />
        {children}
      </Suspense>
    </>
  );
}
