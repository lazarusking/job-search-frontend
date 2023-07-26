"use client";

import useToggle from "@/hooks/useToggle";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "./Navlink";
import { useAuth } from "@/context/auth";

const Navbar = () => {
  const [show, toggle] = useToggle();
  const { isAuthenticated, user,loading,accessToken } = useAuth();

  return (
    <header aria-label="Site Header" className="bg-white">
      {/* <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            /> */}
      <div className="mx-auto container max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-row items-center">
            <Link className="flex items-center text-sky-600" href="/">
              <span className="sr-only">Home</span>
              <Image
                src="/logo.svg"
                alt="ISearch Logo"
                className="w-10 h-10"
                width={14}
                height={24}
                priority
              />
              <span className="ml-2 text-sky-600 font-extrabold lg:text-2xl sm:text-xl">
                ISEARCH
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4 md:order-2">
            {!user ? (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  href="/login"
                >
                  Login
                </Link>
                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-sky-600 px-5 py-2.5 text-sm font-medium text-white"
                    href="/register"
                  >
                    Post A Job
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link className="text-blue-600" href="/profile">
                  <p>{user?.username}</p>
                </Link>
                <Link
                  className="rounded-md text-blue-600 px-2.5 py-2.5 text-sm font-medium"
                  href="/logout"
                >
                  Logout
                </Link>
              </div>
            )}
            <div className="block md:hidden" onClick={toggle}>
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                aria-expanded="true"
                aria-label="toggle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            className={`${
              show ? "" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          >
            <nav aria-label="site-nav">
              <NavLink />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
