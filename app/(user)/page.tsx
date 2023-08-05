"use client";

import { rgbDataURL } from "@/lib/image";
import loginImage from "@/public/login.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="pt-6 pb-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-8 p-8 bg-white rounded-3xl">
            <div className="flex flex-wrap lg:items-center -m-8">
              <div className="w-full md:w-1/2 p-8">
                <div className="md:max-w-lg mx-auto">
                  <span className="inline-block mb-3 text-sm text-blue-500 font-bold uppercase tracking-widest">
                    Best caption here
                  </span>
                  <h2 className="mb-3 text-4xl lg:text-5xl font-extrabold font-heading">
                    <span className="">
                      Unlock Your Career Potential with AI-Driven Job
                      Recruitment!
                    </span>
                  </h2>
                  <p className="mb-6 text-gray-500 leading-loose">
                    Are you ready to take your job search to the next level?
                    Sign up now and let our AI-driven Job Recruitment platform
                    guide you towards the career of your dreams. Embrace the
                    future of job search with us!
                  </p>
                  <div className="flex flex-wrap -m-2">
                    <div className="w-full md:w-auto p-2">
                      <Link
                        className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-blue-600 hover:bg-purple-700 text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200"
                        href="/get-started"
                      >
                        Get Started
                      </Link>
                      <Link
                        className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                        href="#"
                      >
                        How it works
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full md:w-1/2 p-8 mx-auto md:mr-0 bg-white overflow-hidden rounded-3xl">
                {/* <div className="relative "> */}
                <Image
                  className="h-full w-full object-cover"
                  src={
                    "https://shuffle.dev/atis-assets/illustrations/men-on-chair-light.png"
                  }
                  alt=""
                  // fill={true}
                  width={500}
                  height={500}
                  blurDataURL={rgbDataURL(255, 255, 255)}
                  placeholder="blur"
                />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
