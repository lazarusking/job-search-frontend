"use client";
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
export default function Applied() {
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
        <tr className="border-b border-blue-50">
          <td className="flex items-center py-4 px-6 font-medium">
            <div className="flex px-4 py-3">
              <td>Nothing to see here</td>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}
