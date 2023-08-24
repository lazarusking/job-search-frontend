// import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo";

export default function DashImage() {
  return (
    <Link className="flex items-center text-xl font-semibold" href="/">
      <Logo
        className="w-10 h-10"
        // width={14}
        // height={24}
        // priority
      />
      <h1 className="ml-2 font-extrabold lg:text-2xl sm:text-xl">ISEARCH</h1>
    </Link>
  );
}
