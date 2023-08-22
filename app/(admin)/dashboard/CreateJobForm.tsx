import { createJob, updateJob } from "@/lib/api";
import { authAxios } from "@/lib/auth";
import { Extra, Job } from "@/lib/interfaces";
import { format } from "date-fns";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

export default function CreateJobForm({
  currentJobData,
  setJobs,
}: {
  currentJobData?: Job;
  setJobs?: any;
}) {
  const [form, setForm] = useState<Partial<Job>>({ ...currentJobData });
  const [extra, setExtra] = useState<Extra>();
  const [isUpdating, setUpdating] = useState(false);

  const getJobField = useCallback(async () => {
    try {
      //   if (!usertoken) {
      //     return;
      //   }
      //   let res = await authAxios.get(`/users/${usertoken.user_id}`);
      let res_options = await authAxios.options(`recruiters/jobs/`);
      let data = res_options.data;
      console.log(data);
      //   if (res.status === 200) {
      //     setExtra(data);
      //   }
      if (res_options.status === 200) {
        setExtra(res_options.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  const getJobTypes = (extra: Extra) => {
    let content = [];
    const choices = extra.actions.POST.job_type.choices;
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

  const initForm = useCallback(() => {
    // console.log("__run__");

    getJobField();
  }, [getJobField]);
  useEffect(() => {
    // if (usertoken)
    initForm();
  }, [initForm]);
  const onFormSubmitted = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    const { data, error } = currentJobData
      ? await updateJob(currentJobData.id, form as Job)
      : await createJob(form as Job);
    console.log(data);
    if (error) {
      console.error("An error occurred");
      return;
    }
    console.info("Job created successfully");
    setJobs(data);
    setUpdating(false);
    toast.info("Changes made successfully");
  };
  return (
    <div className="bg-white ">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 ">Job Details</h2>
        <form onSubmit={onFormSubmitted}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-bold text-gray-900 "
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                placeholder="Job title"
                required
                defaultValue={currentJobData?.title}
                onChange={onInputChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-bold text-gray-900 "
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                placeholder="Job location"
                defaultValue={currentJobData?.location}
                onChange={onInputChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="skills_required"
                className="block mb-2 text-sm font-bold text-gray-900 "
              >
                Skill Required
              </label>
              <input
                type="text"
                name="skills_required"
                id="skills_required"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                placeholder="Python, Java, Communication Skills"
                required
                defaultValue={currentJobData?.skills_required}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="job_type"
                className="block mb-2 text-sm font-bold text-gray-900 "
              >
                Job Type
              </label>
              <select
                id="job_type"
                name="job_type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={onInputChange}
                defaultValue={currentJobData?.job_type}
              >
                {extra && getJobTypes(extra)}
              </select>
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="block mb-2 text-sm font-bold text-gray-900 "
              >
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                placeholder={""}
                required
                defaultValue={
                  currentJobData
                    ? format(new Date(currentJobData?.deadline!), "yyyy-MM-dd")
                    : ""
                }
                onChange={onInputChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="font-bold block mb-2 text-sm text-gray-900 "
              >
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Your description here"
                defaultValue={currentJobData?.description}
                onChange={onInputChange}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isUpdating}
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 "
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
            {currentJobData ? "Update Job" : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
