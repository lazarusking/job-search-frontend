"use client";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function Breadcrumbs() {
  // const segments = useSelectedLayoutSegments().filter(
  //   (item) => !item.startsWith("(")
  // );
  // const seg = useSelectedLayoutSegment();
  // console.log(segments);
  // console.log(seg, usePathname());
  const paths = usePathname()
    .split("/")
    .filter((v) => v.length > 0);

  // console.log(paths);
  const crumblist = paths.map((subpath, idx) => {
    // We can get the partial nested route for the crumb
    // by joining together the path parts up to this point.
    const href = "/" + paths.slice(0, idx + 1).join("/");
    // The title will just be the route string for now
    const title = subpath;
    return { href, title };
  });

  // console.log(crumblist);
  // function generateBreadcrumbs() {
  //   const paths=usePathname()
  //   const asPathWithoutQuery = paths.split("?")[0];
  //   const asPathNestedRoutes = asPathWithoutQuery.split("/")
  //                                                .filter(v => v.length > 0);

  //   const crumblist = asPathNestedRoutes.map((subpath, idx) => {
  //     const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
  //     return { href, title: getDefaultTextGenerator(subpath, href) };
  //   })

  //   return [{ href: "/", text: "Home" }, ...crumblist];
  // }, []);
  return (
    <section className="py-4 overflow-hidden">
      <div className="container px-4 mx-auto">
        <ul className="inline-flex flex-wrap items-center -m-0.5">
          <li className="p-0.5">
            <Link
              className="group flex items-center text-xs text-neutral-400 hover:text-neutral-600"
              href="/"
            >
              <svg
                className="mr-1"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.33333 3.33331L7.68689 2.97976C7.59312 2.88599 7.46594 2.83331 7.33333 2.83331V3.33331ZM8.66667 4.66665L8.31311 5.0202C8.40688 5.11397 8.53406 5.16665 8.66667 5.16665V4.66665ZM2.5 11.3333V4.66665H1.5V11.3333H2.5ZM3.33333 3.83331H7.33333V2.83331H3.33333V3.83331ZM6.97978 3.68687L8.31311 5.0202L9.02022 4.31309L7.68689 2.97976L6.97978 3.68687ZM8.66667 5.16665H12.6667V4.16665H8.66667V5.16665ZM13.5 5.99998V11.3333H14.5V5.99998H13.5ZM12.6667 12.1666H3.33333V13.1666H12.6667V12.1666ZM12.6667 5.16665C13.1269 5.16665 13.5 5.53974 13.5 5.99998H14.5C14.5 4.98746 13.6792 4.16665 12.6667 4.16665V5.16665ZM2.5 4.66665C2.5 4.20641 2.8731 3.83331 3.33333 3.83331V2.83331C2.32081 2.83331 1.5 3.65412 1.5 4.66665H2.5ZM13.5 11.3333C13.5 11.7936 13.1269 12.1666 12.6667 12.1666V13.1666C13.6792 13.1666 14.5 12.3458 14.5 11.3333H13.5ZM1.5 11.3333C1.5 12.3458 2.32081 13.1666 3.33333 13.1666V12.1666C2.8731 12.1666 2.5 11.7936 2.5 11.3333H1.5Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                className="text-neutral-300 group-hover:text-neutral-400"
                width={12}
                height={13}
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 3L8 6.5L4.5 10"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          {crumblist.map((segment, index) => {
            // if (!segment) {
            return (
              <Fragment key={segment.title}>
                <li key={index}>
                  <Link
                    className="text-neutral-500 hover:text-neutral-600 text-xs text--200 block transition"
                    href={`${segment.href}/`}
                  >
                    <span>{segment.title}</span>
                  </Link>
                </li>
                <li>
                  <ChevronRightIcon className="w-3 h-3 text-neutral-300 group-hover:text-neutral-400" />
                </li>
              </Fragment>
            );
          })}
          {/* <li className="p-0.5">
            <a
              className="group flex items-center text-xs text-neutral-400 hover:text-neutral-600"
              href="#"
            >
              <span className="mr-1">Customers</span>
              <svg
                className="text-neutral-300 group-hover:text-neutral-400"
                width={12}
                height={13}
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 3L8 6.5L4.5 10"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>
          <li className="p-0.5">
            <a
              className="group flex items-center text-xs text-neutral-400 hover:text-neutral-600"
              href="#"
            >
              <span className="mr-1">Profile</span>
              <svg
                className="text-neutral-300 group-hover:text-neutral-400"
                width={12}
                height={13}
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 3L8 6.5L4.5 10"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>
          <li className="p-0.5">
            <a
              className="group flex items-center text-xs text-neutral-600"
              href="#"
            >
              <span>Edit</span>
            </a>
          </li> */}
        </ul>
      </div>
    </section>

    // <nav aria-label="Breadcrumb">
    //   <ol className="flex justify-center items-center gap-1 text-sm text-gray-600">
    //     <li>
    //       <Link
    //         className="text-xs text--200 block transition hover:text-gray-700"
    //         href={"/"}
    //       >
    //         <span className="sr-only"> Home </span>
    //         <HomeIcon className="h-4 w-4" />
    //       </Link>
    //     </li>
    //     {segments.map((segment, index) => {
    //       console.log(segments, seg);

    //       if (!segment) {
    //         return (
    //           <>
    //             <li key={index}>
    //               <Link
    //                 className="text-xs text--200 block transition hover:text-gray-700"
    //                 href={segment}
    //               >
    //                 <span>{"Home"}</span>
    //               </Link>
    //             </li>
    //           </>
    //         );
    //       }
    //       return (
    //         <li key={index}>
    //           <Link
    //             className="flex text-xs text--200 transition hover:text-gray-700"
    //             href={segment}
    //           >
    //             <span>{segment ? segment : "Home"}</span>
    //             <ChevronRightIcon className="w-5 h-5" />
    //           </Link>
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-4 w-4 rtl:rotate-180 last:hidden"
    //             viewBox="0 0 20 20"
    //             fill="currentColor"
    //           >
    //             <path
    //               fillRule="evenodd"
    //               d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
    //               clipRule="evenodd"
    //             />
    //           </svg>
    //         </li>
    //       );
    //     })}
    //   </ol>
    // </nav>
  );
}
