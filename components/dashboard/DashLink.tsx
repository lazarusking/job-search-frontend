"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";

type DashLinkType = {
  name: string;
  href?: string | null;
  Icon: ReactNode;
  onClickFunc?: any;
};
//text-neutral-500 hover:bg-indigo-50 text-white bg-indigo-500
export default function DashLink({
  name,
  href = null,
  Icon,
  onClickFunc,
}: DashLinkType) {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      {onClickFunc ? (
        <button
          className={`w-full flex items-center pl-3 py-3 pr-4 hover:bg-indigo-50 hover:text-neutral-500 rounded`}
          onClick={onClickFunc}
        >
          <span className="inline-block mr-3">{Icon}</span>
          <span>{name}</span>
        </button>
      ) : (
        <li>
          <Link
            className={`flex items-center pl-3 py-3 pr-4 ${
              segment === href ? "bg-indigo-500" : ""
            } hover:bg-indigo-50 hover:text-neutral-500 rounded`}
            href={href !== null ? `/dashboard/${href}` : "/dashboard/"}
            onClick={onClickFunc}
          >
            <span className="inline-block mr-3">{Icon}</span>
            <span>{name}</span>
            {/* <span className="inline-block ml-auto">
          <svg
            className="text-gray-600 w-3 h-3"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z"
              fill="currentColor"
            />
          </svg>
        </span> */}
          </Link>
        </li>
      )}
    </>
  );
}
