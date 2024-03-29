// "use client";
import { UserApplySaveComponent } from "@/components/UserApplySaveComponent";
import { getJob, getJobs } from "@/lib/api";
import { BriefcaseIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
type Props = {
  params: { slug: number };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.slug;

  // fetch data
  const job = await getJobData(id);

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
}
export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())
  const jobs = await getJobs();
  // console.log(jobs.results);
  // jobs.results.map((item) => {
  //   console.log(item.id, typeof item.id);
  // });

  return jobs.results.map((job) => ({
    slug: job.id.toString(),
  }));
}
async function getJobData(slug: number) {
  const res = await getJob(slug);
  // console.log(res);

  return res;
}

export default async function JobSlug({
  params: { slug },
}: {
  params: { slug: number };
}) {
  const job = await getJobData(slug);
  const date_posted = new Date(
    Date.now() - new Date(job.date_posted).getUTCMilliseconds()
  ).toDateString();
  const deadline = new Date(job.deadline).toDateString();

  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl space-y-3 mx-auto mb-16 text-center">
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
