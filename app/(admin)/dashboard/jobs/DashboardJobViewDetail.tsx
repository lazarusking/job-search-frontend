"use client";

import { UserJobsPageNav } from "@/app/(user)/jobs/_NavList";
import Loading from "@/app/loading";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { deleteJob } from "@/lib/api";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useToggle } from "usehooks-ts";

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
  const [show, toggle] = useToggle();

  async function removeJob(job_id: number) {
    try {
      const response = await deleteJob(job_id);
      if (response.status >= 200 && response.status < 300) {
        router.push("/dashboard/jobs/");
        console.log(response);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="px-6 border-b border-blue-50">
        <div className="flex flex-wrap mb-4">
          <span
            onClick={() => router.push("/dashboard/jobs/")}
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
          <div className="mx-auto flex items-center text-xs">
            <button
              onClick={toggle}
              className="flex space-x-2 items-center py-2 px-3 text-white bg-red-500 hover:bg-rose-600 rounded"
            >
              <TrashIcon className="w-5 h-5" />
              <span>Delete</span>
            </button>
          </div>
          {show && (
            <ConfirmModal
              setModal={toggle}
              title="Confirm Delete"
              css={"bg-white w-screen"}
              onConfirm={() => removeJob(slug)}
            />
          )}
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
