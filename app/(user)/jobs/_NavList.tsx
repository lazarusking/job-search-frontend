"use client";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";

const paths = [
  { name: "Saved", href: "/jobs/saved" },
  { name: "Applied", href: "/jobs/applied" },
  { name: "Selected", href: "/jobs/selected" },
];

export function UserJobsPageNav() {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  console.log(segments);

  return (
    <ul className="flex">
      {paths.map((link) => {
        const isActive = pathname === link.href;
        // console.log(isActive, pathname, link.href);

        return (
          <li key={link.name}>
            <Link
              className={`inline-block px-4 pb-2 text-sm font-medium border-b-2 ${
                isActive
                  ? "text-indigo-500 border-indigo-500"
                  : " border-transparent hover:border-gray-300"
              }  `}
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
