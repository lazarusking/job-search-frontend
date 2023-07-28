"use client";

import JobPosting from "@/components/JobPosting";
import { jobDetails } from "@/lib/api";
import { JobDetail } from "@/lib/interfaces";
import { JSX, useCallback, useEffect, useState } from "react";
import Loading from "../loading";

interface JobType extends JobDetail {
  id: any;
  job_type: any;
  title: any;
  location: any;
}
export default function Home() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const getJobsContent = (job: JobType[]) => {
    let content: JSX.Element[] = [];
    job.map((item) => {
      content.push(
        <JobPosting
          key={item.id}
          id={item.id}
          job_type={item.job_type}
          title={item.title}
          location={item.location}
        />
      );
    });
    return content;
  };
  const getJobs = useCallback(async () => {
    try {
      // if (!usertoken) {
      //   return;
      // }
      const response: any = await jobDetails();

      // let res_options = await authAxios.options(`users/`);
      let data = response.data;
      console.log(data);
      if (response.status === 200) {
        setJobs(data);
      }
      // if (res_options.status === 200) {
      //   setExtra(res_options.data);
      // }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    getJobs();
    return () => {};
  }, []);

  return (
    <main className="items-center justify-between p-8">
      <section className="pt-12 pb-36 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="mb-5 font-heading font-bold text-center text-6xl sm:text-7xl text-gray-900">
              Featured Jobs
            </h2>
            {/* <p className="text-gray-600 text-center text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
              tellus vestibulum, commodo pulvina.
            </p> */}
          </div>
          <div className="max-w-3xl mx-auto">
            {jobs ? getJobsContent(jobs) : <Loading />}
            {/* {jobs &&
              jobs.map((item, index) => (
                <JobPosting
                  id={item.id}
                  job_type={item?.job_type}
                  location={item?.location}
                  title={item?.title}
                  key={index}
                />
              ))} */}
          </div>
        </div>
      </section>
    </main>
  );
}
