import { rgbDataURL } from "@/lib/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import Signupbro from "@/public/Sign up-bro.svg";

export default function Started({}: Props) {
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
          Start with creating a free account on ISearch.
        </h2>
        <p className="mb-9 text-gray-900 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit justo,
          sit iaculis ultrices vitae pulvinar tellus. Volutpat, ut lacus
          tristique blandit ligula.
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
            <Link href={"/get-started/second/"}>
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
