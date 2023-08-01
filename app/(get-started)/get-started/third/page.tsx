"use client";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import signup from "@/public/Sign up-pana.svg";
import { rgbDataURL } from "@/lib/image";
import Image from "next/image";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
type Props = {};

export default function Page({ }: Props) {
  const router = useRouter();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/register");
  };
  return (
    <div className="relative flex flex-wrap lg:-m-11">
      <div className="relative h-44 md:h-auto w-full md:w-1/2 md:p-11">
        <Image
          className="mx-auto object-contain"
          src={signup}
          alt="sign up as"
          // width={}
          fill={true}
          blurDataURL={rgbDataURL(255, 255, 255)}
          placeholder="blur"
        />
      </div>
      <div className="w-full md:w-1/2 pt-0 sm:p-11">
        <h2 className="mb-6 font-heading font-bold text-5xl text-gray-900">
          Sign up as a Job Recruiter or Finder
        </h2>
        <p className="mb-9 text-gray-900 text-base">
          Recruiters, find top talent. Job seekers, discover endless opportunities. Sign up today and let ISearch lead you to success!
        </p>
        <div className="flex flex-wrap justify-center -m-2">
          <div className="w-1/2 lg:w-auto p-2">
            <Link href={{ pathname: "/register" }}>
              <button className="inline-flex justify-center px-5 py-3.5 font-heading font-medium w-full lg:w-auto text-base text-white bg-blue-600 hover:text-blue-400 hover:bg-white border hover:border-blue-400 rounded-md">
                Job Seeker
              </button>
            </Link>
          </div>
          <div className="w-1/2 lg:w-auto p-2">
            <Link
              // as={"/register"}
              href={{ pathname: "/register", query: { type: "recruiter" } }}
            >
              <button className="px-9 py-3.5 font-heading font-medium w-full lg:w-auto text-base text-gray-900 bg-white hover:bg-gray-50 hover:text-indigo-400 border border-gray-300 rounded-md">
                Employer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
}
