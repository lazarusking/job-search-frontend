"use client";
import withAuth from "@/components/AuthWrapper";
import NameInputs from "@/components/inputs/NameInputs";
import SelectInput from "@/components/inputs/SelectInput";
import UrlInput from "@/components/inputs/UrlInput";
import ProfileInput from "@/components/inputs/Input";
import { useAuth } from "@/context/auth";
import { updateUser, updateUserInfo } from "@/lib/api";
import { authAxios } from "@/lib/auth";
import { Extra, User, UserProfile, UserToken } from "@/lib/interfaces";
import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

// {
//   user: User
//   slug: string
//   avatar: any
//   phone_number: string
//   description: string
//   country: string
//   created_at: string
//   gender: string
//   address: string
//   date_of_birth: any
//   looking_for: string
//   resume: any
//   updated_at: string
//   linkedin: string
//   facebook: string
//   github: string
//   website: string
// }
const init = {
  user: { id: 0, email: "", first_name: "", last_name: "", username: "" },
  slug: "",
  avatar: null,
  phone_number: "",
  description: "",
  country: "",
  created_at: "",
  gender: "",
  address: "",
  date_of_birth: null,
  looking_for: "",
  resume: null,
  updated_at: "",
  linkedin: "",
  facebook: "",
  github: "",
  website: "",
};
export default withAuth(Profile);

interface Country {
  [code: string]: string;
}
export interface Gender {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  choices: Choice2[];
}

export interface Choice2 {
  value: string;
  display_name: string;
}

