"use client";
import { rgbDataURL } from "@/lib/image";
import profileImage from "@/public/profile-data.svg";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative flex flex-wrap lg:-m-11">
      {/* <ArrowLongLeftIcon onClick={() => router.back()} className="w-7 h-7" /> */}
      <div className="relative h-44 md:h-auto w-full md:w-1/2 md:p-11">
        <Image
          className="mx-auto object-contain"
          src={profileImage}
          alt=""
          // width={}
          fill={true}
          blurDataURL={rgbDataURL(255, 255, 255)}
          placeholder="blur"
        />
      </div>
      <div className="w-full md:w-1/2 p-11">
        <h2 className="mb-6 font-heading font-bold text-5xl text-gray-900">
          How ISearch works
        </h2>
        <p className="mb-9 text-gray-900 text-base">
          Our seamless and user-friendly interface empowers you to explore a wide array of job opportunities in just a few clicks. Simply create your personalized profile, and our AI-driven system will analyze your preferences and career goals.
        </p>
        <div className="flex flex-wrap -m-2">
          <div className="w-full lg:w-auto p-2">
            <Link href={"/about"}>
              <button className="px-9 py-3.5 font-heading font-medium w-full lg:w-auto text-base text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 rounded-md">
                Learn More
              </button>
            </Link>
          </div>
          <div className="w-full lg:w-auto p-2">
            <Link href={"/get-started/third/"}>
              <button className="inline-flex justify-center px-9 py-3.5 font-heading font-medium w-full lg:w-auto text-base text-white bg-blue-600 hover:text-blue-400 hover:bg-white border hover:border-blue-400 rounded-md">
                Next <ArrowRightIcon className="ml-3 w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
