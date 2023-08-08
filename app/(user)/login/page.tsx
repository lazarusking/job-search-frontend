"use client";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuth } from "@/context/auth";
import { rgbDataURL } from "@/lib/image";
import loginImage from "@/public/login.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
type LoginError = {
  email: string;
  password: string;
  detail: string;
};
export default function Login() {
  const [userDetail, setUserDetail] = useState({ email: "", password: "" });
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  function handleUserDetailUpdate(e: ChangeEvent<HTMLInputElement>) {
    setUserDetail((user) => ({ ...user, [e.target.name]: e.target.value }));
  }
  const [error, setErrorMessage] = useState<Partial<LoginError>>({});
  const { loading, isAuthenticated, login, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    setUserDetail((userDetail) => ({
      ...userDetail,
      email: emailRef.current!.value,
    }));
    setUserDetail((userDetail) => ({
      ...userDetail,
      password: passwordRef.current!.value,
    }));
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setErrorMessage({});
    // try {
    console.log(userDetail);
    const resp = await login(userDetail.email, userDetail.password);
    if (resp && resp.status === 200) {
      console.log("Logged In successfully");
      console.log(resp.data.user.is_recruiter);
      const {
        data: {
          user: { is_recruiter },
        },
      } = resp;
      console.log(is_recruiter);

      if (resp.data.user.is_recruiter) {
        console.log("redirecting");
        router.push("/dashboard");
      } else {
        router.push("/jobs");
      }
    }

    if (resp.response && resp.response.status === 400) {
      console.log(resp.response.data);
      setErrorMessage(resp.response.data);
    }
    if (resp.response && resp.response.status === 401) {
      setErrorMessage({ detail: "Invalid login credentials" });
    }
    // } catch (ex: any) {
    // }
    if (!loading && isAuthenticated) router.push("/");
  };
  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (user?.is_recruiter) router.push("/dashboard");
      if (!user?.is_recruiter) router.push("/");
    }
  }, [isAuthenticated, loading, router, user?.is_recruiter]);

  return (
    <section className="px-6 py-4 lg:px-8 overflow-hidden bg-white sm:py-6">
      {/* <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                iste dolor cupiditate blanditiis ratione.
              </p>
              
            </div>
          </div>
          <div className="relative">
          <Image
            src={"/login.png"}
            alt={"Login Splash Image"}
            // className={'h-full w-full object-cover'}
            width={500}
            height={500}
            // fill={true}
          // />
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            // width={2432}
            // height={1442}
          />
          </div>
        </div>
      </div>
    </div> */}
      <div className="grid md:grid-cols-12 gap-x-8 gap-y-16 sm:gap-y-20 max-w-7xl items-center my-auto m-auto bg-white sm:py-5 sm:px-6">
        <div className="relative block h-16 md:order-last md:col-span-5 md:h-full">
          <Image
            src={loginImage}
            alt={"Login Splash Image"}
            className={"h-full w-full object-cover"}
            blurDataURL={rgbDataURL(255, 255, 255)}
            placeholder="blur"
            // width={500}
            // height={500}
            // fill={true}
          />
        </div>
        <div className="flex flex-col md:col-span-7 w-full mx-auto justify-center items-center ">
          <div className="text-center flex justify-center items-start sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-xl font-bold md:text-3xl text-blue-500">
              Login
            </h1>
          </div>
          <form
            method="post"
            className="w-full sm:max-w-md"
            onSubmit={handleSubmit}
          >
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  placeholder="you@example.com"
                  onChange={handleUserDetailUpdate}
                />
              </div>
              {error.email && <ErrorMessage msg={error.email} />}
            </div>
            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400  
                  focus:outline-none block w-full rounded-md sm:text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  placeholder="password"
                  onChange={handleUserDetailUpdate}
                />
              </div>
              {error.password && <ErrorMessage msg={error.password} />}
              {error.detail && <ErrorMessage msg={error.detail} />}
            </div>
            <div className="grid mt-6 text-center items-center">
              {/* <input
                type="submit"
                value="Login"
                className="w-3/4 cursor-pointer bg-sky-500 bg-gradient-to-r from-blue-500 to-rose-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 font-semibold hover:bg-none focus:outline-none focus:ring focus:bg-opacity-70 text-white"
              /> */}
              <input
                type="submit"
                value="Sign In"
                className="flex w-auto cursor-pointer justify-center rounded-md bg-indigo-600 px-6 py-2 mb-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              />
              <div className="w-full text-sm">
                <p className="text-gray-500">
                  {`Don't have an account?`}{" "}
                  <Link href={"/register"} className="text-blue-400 underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
