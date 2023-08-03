"use client";

import { UserJobsPageNav } from "@/app/(user)/jobs/_NavList";
import Loading from "@/app/loading";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const paths = (slug: number) => [
  { name: "Applicants", href: `/dashboard/jobs/${slug}` },
  { name: "Selected Applicants", href: `/dashboard/jobs/${slug}/selected` },
  // { name: "Selected", href: "/jobs/selected" },
];
export default function DashboardJobViewDetail({
  title,
  children,
  location,
  type,
  slug,
}: any) {
  const router = useRouter();
  return (
    <>
      <div className="px-6 border-b border-blue-50">
        <div className="flex flex-wrap mb-4">
          <span
            onClick={() => router.back()}
            className="cursor-pointer flex pr-4"
          >
            <ArrowLeftCircleIcon className="w-7 h-5 text-green-600" />
          </span>
          <div className="space-y-4">
            <h3 className="text-xl tracking-wide font-semibold">{title}</h3>
            <div className="space-x-3 text-sm text-gray-500">
              <span className="font-medium">{location}</span>
              <span>•</span>
              <span className="font-medium">{type}</span>
            </div>
          </div>
          {/* <a
        className="ml-auto flex items-center py-2 px-3 text-xs text-white bg-indigo-500 hover:bg-indigo-600 rounded"
        href="#"
      >
        <span className="mr-1">
          <svg
            className="h-3 w-3 text-indigo-300"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.33337C12.6 8.33337 12.3333 8.60004 12.3333 9.00004V11.6667C12.3333 12.0667 12.0666 12.3334 11.6666 12.3334H2.33331C1.93331 12.3334 1.66665 12.0667 1.66665 11.6667V9.00004C1.66665 8.60004 1.39998 8.33337 0.99998 8.33337C0.59998 8.33337 0.333313 8.60004 0.333313 9.00004V11.6667C0.333313 12.8 1.19998 13.6667 2.33331 13.6667H11.6666C12.8 13.6667 13.6666 12.8 13.6666 11.6667V9.00004C13.6666 8.60004 13.4 8.33337 13 8.33337ZM4.79998 4.13337L6.33331 2.60004V9.00004C6.33331 9.40004 6.59998 9.66671 6.99998 9.66671C7.39998 9.66671 7.66665 9.40004 7.66665 9.00004V2.60004L9.19998 4.13337C9.46665 4.40004 9.86665 4.40004 10.1333 4.13337C10.4 3.86671 10.4 3.46671 10.1333 3.20004L7.46665 0.533374C7.19998 0.266707 6.79998 0.266707 6.53331 0.533374L3.86665 3.20004C3.59998 3.46671 3.59998 3.86671 3.86665 4.13337C4.13331 4.40004 4.53331 4.40004 4.79998 4.13337Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span>Report</span>
      </a> */}
        </div>

        <UserJobsPageNav paths={paths(slug)} />
      </div>
      <Suspense fallback={<Loading />}>
        <table className="table-auto w-full">
          <thead className="bg-gray-50">
            <tr className="text-xs text-gray-500 text-left">
              <th className="pl-6 py-4 font-medium">Applicant ID</th>
              <th className="py-4 font-medium">User</th>
              <th className="py-4 font-medium">Joined</th>
              <th className="py-4 font-medium">Status</th>
              <th className="py-4 font-medium">Action</th>
            </tr>
          </thead>
          {children}
        </table>
      </Suspense>

      <div className="overflow-x-auto"></div>
    </>
  );
}
