"use client";
import Loading from "@/app/loading";
import JobDetailsCard from "@/components/cards/JobDetailsCard";
import { getJobDetails } from "@/lib/api";
import { JobDetailList } from "@/lib/interfaces";
import { ChangeEvent, Suspense, useCallback, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import AddJobNavBar from "./AddJobNavBar";

const initial = { count: 0, results: [], next: null, previous: null };
async function search(query?: string): Promise<JobDetailList> {
  try {
    const response = await getJobDetails(query);
    return response;
  } catch (error) {
    console.log(error);
    return initial;
  }
}

export default function Jobs() {
  // console.log(data);
  const [jobs, setJobs] = useState<JobDetailList>(initial);

  const [query, setQuery] = useState("");
  // const data = await search(query);
  const debouncedSearchTerm = useDebounce(query, 500);
  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const performSearch = useCallback(async () => {
    const searchResults = await search(debouncedSearchTerm);
    // setResults(searchResults);
    return searchResults;
  }, [debouncedSearchTerm]);
  useEffect(() => {
    // getJobs();
    console.log("searching");
    // performSearch();
    // if (loading) {

    // }
    const fetchSearchResults = async () => {
      const results = await performSearch();
      setJobs(results);
      // console.log(results);
    };
    fetchSearchResults();
    return () => {};
  }, [performSearch]);
  return (
    <section className="py-4">
      <div className="container px-4 mx-auto">
        <AddJobNavBar count={jobs.count} query={query} onChange={handleQuery} />
        <div className="flex-wrap grid items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -m x-4">
          {/* {Array.from({ length: 7 }, (_, index) => (
            <JobDetailsCard key={index} />
          ))} */}
          <Suspense fallback={<Loading />}>
            {jobs.results ? (
              jobs.results.map((item) => (
                <JobDetailsCard
                  key={item.id}
                  title={item.title}
                  id={item.id}
                  user_count={item.user_count}
                  new_users={item.new_users}
                  job_type={item.job_type}
                  location={item.location}
                  company={item.company}
                />
              ))
            ) : (
              <Loading />
            )}
          </Suspense>
        </div>
      </div>
    </section>
  );
}
