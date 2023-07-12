"use client";
import { rgbDataURL } from "@/lib/image";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Signup from "@/public/signup.png";
import Link from "next/link";

export default function Register() {
  const [userDetail, setuserDetail] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  function handleUserDetailUpdate(e: ChangeEvent<HTMLInputElement>) {
    setuserDetail((user) => ({ ...user, [e.target.name]: [e.target.value] }));
  }
  return (
    <section className="px-6 py-4 lg:px-8 overflow-hidden bg-white sm:py-6">
      <div className="grid md:grid-cols-12 gap-x-8 gap-y-16 sm:gap-y-20 max-w-7xl items-center my-auto m-auto bg-white sm:py-5 sm:px-6">
        <aside className="relative block h-16 md:order-last md:col-span-5 md:h-full">
          <Image
            src={Signup}
            alt={"Signup Splash Image"}
            className={"h-full w-full object-cover"}
            blurDataURL={rgbDataURL(255, 255, 255)}
            placeholder="blur"
            // width={500}
            // height={500}
            // fill={true}
          />
        </aside>
        <div className="flex flex-col md:col-span-7 w-full mx-auto justify-center items-center ">
          <div className="text-center flex justify-center items-start sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-xl font-bold md:text-3xl text-blue-500">
              Create New Account
            </h1>
          </div>
          <form
            action="#"
            className="mt-8 grid grid-cols-6 gap-6 w-full sm:w-auto"
          >
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="FirstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>

              <input
                type="text"
                id="FirstName"
                name="first_name"
                className="px-3 py-2.5 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                onChange={handleUserDetailUpdate}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>

              <input
                type="text"
                id="LastName"
                name="last_name"
                className="px-3 py-2.5 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                onChange={handleUserDetailUpdate}
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                type="email"
                id="Email"
                name="email"
                className="px-3 py-2.5 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                onChange={handleUserDetailUpdate}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                type="password"
                id="Password"
                name="password"
                className="px-3 py-2.5 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                onChange={handleUserDetailUpdate}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Password Confirmation
              </label>

              <input
                type="password"
                id="PasswordConfirmation"
                name="password_confirmation"
                className="px-3 py-2.5 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                onChange={handleUserDetailUpdate}
              />
            </div>

            <div className="col-span-6 grid justify-center sm:flex sm:items-center sm:gap-4">
              <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                Create an account
              </button>

              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?
                <Link href="/login" className="text-gray-700 underline">
                  Log in
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
