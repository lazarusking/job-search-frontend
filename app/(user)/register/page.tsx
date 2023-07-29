"use client";
import { rgbDataURL } from "@/lib/image";
import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Signup from "@/public/signup.png";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";
import { useDebounce } from "usehooks-ts";
import { authAxios } from "@/lib/auth";

async function checkUsername(username: string): Promise<any> {
  try {
    const response = await authAxios.postForm(`/users/check_username/`, {
      username: username,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
type RegisterError = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password1: string;
  password2: string;
  detail: string;
};
type UsernameCheckType = {
  valid: boolean;
  message: string;
};
export default function Register() {
  const [userDetail, setUserDetail] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password1: "",
    password2: "",
  });

  function handleUserDetailUpdate(e: ChangeEvent<HTMLInputElement>) {
    setUserDetail((user) => ({ ...user, [e.target.name]: e.target.value }));
  }
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setErrorMessage] = useState<Partial<RegisterError>>({});
  const { loading, isAuthenticated, register } = useAuth();
  const [usernameCheck, setUserNameCheck] = useState<
    Partial<UsernameCheckType>
  >({});
  const debouncedUsername = useDebounce(userDetail.username, 500);

  const router = useRouter();
  useEffect(() => {
    setUserDetail((userDetail) => ({
      ...userDetail,
      email: emailRef.current!.value,
    }));
  }, []);

  const performSearch = useCallback(async () => {
    if (debouncedUsername.length < 2) {
      return;
    }
    const searchResults = await checkUsername(debouncedUsername);
    setUserNameCheck(searchResults);
    console.log(searchResults);
    searchResults;
    return searchResults;
  }, [debouncedUsername]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setErrorMessage({});
    // try {
    console.log(userDetail);
    const resp = await register({ ...userDetail });
    console.log(await resp.response);

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
    setErrorMessage({});
    performSearch();
  }, [performSearch]);

  useEffect(() => {
    if (!loading && isAuthenticated) router.push("/");
  }, [isAuthenticated, loading, router]);
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
            method="post"
            className="mt-8 grid grid-cols-6 gap-6 w-full sm:w-auto"
            onSubmit={handleSubmit}
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
              <div className="relative pb-6">
                {error.first_name && <ErrorMessage msg={error.first_name} />}
              </div>
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
              <div className="relative pb-6">
                {error.last_name && <ErrorMessage msg={error.last_name} />}
              </div>
            </div>
            <div className="col-span-6">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                Email*
              </label>
              <input
                ref={emailRef}
                type="email"
                id="Email"
                name="email"
                className="px-3 py-2.5 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                onChange={handleUserDetailUpdate}
              />
              <div className="relative pb-6">
                {error.email && <ErrorMessage msg={error.email} />}
              </div>
            </div>
            <div className="col-span-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username*
              </label>

              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                className="px-3 py-2.5 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                onChange={handleUserDetailUpdate}
              />
              <div className="relative pb-6">
                {error.username && <ErrorMessage msg={error.username} />}
                {debouncedUsername.length > 2 && !error.username && (
                  <p
                    className={`absolute ${
                      usernameCheck.valid ? "text-green-400" : "text-rose-400"
                    } `}
                  >
                    {usernameCheck.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password*
              </label>

              <input
                type="password"
                id="Password"
                name="password1"
                className="px-3 py-2.5 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                onChange={handleUserDetailUpdate}
              />
              {error.password1 && <ErrorMessage msg={error.password1} />}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Password Confirmation *
              </label>

              <input
                type="password"
                id="PasswordConfirmation"
                name="password2"
                className="px-3 py-2.5 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                onChange={handleUserDetailUpdate}
              />
              {error.password2 && <ErrorMessage msg={error.password2} />}
            </div>

            <div className="col-span-6 grid justify-center sm:flex sm:items-center sm:gap-4">
              <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                Create an account
              </button>

              <div className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?
                <Link href="/login" className="text-gray-700 underline">
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
