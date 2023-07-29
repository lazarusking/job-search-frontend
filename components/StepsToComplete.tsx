import Link from "next/link";
import { ReactNode } from "react";

type Props = {};

export default function StepsToComplete({ children }: { children: ReactNode }) {
  return (
    <section className="py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center md:justify-between -m-6 mb-20">
            <div className="w-auto p-6">
              <Link
                className="font-heading font-semibold text-lg text-gray-900 hover:text-gray-800"
                href="get-started/"
              >
                <p className="mb-2 px-7">Create Free Account</p>
                <div className="h-0.5 bg-gradient-cyan" />
              </Link>
            </div>
            <div className="w-auto p-6">
              <Link
                className="font-heading font-semibold text-lg text-gray-900 hover:text-gray-800"
                href="/get-started/second"
              >
                <p className="mb-2 px-7">Build A Team</p>
                <div className="h-0.5 bg-gray-200 bg-gradient-green" />
              </Link>
            </div>
            <div className="w-auto p-6">
              <Link
                className="font-heading font-semibold text-lg text-gray-900 hover:text-gray-800"
                href={`/get-started/third/`}
              >
                <p className="mb-2 px-7">Start</p>
                <div className="h-0.5 bg-gray-200 bg-gradient-radial" />
              </Link>
            </div>
          </div>
          {/* <div className="relative flex flex-wrap -m-11">
              <div className="relative w-full md:w-1/2 p-11">
                <Image
                  className="mx-auto object-contain"
                  src="https://shuffle.dev/gradia-assets/images/how-it-works/illustration.png"
                  alt=""
                  // width={}
                  fill={true}
                  blurDataURL={rgbDataURL(255, 255, 255)}
                  placeholder="blur"
                />
              </div>
              <div className="w-full md:w-1/2 p-11">
                <h2 className="mb-6 font-heading font-bold text-5xl text-gray-900">
                  Start with creating a free account on ISearch.
                </h2>
                <p className="mb-9 text-gray-900 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                  justo, sit iaculis ultrices vitae pulvinar tellus. Volutpat, ut
                  lacus tristique blandit ligula.
                </p>
                <div className="flex flex-wrap -m-2">
                  <div className="w-full lg:w-auto p-2">
                    <button className="px-9 py-3.5 font-heading font-medium w-full lg:w-auto text-base text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                      Book A Call
                    </button>
                  </div>
                  <div className="w-full lg:w-auto p-2">
                    <button className="px-9 py-3.5 font-heading font-medium w-full lg:w-auto text-base text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 rounded-md">
                      <Link href={"/about"}>Learn More</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          {children}
        </div>
      </div>
    </section>
  );
}
