"use client";
import { deleteSelectedApplicant, getSelectedApplicants } from "@/lib/api";
import { ApplicantDetail } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import JobList from "../../JobList";

// export async function generateStaticParams() {
//   // const posts = await fetch('https://.../posts').then((res) => res.json())
//   const jobs = await getJobs();

//   //   jobs.results.map((item) => {
//   //     console.log(item.title, typeof item.id, item.slug);
//   //   });

//   return jobs.results.map((job) => ({
//     slug: job.id.toString(),
//   }));
// }
async function getJobData(slug: number) {
  try {
    const response = await getSelectedApplicants(slug);
    return response.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Page({
  params: { slug },
}: {
  params: { slug: number };
}) {
  // const applicants = await getJobData(slug);
  const [selected, setSelected] = useState<ApplicantDetail[]>([]);
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const results = await getJobData(slug);
      setSelected(results);
    };
    fetchAppliedJobs();
    return () => {};
  }, [slug]);
  // const data = await search();
  // console.log(applicants);
  //   console.log(data);
  async function removeApplicant(job_id: number, applicant_id: any) {
    try {
      const response = await deleteSelectedApplicant(job_id, applicant_id);
      if (response.status === 200) {
        setSelected((applicant) =>
          applicant.filter((item) => applicant_id !== item.applicant.user.id)
        );
        console.log(response);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <tbody>
        {selected ? (
          selected.map((item) => (
            <JobList
              id={item.applicant.user.id}
              key={item.applicant.user.id}
              applicant={item?.applicant}
              date_posted={item?.date_posted}
              job={item?.job}
              status={"Selected"}
              deleteFunc={removeApplicant}
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
    </>
  );
}