function Profile() {
  const [form, setForm] = useState<Partial<UserProfile>>({});
  const [userDetail, setUserDetail] = useState<Partial<User>>({});
  const [fileNames, setFileName] = useState<any>({});
  const { user: usertoken } = useAuth();
  const [isUpdating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({ ...init });
  const [extra, setExtra] = useState<Extra>();
  const [countries, setCountries] = useState<Country>();
  // const { user, address } = form;

  // const router = useRouter();
  const getProfile = useCallback(async () => {
    try {
      if (!usertoken) {
        return;
      }
      let res = await authAxios.get(`/users/${usertoken.user_id}`);
      let res_options = await authAxios.options(`users/`);
      let data = res.data;
      console.log(data);
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
  const getCountries = async () => {
    try {
      let res = await authAxios.options(`countries/`);
      let data = res.data;
      console.log(data);
      if (res.status === 200) {
        setCountries(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getCountriesContent = (extra: Extra) => {
    // let content = [];
    // for (let idx in countries) {
    //   const item = countries[idx];
    //   content.push(
    //     <option key={idx} value={idx}>
    //       {item}
    //     </option>
    //   );
    // }
    // return content;
    let content = [];
    const choices = extra.actions.POST.country.choices;
    for (let idx in choices) {
      const item = choices[idx];
      {
        profile.country === item.value
          ? content.push(
              <option
                defaultValue={profile.country}
                key={idx}
                value={item.value}
              >
                {item.display_name}
              </option>
            )
          : content.push(
              <option key={idx} value={item.value}>
                {item.display_name}
              </option>
            );
      }
    }
    return content;
  };
  const getJobType = (extra: Extra) => {
    let content = [];
    const choices = extra.actions.POST.looking_for.choices;
    for (let idx in choices) {
      const item = choices[idx];
      {
        profile.looking_for === item.value
          ? content.push(
              <option
                defaultValue={profile.looking_for}
                key={idx}
                value={item.value}
              >
                {item.display_name}
              </option>
            )
          : content.push(
              <option key={idx} value={item.value}>
                {item.display_name}
              </option>
            );
      }
    }
    return content;
  };
  const getGender = (extra: Extra) => {
    let content = [];
    const choices = extra.actions.POST.gender.choices;
    for (let idx in choices) {
      const item = choices[idx];
      content.push(
        <div className="space-x-4 mx-3 inline-block" key={item.value}>
          <label htmlFor={item.display_name}>{item.display_name}</label>
          <input
            type="radio"
            defaultChecked={profile.gender === item.value}
            value={item.value}
            name={"gender"}
            onChange={onInputChange}
          />
        </div>
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
    const formData = new FormData(e.currentTarget);
    // form["user"] = userDetail;
    const newData = { ...form, ...userDetail };
    formData.append("avatar", newData.avatar);
    Object.entries(userDetail).map((item, value) => {
      formData.append(item[0], item[1]);
      console.log(item[0], item[1], value);
    });
    console.log(formData.get("avatar"));
    console.log(formData.get("resume"));
    formData.append("user", JSON.stringify(userDetail));
    // setForm((previousState) => ({...previousState,user:userDetail}));
    const { data, error } = await updateUser(usertoken as UserToken, newData);
    // const { data: data1, error: error1 } = await updateUserInfo(
    //   usertoken as UserToken,
    //   userDetail
    // );
    console.log(data);
    // console.log(data1);

    if (error) {
      console.error("An error occurred");
      return;
    }

    // updateState(data);

    setUpdating(false);

    console.info("Changes made successfully");
  };

  const initForm = useCallback(() => {
    // console.log("__run__");

    getProfile();
    // getCountries();
    // setForm({
    //   // email: usertoken?.email,
    //   // // first_name: usertoken?.first_name,
    //   // user: user,
    // });
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
                    <button className="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-600 border border-gray-200 hover:border-gray-300 bg-white rounded-md shadow-button">
                      <p>Cancel</p>
                    </button>
                  </div>
                  <div className="w-full md:w-auto p-1.5">
                    <input
                      type="submit"
                      value="Save"
                      className="flex flex-wrap justify-center w-full px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button"
                    />
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
            title={"Date of Birth"}
            placeholder={""}
            name={"date_of_birth"}
            type="date"
            onChangeFunc={onInputChange}
            value={profile.date_of_birth}
          />
          <ProfileInput
            title={"Location"}
            placeholder={""}
            name={"address"}
            type="text"
            onChangeFunc={onInputChange}
            value={profile.address}
          />
          <ProfileInput
            title={"Phone Number"}
            placeholder={""}
            name={"phone_number"}
            type="tel"
            onChangeFunc={onInputChange}
            value={profile.phone_number}
          />
          <ProfileInput
            title={"Gender"}
            placeholder={""}
            name={"gender"}
            type="radio"
            onChangeFunc={onInputChange}
            value={profile.gender}
          >
            {extra && getGender(extra)}
          </ProfileInput>

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
                          [e.target.name]: e.target.files,
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

          <ProfileInput title="Resume">
            <div className="w-full md:flex-1 p-3">
              {profile.resume && (
                <div className="inline-block z-10 space-y-2 px-2 m-4 relative text-green-500 focus-within:border-green-500 border border-dashed border-gray-200 rounded-lg">
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}${profile.resume}`}
                  >
                    Resume.pdf
                  </a>
                </div>
              )}
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
                {fileNames.resume ? (
                  <a
                    className="z-10"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}${profile.resume}`}
                  >
                    {fileNames?.resume}
                  </a>
                ) : (
                  <>
                    <p className="mb-1 text-sm text-gray-800 font-medium">
                      <span className="text-green-500">
                        Click to Upload a file{" "}
                      </span>
                      <span>or drag and drop</span>
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      PDF up to 10MB
                    </p>
                  </>
                )}

                <input
                  className="absolute top-0 left-0 w-full h-full opacity-0"
                  type="file"
                  accept="application/pdf"
                  name="resume"
                  id="resume"
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.files![0],
                    }));
                    setFileName({
                      resume: e.target.files![0].name,
                    });
                  }}
                />
              </div>
            </div>
          </ProfileInput>

          <SelectInput
            title="Looking For"
            name={"looking_for"}
            onChangeFunc={onInputChange}
            getList={getJobType}
            value={extra}
          />
          <SelectInput
            title="Country"
            name={"country"}
            onChangeFunc={onInputChange}
            getList={getCountriesContent}
            value={extra}
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
