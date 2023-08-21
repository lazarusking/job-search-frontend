"use client";
import { useAuth } from "@/context/auth";
import { authAxios } from "@/lib/auth";
import { Recruiter } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const init: Recruiter = {
  id: 0,
  user: {
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    is_recruiter: true,
  },
  slug: "",
  avatar: null,
  phone_number: "",
  description: "",
  country: "",
  created_at: "",
  linkedin: "",
  facebook: "",
  github: "",
  website: "",
  company: "",
  location: "",
  updated_at: "",
};

export default function Profile() {
  const { user: usertoken } = useAuth();
  const [profile, setProfile] = useState<Recruiter>({ ...init });
  const getProfile = useCallback(async () => {
    try {
      if (!usertoken) {
        return;
      }
      let res = await authAxios.get(`/recruiters/${usertoken.user_id}`);
      let data = res.data;
      console.log(data);
      if (res.status === 200) {
        setProfile(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [usertoken]);

  const initForm = useCallback(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    initForm();
  }, [initForm, usertoken]);

  return (
    <div className="px-12 py-2 mx-auto">
      <div className="flex items-center justify-between px-4 sm:px-0">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Profile Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href={"profile/edit/"}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </Link>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.user.first_name} {profile.user.last_name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Username
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.user.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.user.email}
            </dd>
          </div>
          <div className="py-6 border-b border-gray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-gray-800 font-semibold">Photo</p>
                  <p className="text-xs text-gray-500 font-medium">
                    Your profile picture
                  </p>
                </div>
                <div className="w-full md:w-auto p-3 relative">
                  <Image
                    src={
                      profile.avatar
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${profile.avatar}`
                        : "https://shuffle.dev/flex-ui-assets/images/dashboard/forms/avatar.png"
                    }
                    alt="Avatar"
                    className="rounded-full"
                    width={100}
                    height={104}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Company
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.company}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.phone_number}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Country
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.country}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Github
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.github}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              LinkedIn
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.linkedin}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Website
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.website}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
