"use client";
import { rgbDataURL } from "@/lib/image";
import Signupbro from "@/public/Sign up-bro.svg";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function Started() {
  return (
    <div className="relative flex flex-wrap lg:-m-11">
      <div className="relative h-44 md:h-auto w-full md:w-1/2 md:p-11">
        <Image
          className="mx-auto object-contain"
          src={Signupbro}
          alt=""
          // width={500}
          // height={500}
          fill={true}
          blurDataURL={rgbDataURL(255, 255, 255)}
          placeholder="blur"
        />
      </div>
      <div className="w-full md:w-1/2 p-11">
        <h2 className="mb-6 font-heading font-bold text-5xl text-gray-900">
          Welcome to ISearch.
        </h2>
        <p className="mb-9 text-gray-900 text-base">
          Discover an innovative platform designed to revolutionize your job
          search. We connect job seekers and recruiters using advanced AI
          technology, ensuring that you find the perfect job match that aligns
          with your skills and aspirations. Let us help you kickstart your
          journey towards a fulfilling career!
        </p>
        <div className="flex flex-wrap -m-2">
          <div className="w-full lg:w-auto p-2">
            <Link href={"/about"}>
              <span className="inline-flex justify-center px-9 py-3.5 font-heading font-medium w-full lg:w-auto text-base text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 rounded-md">
                Learn More
              </span>
            </Link>
          </div>
          <div className="w-full lg:w-auto p-2">
            <Link href={"/get-started/second/"}>
              <span className="inline-flex items-center justify-center px-9 py-3.5 font-heading font-medium w-full lg:w-auto text-base text-white bg-blue-600 hover:text-blue-400 hover:bg-white border hover:border-blue-400 rounded-md">
                Next <ArrowRightIcon className="ml-3 w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
