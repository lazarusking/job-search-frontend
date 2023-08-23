import Chatbot from "@/components/chatbot/ChatInterface";
import { getJob, getJobs } from "@/lib/api";
import { Metadata } from "next";
import { ReactNode } from "react";
import DashboardJobViewDetail from "../DashboardJobViewDetail";
type Props = {
  params: { slug: number };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.slug;

  // fetch data
  const job = await getJobData(id);
  try {
    // console.log(job);

    return {
      title: job.title,
      description: job.description,
      publisher: job.recruiter.company,
      keywords: job.skills_required,
      authors: [{ name: job.recruiter.user.username }],
      openGraph: {
        type: "article",
        title: job.title,
        description: job.description,
        siteName: job.title,
        publishedTime: job.date_posted,
      },
      twitter: {
        card: "summary_large_image",
        creator: `@${job.recruiter.company}`,
        creatorId: `@${job.recruiter.id}`,
        siteId: `@${job.id}`,
        title: job.title,
        description: job.description,
        site: "@ISearch",
      },
    };
  } catch (error) {
    return {};
  }
}
export async function generateStaticParams() {
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
