"use client";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    // Burger menus
    document.addEventListener("DOMContentLoaded", function () {
      // open
      const burger = document.querySelectorAll(".navbar-burger");
      const menu = document.querySelectorAll(".navbar-menu");
      console.log(burger);
      if (burger.length && menu.length) {
        for (let i = 0; i < burger.length; i++) {
          burger[i].addEventListener("click", function () {
            for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle("hidden");
            }
          });
        }
      }

      // close
      const close = document.querySelectorAll(".navbar-close");
      const backdrop = document.querySelectorAll(".navbar-backdrop");

      if (close.length) {
        for (let i = 0; i < close.length; i++) {
          close[i].addEventListener("click", function () {
            for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle("hidden");
            }
          });
        }
      }

      if (backdrop.length) {
        for (let i = 0; i < backdrop.length; i++) {
          backdrop[i].addEventListener("click", function () {
            for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle("hidden");
            }
          });
        }
      }
    });

    return () => {};
  });

  return (
    <section>
      <header aria-label="Page Header" className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:p-4 lg:px-8">
          <div className="pb-6 border-b-2 border-gray-500 sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Section header
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                {`Let's write a new blog post!`} 🎉
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search for entries"
                />
              </div>

              <button
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
}
