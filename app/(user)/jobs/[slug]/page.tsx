"use client";
import Breadcrumbs from "@/app/_breadcrumbs";
import {
  applyForJob,
  deleteApplication,
  deleteSavedJob,
  getAppliedData,
  getJob,
  getJobs,
  getSavedData,
  saveJob,
} from "@/lib/api";
import { BriefcaseIcon, ClockIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())
  const jobs = await getJobs();
  // console.log(jobs.results);
  jobs.results.map((item) => {
    console.log(item.id, typeof item.id);
  });

  return jobs.results.map((job) => ({
    slug: job.id,
  }));
}
async function getJobData(slug: number) {
  const res = await getJob(slug);
  // console.log(res);

  return res;
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: number };
}) {
  const job = await getJobData(slug);
  // const [isSaved, setIsSaved] = useState(false);
  const date_posted = new Date(
    Date.now() - new Date(job.date_posted).getUTCMilliseconds()
  ).toDateString();
  const deadline = new Date(job.deadline).toDateString();
  console.log(
    Date.now() - new Date(job.date_posted).getUTCMilliseconds(),
    new Date(job.date_posted).getUTCMilliseconds()
  );

  // async function saveOrUnsave(id: number) {
  //   try {
  //     if (!isSaved) {
  //       await saveJob(id);
  //       setIsSaved(true);
  //     } else {
  //       await deleteSavedJob(id);
  //       setIsSaved(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   const fetchSearchResults = async () => {
  //     fetchSearchResults();
  //     await saveOrUnsave(slug);
  //   };
  //   fetchSearchResults()
  // }, [])

  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl space-y-3 mx-auto mb-16 text-center">
          <div className="flex mb-2 items-center">
            <Breadcrumbs />
            <a className="text-xs text-gray-400" href="#">
              Home
            </a>
            <svg
              className="w-3 h-3 mx-1 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <a className="text-xs text-gray-400" href="#">
              Blog
            </a>
            <svg
              className="w-3 h-3 mx-1 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <a className="text-xs text-gray-400" href="#">
              Article
            </a>
          </div>
          <h2 className="mb-6 text-2xl lg:text-5xl font-bold font-heading">
            {job.title}
          </h2>
          <div className="flex items-center justify-center">
            <div className="mr-6"></div>
            <div>
              <h3 className="text-xl font-bold font-heading">
                {job.recruiter.company}
              </h3>
              <p className="text-base text-gray-500">{date_posted}</p>
            </div>
          </div>
          <UserApplySaveComponent slug={slug} />
          <div className="my-4">
            <div className="text-left text-gray-500 flex items-center">
              <span className="inline-block mr-3">
                <BriefcaseIcon className="w-5 h-5 " />
              </span>
              <span>{job.job_type}</span>
            </div>
            {deadline && (
              <div className="text-left text-gray-500 flex items-center">
                <span className="inline-block mr-3">
                  <ClockIcon className="w-5 h-5 " />
                </span>
                <span>{deadline}</span>
              </div>
            )}
          </div>
          <div className="md:max-w-2xl mx-auto mb-12">
            <h3 className="mb-4 text-left text-base md:text-xl font-semibold text-gray-800">
              About the job
            </h3>
            {/* <p className="mb-4 text-base md:text-lg text-gray-500">
              {job.description}
            </p> */}
            <div className="text-left">
              {job.description.split("\n").map((paragraph, index) => {
                const regex: RegExp = new RegExp(/\w.*:\s*\n?$/);
                if (regex.test(paragraph)) {
                  return (
                    <p
                      key={index}
                      className="font-bold first:font-bold first:text-center"
                    >
                      {paragraph}
                    </p>
                  );
                } else {
                  return (
                    <p
                      key={index}
                      className="first:font-bold first:text-center"
                    >
                      {/* Job Description: */}
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function UserApplySaveComponent({ slug }: { slug: number }) {
  const [isSaved, setIsSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  async function apply(id: number) {
    const res = await applyForJob(id);
    if (res.status === 201) {
      setApplied(true);
    }
    if (res.response && res.response.status === 201) {
      console.log(res.response);
      setIsSaved(true);
    }
    if (res.response && res.response.status === 400) {
      const res = await deleteApplication(id);
      if (res.status === 200) {
        setApplied(false);
      }
    }
  }

  async function saveOrUndo(id: number) {
    try {
      const res = await saveJob(id);
      console.log(res);

      if (res.status === 201) {
        setIsSaved(true);
      }
      if (res.response && res.response.status >= 400) {
        const res = await deleteSavedJob(id);
        console.log(res);

        if (res.status === 200) {
          setIsSaved(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      // fetchSearchResults();
      const res = await getSavedData(slug);
      const res2 = await getAppliedData(slug);
      // console.log(res);
      if (res.response && res.data?.count) {
        setIsSaved(true);
      }
      if (res.response && res2.data?.count) {
        setApplied(true);
      }

      // await saveOrUndo(slug);
    };
    fetchSearchResults();
  }, [slug]);
  return (
    <div className="space-x-3">
      <button
        onClick={() => apply(slug)}
        className="group relative inline-block focus:outline-none focus:ring"
      >
        <span className="relative inline-block border-2 border-blue-500 p-1.5 text-sm bg-blue-500 font-bold tracking-widest text-white group-active:text-opacity-75">
          {applied ? "Applied" : "Apply"}
        </span>
      </button>
      <button
        onClick={() => saveOrUndo(slug)}
        className="group relative inline-block focus:outline-none"
      >
        {/* <span className="absolute inset-0 translate-x-0 translate-y-0 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5" /> */}
        <span className=" rounded-full inline-block border border-current hover:border-2 p-1.5 text-sm font-bold tracking-widest text-blue-400 group-active:text-opacity-75">
          {isSaved ? "Saved" : "Save"}
          {/* Saved */}
        </span>
      </button>
    </div>
  );
}
