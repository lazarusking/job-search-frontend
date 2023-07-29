import { getJobs } from "@/lib/api";

export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())
  const jobs = await getJobs();

  return jobs.results.map((job) => ({
    slug: job.id,
  }));
}
export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}
