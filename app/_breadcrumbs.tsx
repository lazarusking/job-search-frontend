"use client";
import Link from "next/link";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import React from "react";

type Props = {};

export default function Breadcrumbs({}: Props) {
  const segments = useSelectedLayoutSegments().filter(
    (item) => !item.startsWith("(")
  );
  const seg = useSelectedLayoutSegment();
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex justify-center items-center gap-1 text-sm text-gray-600">
        {segments.map((segment, index) => {
          console.log(segments, seg);

          if (!segment) {
            return (
              <>
                <li key={index}>
                  <Link
                    className="text-xs text--200 block transition hover:text-gray-700"
                    href={segment}
                  >
                    {"Home"}
                  </Link>
                </li>
              </>
            );
          }
          return (
            <li key={index}>
              <Link
                className="text-xs text--200 block transition hover:text-gray-700"
                href={segment}
              >
                {segment ? segment : "Home"}
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 rtl:rotate-180 last:hidden"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
