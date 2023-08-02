"use client";
import { getJob, getJobApplicants, getJobDetails, getJobs } from "@/lib/api";
import React from "react";
import JobList from "../JobList";
import { ApplicantDetail, ApplicantList, JobDetail } from "@/lib/interfaces";

export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())
  const jobs = await getJobs();

  //   jobs.results.map((item) => {
  //     console.log(item.title, typeof item.id, item.slug);
  //   });

  return jobs.results.map((job) => ({
    slug: job.id.toString(),
  }));
}
async function getJobData(slug: number) {
  try {
    const response = await getJobApplicants(slug);
    return response.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function search(): Promise<JobDetail[]> {
  try {
    const response = await getJobDetails();
    return response.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export default async function Page({
  params: { slug },
}: {
  params: { slug: number };
}) {
  const applicants = await getJobData(slug);
  const data = await search();
  console.log(applicants);
  //   console.log(data);

  return (
    <>
      <tbody>
        {applicants ? (
          applicants.map((item) => (
            <JobList
              id={item.job.id}
              key={item.job.id}
              job_type={item?.job.job_type}
              location={item?.job.location}
              title={item?.job.title}
              deadline={item?.job.deadline}
              applicant={item?.applicant}
              date_posted={item?.date_posted}
              job={item?.job}
              status={"Applied"}
              //   deleteFunc={removeJob}
            />
          ))
        ) : (
          <tr>
            <td>Nothing to see here</td>
          </tr>
        )}
      </tbody>
    </>
  );
}
