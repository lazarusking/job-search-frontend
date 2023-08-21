"use client";

import { UserJobsPageNav } from "@/app/(user)/jobs/_NavList";
import Loading from "@/app/loading";
import BaseModal from "@/components/modals/BaseModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { deleteJob } from "@/lib/api";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { ReactNode, Suspense, useState } from "react";
import { useToggle } from "usehooks-ts";
import CreateJobForm from "../CreateJobForm";
import { Job } from "@/lib/interfaces";

const paths = (slug: number) => [
  { name: "Applicants", href: `/dashboard/jobs/${slug}` },
  { name: "Selected Applicants", href: `/dashboard/jobs/${slug}/selected` },
  // { name: "Selected", href: "/jobs/selected" },
];
export default function DashboardJobViewDetail({
  // title,
  children,
  // location,
  // type,
  // slug,
  job,
}: {
  job: Job;
  children: ReactNode;
}) {
  const router = useRouter();
  const [show, toggle] = useToggle();
  const [edit, editJob] = useToggle();
  const [currentJob, setUpdatedJobs] = useState(job);

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
      <div className="px-2 sm:px-6 border-b border-blue-50">
        <div className="flex flex-wrap mb-4">
          <span
            onClick={() => router.push("/dashboard/jobs/")}
            className="cursor-pointer flex p-1 sm:pr-4"
          >
            <ArrowLeftCircleIcon className="w-7 h-7 text-green-600" />
          </span>
          <div className="space-y-4">
            <h3 className="sm:text-xl tracking-wide font-semibold">
              {currentJob.title}
            </h3>
            <div className="space-x-3 text-sm text-gray-500">
              <span className="font-medium">{currentJob.location}</span>
              <span>•</span>
              <span className="font-medium">{currentJob.job_type}</span>
            </div>
          </div>
          <button
            onClick={editJob}
            aria-label="Edit Job"
            className="flex items-start rounded-md px-3 py-1 text-sm font-semibold text-blue-600 hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="sr-only">Edit</span>
            <PencilSquareIcon className="w-5 h-5" />
          </button>
          <div className="mx-auto flex items-start text-xs">
            <button
              onClick={toggle}
              aria-label="Delete Job"
              className="flex space-x-2 items-center py-2 px-1.5 sm:px-3 text-red-500 sm:text-white sm:bg-red-500 hover:bg-rose-600 rounded"
            >
              <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sr-only sm:not-sr-only">Delete</span>
            </button>
          </div>
          {show && (
            <ConfirmModal
              setModal={toggle}
              title="Confirm Delete"
              details="Are you sure you want to delete this job?"
              css={"bg-white w-screen"}
              onConfirm={() => removeJob(Number(currentJob.slug))}
            />
          )}
          {edit && (
            <BaseModal
              setModal={editJob}
              title="Update Job"
              css={"bg-white sm:max-w-none"}
              // onConfirm={() => removeJob(slug)}
            >
              <CreateJobForm
                currentJobData={currentJob}
                setJobs={setUpdatedJobs}
              />
            </BaseModal>
          )}
        </div>

        <UserJobsPageNav paths={paths(Number(currentJob.slug))} />
      </div>
      <Suspense fallback={<Loading />}>
        <table className="table-auto w-full">
          <thead className="bg-gray-50">
            <tr className="text-xs text-gray-500 text-left">
              <th className="pl-2 sm:pl-6 sm:py-4 font-medium">Applicant ID</th>
              <th className="sm:py-4 font-medium">User</th>
              <th className="sm:py-4 font-medium">Joined</th>
              <th className="sm:py-4 font-medium">Status</th>
              <th className="sm:py-4 font-medium">Action</th>
            </tr>
          </thead>
          {children}
        </table>
      </Suspense>

      <div className="overflow-x-auto"></div>
    </>
  );
}
