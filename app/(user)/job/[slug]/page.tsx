import { getJobs } from "@/lib/api";

export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())
  const jobs = await getJobs();
  // console.log(jobs.results);

  return jobs.results.map((job) => ({
    slug: job.slug,
  }));
}
export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}
