"use client";

import Loading from "@/app/loading";
import JobPosting from "@/components/JobPosting";
import { getJobs } from "@/lib/api";
import { Job } from "@/lib/interfaces";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  ChangeEvent,
  JSX,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDebounce } from "usehooks-ts";

async function search(query: string): Promise<Job[]> {
  try {
    const response = await getJobs(query);
    return response.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  // const [results, setResults] = useState<Job[]>([]);
  // const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(query, 300);
  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const performSearch = useCallback(async () => {
    const searchResults = await search(debouncedSearchTerm);
    // setResults(searchResults);
    return searchResults;
  }, [debouncedSearchTerm]);
  // useEffect(() => {
  //   const searchHN = async () => {
  //     let results = [];
  //     setIsSearching(true);
  //     if (debouncedSearchTerm) {
  //       const data = await debouncedSearchTerm;
  //       results = data?.hits || [];
  //     }

  //     setIsSearching(false);
  //     setResults(results);
  //   };

  //   searchHN();
  // }, [debouncedSearchTerm]);
  const getJobsContent = (job: Job[]) => {
    let content: JSX.Element[] = [];
    job.map((item) => {
      content.push(
        <JobPosting
          key={item.id}
          id={item.id}
          job_type={item.job_type}
          title={item.title}
          location={item.location}
        />
      );
    });
    return content;
  };
  // const getJobs = useCallback(async () => {
  //   try {
  //     // if (!usertoken) {
  //     //   return;
  //     // }
  //     const response: any = await jobDetails();

  //     // let res_options = await authAxios.options(`users/`);
  //     let data = response.data;
  //     console.log(data);
  //     if (response.status === 200) {
  //       setJobs(data);
  //     }
  //     // if (res_options.status === 200) {
  //     //   setExtra(res_options.data);
  //     // }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);
  useEffect(() => {
    // getJobs();
    console.log("searching");
    // performSearch();
    // if (loading) {

    // }
    const fetchSearchResults = async () => {
      const results = await performSearch();
      setJobs(results);
    };
    fetchSearchResults();
    return () => {};
  }, [performSearch]);

  return (
    <main className="items-center justify-between p-8">
      <section className="pt-12 pb-36 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="mb-5 font-heading font-bold text-center text-3xl sm:text-4xl text-gray-900">
              Featured Jobs
            </h2>
            {/* <p className="text-gray-600 text-center text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
              tellus vestibulum, commodo pulvina.
            </p> */}
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center justify-center mb-14 mx-3">
              <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
                <div className="relative shadow-md rounded-lg">
                  <span className="inline-block mr-3 absolute top-1/2 left-4 transform -translate-y-1/2">
                    <MagnifyingGlassIcon
                      title="search icon"
                      className="w-5 h-5"
                    />
                  </span>
                  <input
                    className="w-full h-full py-3 pl-12 pr-4 text-gray-500 leading-tight placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={handleQuery}
                  />
                </div>
              </div>
              {/* <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
                <div className="relative bg-white border border-gray-200 rounded-lg shadow-md">
                  <select
                    className="px-4 py-3 w-full appearance-none outline-none border-0 bg-transparent hover:cursor-pointer leading-6 text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg"
                    name=""
                  >
                    <option value={1}>Location</option>
                    <option value={2}>Country</option>
                    <option value={3}>City</option>
                  </select>
                </div>
              </div> */}
              {/* <div className="w-full md:w-1/3 px-3">
                <div className="relative bg-white border border-gray-200 rounded-lg shadow-md">
                  <select
                    className="px-4 py-3 w-full appearance-none outline-none border-0 bg-transparent hover:cursor-pointer leading-6 text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg"
                    name=""
                  >
                    <option value={1}>Type</option>
                    <option value={2}>Country</option>
                    <option value={3}>City</option>
                  </select>
                </div>
              </div> */}
            </div>
          </div>
          <Suspense fallback={<Loading />}>
            <div className="max-w-3xl mx-auto">
              {jobs ? getJobsContent(jobs) : <Loading />}
              {/* {jobs &&
              jobs.map((item, index) => (
                <JobPosting
                  id={item.id}
                  job_type={item?.job_type}
                  location={item?.location}
                  title={item?.title}
                  key={index}
                />
              ))} */}
            </div>
          </Suspense>
        </div>
      </section>
    </main>
  );
}
