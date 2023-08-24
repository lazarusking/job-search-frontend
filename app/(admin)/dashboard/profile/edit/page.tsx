"use client";
import ErrorMessage from "@/components/ErrorMessage";
import NameInputs from "@/components/inputs/NameInputs";
import SelectInput from "@/components/inputs/SelectInput";
import UrlInput from "@/components/inputs/UrlInput";
import { useAuth } from "@/context/auth";
import { updateRecruiter } from "@/lib/api";
import { authAxios } from "@/lib/auth";
import { toast } from "react-toastify";

import ProfileInput from "@/components/inputs/ProfileInput";
import { Extra, Recruiter, User, UserToken } from "@/lib/interfaces";
import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

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

export interface Choice2 {
  value: string;
  display_name: string;
}

export default function EditProfile() {
  const [form, setForm] = useState<Partial<Recruiter>>({});
  const [userDetail, setUserDetail] = useState<Partial<User>>({});
  const [error, setErrorMessage] = useState<Partial<Recruiter>>({});

  const [fileNames, setFileName] = useState<any>({});
  const { user: usertoken } = useAuth();
  const [isUpdating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<Recruiter>({ ...init });
  const [extra, setExtra] = useState<Extra>();

  const getProfile = useCallback(async () => {
    try {
      if (!usertoken) {
        return;
      }
      let res = await authAxios.get(`/recruiters/${usertoken.user_id}`);
      let res_options = await authAxios.options(`recruiters/`);
      let data = res.data;
      //   console.log(data);
      if (res.status === 200) {
        setProfile(data);
        setUserDetail(data.user);
      }
      if (res_options.status === 200) {
        setExtra(res_options.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [usertoken]);
  const getCountriesContent = (extra: Extra) => {
    let content = [];
    const choices = extra.actions.POST.country.choices;
    for (let idx in choices) {
      const item = choices[idx];
      content.push(
        <option key={idx} value={item.value}>
          {item.display_name}
        </option>
      );
    }
    return content;
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  const onUserDetailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setUserDetail((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  const onFormSubmitted = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);
    setErrorMessage({});

    const newData = { ...form, ...userDetail };

    const { data, error } = await updateRecruiter(
      usertoken as UserToken,
      newData as Recruiter
    );
    if (error && error.response.status === 400) {
      console.log(error.response.data);
      setErrorMessage(error.response.data);
      toast.error("Error", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    console.log(data);
    if (error) {
      console.error("An error occurred");
      return;
    }
    setUpdating(false);
    setProfile(data);
    toast.info("Changes made successfully");
  };

  const initForm = useCallback(() => {
    // console.log("__run__");

    getProfile();
  }, [getProfile]);
  useEffect(() => {
    // if (usertoken)
    initForm();
  }, [initForm, usertoken]);

  return (
    <section className="bg-gray-50 py-4">
      <div className="container px-4 mx-auto">
        <form
          encType="multipart/form-data"
          onSubmit={onFormSubmitted}
          className="p-6 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard"
        >
          <div className="pb-6 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-full md:w-auto p-2">
                <h2 className="text-gray-900 text-lg font-semibold">
                  Personal info
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Change your personal details here {usertoken?.username}!
                </p>
              </div>
              <div className="w-full md:w-auto p-2">
                <div className="flex flex-wrap justify-between -m-1.5">
                  <div className="w-full md:w-auto p-1.5">
                    <button
                      type="submit"
                      value="Save"
                      disabled={isUpdating}
                      className="flex flex-wrap justify-center w-full px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button"
                    >
                      <svg
                        className={`${
                          isUpdating ? "animate-spin" : "hidden"
                        } -ml-1 mr-3 h-5 w-5 text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx={12}
                          cy={12}
                          r={10}
                          stroke="currentColor"
                          strokeWidth={4}
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NameInputs
            first_name={profile.user.first_name}
            last_name={profile.user.last_name}
            onChangeFunc={onUserDetailChange}
          />
          <ProfileInput
            title={"Email Address"}
            placeholder={"johndoe@flex.co"}
            name={"email"}
            type="text"
            value={profile.user.email}
            onChangeFunc={onUserDetailChange}
            readOnly={true}
          />

          <ProfileInput
            title={"Location"}
            placeholder={""}
            name={"location"}
            type="text"
            onChangeFunc={onInputChange}
            value={profile.location}
          />
          <ProfileInput
            title={"Phone Number"}
            placeholder={"+2334567890"}
            name={"phone_number"}
            type="tel"
            onChangeFunc={onInputChange}
            value={profile.phone_number}
          />
          {error.phone_number && <ErrorMessage msg={error.phone_number} />}

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
                  {error.avatar && <ErrorMessage msg={error.avatar} />}
                </div>
                <div className="w-full md:flex-1 p-3">
                  <div className="relative flex flex-col items-center justify-center p-6 h-44 text-center text-green-500 focus-within:border-green-500 border border-dashed border-gray-200 rounded-lg">
                    <svg
                      className="mb-1.5"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p className="mb-1 text-sm text-gray-800 font-medium">
                      <span className="text-green-500">
                        Click to Upload a file
                      </span>
                      <span>or drag and drop</span>
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      PNG, JPG, GIF or up to 10MB
                    </p>
                    <p>{fileNames?.avatar}</p>
                    <input
                      className="absolute top-0 left-0 w-full h-full opacity-0"
                      type="file"
                      name="avatar"
                      id="avatar"
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.files![0],
                        }));
                        setFileName({
                          avatar: e.target.files![0].name,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SelectInput
            title="Country"
            name={"country"}
            onChangeFunc={onInputChange}
            getList={getCountriesContent}
            value={extra}
            selected={form?.country ? form.country : profile.country}
          />

          <UrlInput
            title="LinkedIn"
            name="linkedin"
            placeholder="linkedin.com/"
            onChangeFunc={onInputChange}
            value={profile.linkedin}
          />
          <UrlInput
            title="Facebook"
            name="facebook"
            placeholder="facebook.com/"
            onChangeFunc={onInputChange}
            value={profile.facebook}
          />
          <UrlInput
            title="GitHub"
            name="github"
            placeholder="github.com"
            onChangeFunc={onInputChange}
            value={profile.github}
          />
          <UrlInput
            title="Website"
            name="website"
            placeholder="website.com"
            onChangeFunc={onInputChange}
            value={profile.website}
          />
          <div className="pt-6">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-gray-800 font-semibold">Bio</p>
                  <p className="text-xs text-gray-500 font-medium">
                    Write something about yourself
                  </p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <textarea
                    className="block w-full h-64 p-6 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-200 rounded-lg shadow-input resize-none"
                    defaultValue={profile.description}
                    name="description"
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
