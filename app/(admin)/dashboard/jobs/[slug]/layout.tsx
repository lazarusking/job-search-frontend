import { getJob, getJobs } from "@/lib/api";
import { ReactNode } from "react";
import DashboardJobViewDetail from "../DashboardJobViewDetail";
import Chatbot from "@/components/chatbot/ChatInterface";

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
  const res = await getJob(slug);
  // console.log(res);

  return res;
}
export default async function JobsLayout({
  params: { slug },
  children,
}: {
  params: { slug: number };
  children: ReactNode;
}) {
  const data = await getJobData(slug);
  // console.log(slug);

  return (
    <>
      <section className="py-4">
        <div className="container mx-auto">
          <div className="pt-4 bg-white shadow-sm rounded">
            <DashboardJobViewDetail
              // title={data.title}
              // location={data.location}
              // type={data.job_type}
              // slug={slug}
              job={data}
            >
              {children}
            </DashboardJobViewDetail>{" "}
          </div>
        </div>
        <Chatbot job_slug={slug} />
      </section>
    </>
  );
}

/* //   <Link
    //     className="inline-block px-4 pb-2 text-sm font-medium text-gray-300 border-b-2 border-transparent hover:border-gray-300"
    //     href="/jobs/applied/"
    //   >
    //     Applied
    //   </Link>
    //   <Link
    //     className="inline-block px-4 pb-2 text-sm font-medium text-gray-300 border-b-2 border-transparent hover:border-gray-300"
    //     href="/jobs/selected/"
    //   >
    //     Selected
    //   </Link> */
