"use client";

import { useAuth } from "@/context/auth";
import useToggle from "@/hooks/useToggle";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "./Navlink";
import DropdownProfile from "./DropdownProfile";

const Navbar = () => {
  const [show, toggle] = useToggle();
  const [showDropdown, toggleDropdown] = useState(false);
  const { isAuthenticated, user, loading, accessToken, logout } = useAuth();
  const [hasMounted, sethasMounted] = useState(false);
  const dialogRef = useRef<any>();

  useEffect(() => {
    sethasMounted(true);
  }, []);
  if (!hasMounted) return null;
  return (
    <header aria-label="Site Header" className="bg-white" ref={dialogRef}>
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
          {/* Show username if authed or log in button horizontal nav */}
          <div className="flex items-center gap-4 md:order-2">
            {!user?.username ? (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md text-blue-600 px-5 py-2.5 text-sm font-medium"
                  href="/login"
                >
                  Log In
                </Link>
                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-sky-600 px-5 py-2.5 text-sm font-medium text-white"
                    href="/get-started"
                  >
                    Post A Job
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* <Link className="text-blue-600 capitalize" href="/profile">
                  <p>{user?.username}</p>
                </Link> */}
                <DropdownProfile
                  username={user?.username}
                  toggle={toggleDropdown}
                  show={showDropdown}
                  logout={logout}
                />
                {/* <button
                  onClick={logout}
                  className="rounded-md text-blue-600 px-2.5 py-2.5 text-sm font-medium"
                >
                  Log out
                </button> */}
              </div>
            )}
            {/* Menu button toggle */}
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
          {/* Nav links in middle horizontal header */}
          <div
            className={`${
              show ? "" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          >
            <nav aria-label="site-nav">
              <NavLink />
            </nav>
          </div>
          {/* Sidebar navlinks for mobile view vertical */}
          <div
            className={`navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50 ${
              show ? "" : "hidden"
            }`}
          >
            <div
              onClick={toggle}
              className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            />
            <nav className="relative flex flex-col py-6 px-6 h-full w-full bg-white border-r overflow-y-auto">
              <div className="flex items-center mb-8">
                <Link
                  className="mr-auto flex items-center text-sky-600"
                  href="/"
                >
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
                <button onClick={toggle} className="navbar-close">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* <nav aria-label="site-nav"> */}
              <div
                className={`
                 items-center justify-between w-full md:flex md:w-auto md:order-1`}
              >
                <nav aria-label="site-nav">
                  <NavLink />
                </nav>
              </div>
              {/* </nav> */}

              <div className="text-left mt-auto">
                {!user?.username ? (
                  <div className="pt-6">
                    <Link
                      className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl"
                      href="/login"
                    >
                      Sign In
                    </Link>
                    <a
                      className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-purple-600 hover:bg-purple-700 rounded-l-xl rounded-t-xl"
                      href="/get-started/third"
                    >
                      Sign Up
                    </a>
                  </div>
                ) : (
                  <>
                    <Link
                      className="block capitalize px-4 py-3 mb-2 leading-loose text-base text-gray-600 font-semibold bg-gray-100 hover:bg-purple-700 hover:text-white"
                      href="/profile"
                    >
                      <p>{user?.username}</p>
                    </Link>
                    <button
                      onClick={logout}
                      className="space-x-4 text-gray-600 items-center w-full flex px-4 py-3 mb-2 leading-loose text-lg text-center font-semibold hover:bg-gray-500 hover:text-white"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 hover:text-white" />
                      <span>Log out</span>
                    </button>
                  </>
                )}
                <p className="my-4 text-xs text-center text-gray-400">
                  <span>© 2020 All rights reserved.</span>
                </p>
                <div className="text-center">
                  <a className="inline-block px-1" href="#">
                    <img
                      src="https://shuffle.dev/atis-assets/social/facebook-purple.svg"
                      alt=""
                    />
                  </a>
                  <a className="inline-block px-1" href="#">
                    <img
                      src="https://shuffle.dev/atis-assets/social/twitter-purple.svg"
                      alt=""
                    />
                  </a>
                  <a className="inline-block px-1" href="#">
                    <img
                      src="https://shuffle.dev/atis-assets/social/instagram-purple.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
