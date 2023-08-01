import Link from "next/link";
import { usePathname } from "next/navigation";
let activeClass =
  "bg-blue-700 text-white rounded md:bg-transparent md:text-blue-700 md:p-0";
let baseClass =
  "block py-2 pl-3 pr-4 border-b border-gray-100 text-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ";

const paths = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  // { name: "Services", href: "/services" },
  { name: "Jobs", href: "/jobs" },
];

export function NavLink() {
  const pathname = usePathname();

  return (
    <>
      <ul className="flex flex-col font-medium md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
        {paths.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.name} className="mb-1">
              <Link
                className={`${isActive ? `bg-blue-700 text-white rounded md:bg-transparent md:text-blue-700` : ""} block p-4 text-sm font-semibold text-gray-400 hover:bg-purple-50 hover:text-purple-600 rounded`}
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      {/* <ul className="flex flex-col font-medium p-1 sm:p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
        {paths.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.name}>
              <Link
                className={isActive ? `${baseClass} ${activeClass}` : baseClass}
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul> */}
    </>
  );
}
