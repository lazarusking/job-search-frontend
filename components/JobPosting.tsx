import { useAuth } from "@/context/auth";
import { applyForJob } from "@/lib/api";
import { JobDetail } from "@/lib/interfaces";
import { ArrowRightIcon, CheckIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props extends Partial<JobDetail> {
  job_type: any;
  title: any;
  location: any;
  id: number;
}
async function applyJob(id: number) {
  try {
    await applyForJob(id);
  } catch (error) {
    console.log(error);
  }
}
export default function JobPosting({ id, job_type, location, title }: Props) {
  const [applied, setApplied] = useState(false);
  const [appliedStat, setAppliedStat] = useState('');
  const router = useRouter();
  const { loading, isAuthenticated, login, user } = useAuth();

  async function apply(id: number) {
    try {
      if (!user) {
        console.log('no user...');

        return router.push('/login')
      }
      const res = await applyForJob(id);
      if (res.status) {
        setApplied(true)
        setTimeout(() => {
          setApplied(false)
        }, 2000);
      }
      if (res.response && res.response.status === 201) {
        console.log(res.response);

        setApplied(true)
        setTimeout(() => {
          setApplied(false)
        }, 2000);
      }
      if (res.response && res.response.status === 400) {
        // setApplied(true)
        setAppliedStat('Already applied')
        setTimeout(() => {
          setAppliedStat('')
        }, 2000);
      }
    } catch (error) {
      console.log(error);

    }
    // return response.data;

  }
  return (
    <div className="flex flex-wrap -m-0.5">
      <div className="w-full p-0.5">
        <div className="p-6 bg-white border border-gray-100 rounded-lg">
          <div className="flex flex-wrap items-center justify-between -m-2">
            <div className="w-full p-2 sm:flex-1">
              <p className="mb-1 max-w-max px-2.5 py-1 text-gray-300 text-xs font-heading font-semibold uppercase bg-gray-900 tracking-px rounded-full">
                {job_type}
              </p>
              <h3 className="mb-1 font-heading font-bold text-lg text-gray-900">
                <Link href={`/jobs/${id}`}>{title}</Link>
              </h3>
              <p className="text-gray-500 text-base">
                <span className="inline-block mr-3">
                  <MapPinIcon className="text-gray-600 w-5 h-5" />
                </span>
                {location}
              </p>
            </div>
            <div></div>
            <div className="w-1/2 sm:w-auto p-2">
              <div className="group relative grid justify-items-center">
                {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-green opacity-0 group-hover:opacity-50 rounded-full transition ease-out duration-300" /> */}
                <button onClick={() => apply(id)} className="p-1 w-full font-heading font-medium text-base text-white overflow-hidden">
                  <div className="relative space-x-3 py-2 px-5 bg-blue-400 overflow-hidden rounded-md inline-flex items-center">
                    {/* <div className="absolute top-0 left-0 transform -translate-y-full group-hover:-translate-y-0 h-full w-full bg-gray-900 transition ease-in-out duration-500" /> */}
                    <p className="relative z-10 group-hover:text-white ">
                      Apply now
                    </p>
                    {applied ? <CheckIcon className="text-green-800 w-7 h-7" /> : <ArrowRightIcon className="w-5 h-5" />}
                  </div>
                </button>
                {appliedStat && <span className="absolute -bottom-6 text-red-500">
                  {appliedStat}
                </span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
