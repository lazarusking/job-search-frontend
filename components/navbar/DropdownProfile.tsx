import Image from "next/image";
import { useCallback, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import profilePic from "@/public/profile-picture-3.jpg";
interface DropdownType {
  username: string;
  show: boolean;
  toggle: any;
  logout: any;
  paths: { name: string; href: string }[];
}
// const paths = [
//   { name: "Profile", href: "/profile" },
//   { name: "Jobs", href: "/jobs/" },
//   // { name: "Services", href: "/services" },
//   { name: "Saved Jobs", href: "/jobs/saved" },
// ];

type Links = {
  title: string;
  href: string;
  id: number;
};

const DropdownLinks = ({ title, href, id }: Links) => {
  return (
    <a
      href={href}
      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
      role="menuitem"
      tabIndex={-1}
      id={`menu-item-${id}`}
    >
      {title}
    </a>
  );
};

export default function DropdownProfile({
  username,
  show,
  toggle,
  logout,
  paths,
}: DropdownType) {
  const modalRef = useRef(null);
  const handleShow = useCallback(() => {
    toggle((show: any) => !show);
  }, [toggle]);

  useOnClickOutside(modalRef, () => toggle(false));

  return (
    <div className="relative inline-block text-left" ref={modalRef}>
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
        onClick={handleShow}
      >
        <span className="sr-only">Open user menu</span>
        <Image
          className="w-8 h-8 mr-2 rounded-full"
          src={profilePic}
          alt="user photo"
        />
        {username}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {show && (
        <div
          className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {paths.map((item, index) => (
              <DropdownLinks
                key={index}
                href={item.href}
                title={item.name}
                id={index}
              />
            ))}

            <div>
              <button
                type="submit"
                className="text-gray-700 block w-full px-4 py-2 border-t text-left text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="last-menu-item"
                onClick={logout}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
