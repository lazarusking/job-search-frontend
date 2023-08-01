"use client";

import loginImage from "@/public/login.png";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  // const [jobs, setJobs] = useState<Job[]>([]);
  // const [query, setQuery] = useState("");
  // const [results, setResults] = useState<Job[]>([]);
  // const [isSearching, setIsSearching] = useState(false);

  // const debouncedSearchTerm = useDebounce(query, 300);
  // const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
  //   setQuery(e.target.value);
  // };
  // const performSearch = useCallback(async () => {
  //   const searchResults = await search(debouncedSearchTerm);
  //   // setResults(searchResults);
  //   return searchResults;
  // }, [debouncedSearchTerm]);
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
  // const getJobsContent = (job: Job[]) => {
  //   let content: JSX.Element[] = [];
  //   job.map((item) => {
  //     content.push(
  //       <JobPosting
  //         key={item.id}
  //         id={item.id}
  //         job_type={item.job_type}
  //         title={item.title}
  //         location={item.location}
  //       />
  //     );
  //   });
  //   return content;
  // };
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
  // useEffect(() => {
  //   // getJobs();
  //   console.log("searching");
  //   performSearch();
  //   const fetchSearchResults = async () => {
  //     const results = await performSearch();
  //     setJobs(results);
  //   };
  //   fetchSearchResults();
  //   return () => { };
  // }, [performSearch]);

  return (
    <>
      {/* <nav className="relative px-6 py-6 flex justify-between items-center">
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-gray-400 p-3">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
              Start
            </a>
          </li>
          <li className="text-gray-200">
            <svg
              className="w-4 h-4 current-fill"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <a className="text-sm text-green-600 font-bold" href="#">
              About Us
            </a>
          </li>
          <li className="text-gray-200">
            <svg
              className="w-4 h-4 current-fill"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
              Services
            </a>
          </li>
          <li className="text-gray-200">
            <svg
              className="w-4 h-4 current-fill"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
              Platform
            </a>
          </li>
          <li className="text-gray-200">
            <svg
              className="w-4 h-4 current-fill"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
              Testimonials
            </a>
          </li>
        </ul>
        <a
          className="hidden lg:block py-2 px-6 bg-white hover:bg-gray-50 text-sm text-purple-600 font-bold rounded-l-xl rounded-t-xl transition duration-200"
          href="#"
        >
          Contact Us
        </a>
      </nav> */}
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 md:mb-20 lg:mb-0 flex items-center">
              <div className="w-full text-center lg:text-left">
                <div className="max-w-md mx-auto lg:mx-0">
                  <h2 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                    <span className="text-blue-600">Unlock Your Career Potential with AI-Driven Job Recruitment!</span>
                  </h2>
                </div>
                <div className="max-w-sm mx-auto lg:mx-0">
                  <p className="mb-6 text-gray-500 leading-loose">
                    Are you ready to take your job search to the next level? Sign up now and let our AI-driven Job Recruitment platform guide you towards the career of your dreams. Embrace the future of job search with us!
                  </p>
                  <div>
                    <Link
                      className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-blue-600 hover:bg-purple-700 text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200"
                      href="/get-started"
                    >
                      Get Started
                    </Link>
                    <Link
                      className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                      href="#"
                    >
                      How it works
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 flex items-center justify-center">
              <img src="https://shuffle.dev/atis-assets/illustrations/men-on-chair-light.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 0 10" />
        </svg>
      </div> */}
      {/* <div className="navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50 hidden">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" />
        <nav className="relative flex flex-col py-6 px-6 h-full w-full bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="#">
              <img
                className="h-10"
                src="https://shuffle.dev/atis-assets/logo/atis/atis-color-black.svg"
                alt=""
                width="auto" />
            </a>
            <button className="navbar-close">
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-purple-50 hover:text-purple-600 rounded"
                  href="#"
                >
                  Start
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-purple-50 hover:text-purple-600 rounded"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-purple-50 hover:text-purple-600 rounded"
                  href="#"
                >
                  Services
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-purple-50 hover:text-purple-600 rounded"
                  href="#"
                >
                  Platform
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-purple-50 hover:text-purple-600 rounded"
                  href="#"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <a
                className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl"
                href="#"
              >
                Sign In
              </a>
              <a
                className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-purple-600 hover:bg-purple-700 rounded-l-xl rounded-t-xl"
                href="#"
              >
                Sign Up
              </a>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>© 2020 All rights reserved.</span>
            </p>
            <div className="text-center">
              <a className="inline-block px-1" href="#">
                <img src="https://shuffle.dev/atis-assets/social/facebook-purple.svg" alt="" />
              </a>
              <a className="inline-block px-1" href="#">
                <img src="https://shuffle.dev/atis-assets/social/twitter-purple.svg" alt="" />
              </a>
              <a className="inline-block px-1" href="#">
                <img src="https://shuffle.dev/atis-assets/social/instagram-purple.svg" alt="" />
              </a>
            </div>
          </div>
        </nav>
      </div> */}
    </>

  );
}
