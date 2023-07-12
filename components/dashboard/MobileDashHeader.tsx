import Image from "next/image";

export default function MobileDashHeader() {
  return (
    <nav className="lg:hidden py-6 px-6 border-b">
      <div className="flex items-center justify-between">
        <a className="flex items-center text-2xl font-semibold" href="#">
          <Image
            src="/logo.svg"
            alt="ISearch Logo"
            className="w-10 h-10"
            width={14}
            height={24}
            priority
          />
          <h1 className="ml-2 text-sky-600 font-extrabold lg:text-2xl sm:text-xl">
            ISEARCH
          </h1>
        </a>
        <button className="navbar-burger flex items-center rounded focus:outline-none">
          <svg
            className="text-white bg-indigo-500 hover:bg-indigo-600 block h-8 w-8 p-2 rounded"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
