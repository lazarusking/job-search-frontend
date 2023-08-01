"use client";
import withAuth from "@/components/AuthWrapper";
import { deleteApplication, getAppliedJobs } from "@/lib/api";
import { JobView } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import JobList from "../../_JobList";

async function getJobs(): Promise<JobView[]> {
  try {
    const response = await getAppliedJobs();
    return response.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export default withAuth(Applied);
function Applied() {
  const [jobs, setJobs] = useState<JobView[]>([]);
  async function removeJob(id: number) {
    try {
      const response = await deleteApplication(id);
      if (response.status === 200) {
        setJobs((job) => job.filter((job) => id !== job.job.id));
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const results = await getJobs();
      setJobs(results);
    };
    fetchAppliedJobs();
    return () => {};
  }, []);

  return (
    <tbody>
      {jobs ? (
        jobs.map((item) => (
          <JobList
            id={item.job.id}
            key={item.job.id}
            job_type={item?.job.job_type}
            location={item?.job.location}
            title={item?.job.title}
            deadline={item?.job.deadline}
            deleteFunc={removeJob}
          />
        ))
      ) : (
        <p>Nothing to see here</p>
      )}
    </tbody>
  );
}
