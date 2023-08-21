"use client";
import { deleteApplicant, getJobApplicants, selectApplicant } from "@/lib/api";
import { ApplicantDetail } from "@/lib/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JobList from "../JobList";

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
async function getJobData(slug: number | string) {
  try {
    const response = await getJobApplicants(slug);
    return response.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Job() {
  // const applicants = await getJobData(slug);
  const { slug } = useParams();
  // console.log(slug);

  const [applicants, setApplicants] = useState<ApplicantDetail[]>([]);
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const results = await getJobData(slug as string);
      setApplicants(results);
    };
    fetchAppliedJobs();
    return () => {};
  }, [slug]);
  // const data = await search();
  // console.log(applicants);
  //   console.log(data);
  async function removeApplicant(job_id: number, applicant_id: any) {
    try {
      const response = await deleteApplicant(job_id, applicant_id);
      if (response.status === 200) {
        setApplicants((applicant) =>
          applicant.filter((item) => applicant_id !== item.applicant.user.id)
        );
        console.log(response);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function select(job_id: number, applicant_id: any) {
    try {
      const response = await selectApplicant(job_id, applicant_id);
      if (response.status === 201) {
        toast.success("Selected", {
          position: toast.POSITION.TOP_RIGHT,
        });
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
        {applicants ? (
          applicants.map((item) => (
            <JobList
              id={item.applicant.user.id}
              key={item.applicant.user.id}
              applicant={item?.applicant}
              date_posted={item?.date_posted}
              job={item?.job}
              status={"Applied"}
              deleteFunc={removeApplicant}
              select={select}
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
