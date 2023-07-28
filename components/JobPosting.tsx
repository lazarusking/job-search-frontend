import { JobDetail } from "@/lib/interfaces";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

interface Props extends Partial<JobDetail> {
  job_type: any;
  title: any;
  location: any;
  id: number;
}

export default function JobPosting({ id, job_type, location, title }: Props) {
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
                <Link href={`/job/${id}`}>{title}</Link>
              </h3>
              <p className="text-gray-500 text-base">
                <span className="inline-block mr-3">
                  <MapPinIcon className="text-gray-600 w-5 h-5"/>
                </span>
                {location}
              </p>
            </div>
            <div className="w-full sm:w-auto p-2">
              <div className="group relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-green opacity-0 group-hover:opacity-50 rounded-full transition ease-out duration-300" />
                <button className="p-1 w-full font-heading font-medium text-base text-gray-900 overflow-hidden rounded-full">
                  <div className="relative py-2 px-5 bg-gradient-green overflow-hidden rounded-full">
                    <div className="absolute top-0 left-0 transform -translate-y-full group-hover:-translate-y-0 h-full w-full bg-gray-900 transition ease-in-out duration-500" />
                    <p className="relative z-10 group-hover:text-white">
                      Apply now
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
