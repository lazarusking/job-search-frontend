import { AxiosResponse } from "axios";
import { authAxios } from "./auth";
import {
  ApplicantList,
  Job,
  JobDashboard,
  JobDetailList,
  JobList,
  JobViewList,
  Recruiter,
  UserProfile,
  UserToken,
} from "./interfaces";

// Update User Profile

export const updateUser = async (user: UserToken, userData: UserProfile) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await authAxios.patchForm(
      `/users/${user.user_id}/`,
      userData,
      config
    );
    console.log(response);
    return { data: response.data };
  } catch (error: any) {
    return { error };
  }
};
export const updateRecruiter = async (user: UserToken, userData: Recruiter) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await authAxios.patchForm(
      `/recruiters/${user.user_id}/`,
      userData,
      config
    );
    console.log(response);
    return { data: response.data };
  } catch (error: any) {
    return { error };
  }
};
// create a job
export const createJob = async (data: Job) => {
  try {
    const response = await authAxios.post(`/recruiters/jobs/`, data);

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};
// Update a created job
export const updateJob = async (job_id: number, data: Job) => {
  try {
    const response = await authAxios.patch(`/recruiters/jobs/${job_id}/`, data);

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

// Update User details :optional
export const updateUserInfo = async (
  user: UserToken,
  userData: UserProfile
) => {
  try {
    const response = await authAxios.patch(
      `/users/${user.user_id}/update/`,
      userData
    );
    console.log(response);
    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

// The jobs a user has applied for
export const getAppliedJobs = async (): Promise<JobViewList> => {
  try {
    const response = await authAxios.get(`/users/applied/`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

// The jobs a user has been selected for
export const getSelectedJobs = async () => {
  try {
    const response = await authAxios.get(`/users/selected/`);
    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

// Single job view
export const getJob = async (job_id: number): Promise<Job> => {
  try {
    let url = `/recruiters/jobs/${job_id}/`;
    const response: AxiosResponse<Job> = await authAxios.get(url);
    return response.data;
    // return { data: response.data };
  } catch (error: any) {
    return error;
  }
};
export const deleteJob = async (job_id: number) => {
  try {
    let url = `/recruiters/jobs/${job_id}/`;
    const response: AxiosResponse<Job> = await authAxios.delete(url);
    return response;
  } catch (error: any) {
    return error;
  }
};
// The jobs view
export const getJobs = async (query?: string): Promise<JobList> => {
  try {
    let url = `/recruiters/jobs/`;
    const response: AxiosResponse<JobList> = await authAxios.get(
      query ? `${url}?search=${query}` : url
    );
    return response.data;
    // return { data: response.data };
  } catch (error: any) {
    return error;
  }
};

// Apply to a particular job
export const getAppliedData = async (job_id: number) => {
  try {
    const response = await authAxios.get(`/users/apply/${job_id}/`);
    return response;
  } catch (error: any) {
    return error;
  }
};
export const applyForJob = async (job_id: number) => {
  try {
    const response = await authAxios.post(`/users/apply/${job_id}/`);
    return response;
  } catch (error: any) {
    return error;
  }
};

// Delete your application to a particular job
export const deleteApplication = async (job_id: number) => {
  try {
    const response = await authAxios.delete(`/users/apply/${job_id}/`);
    return response;
  } catch (error: any) {
    return error;
  }
};

// Save your favorite job to db
export const getSavedData = async (job_id: number) => {
  try {
    const response = await authAxios.get(`/users/saved/${job_id}`);

    return response;
  } catch (error: any) {
    return error;
  }
};

// Save your favorite job to db
export const getSavedJobs = async (): Promise<JobViewList> => {
  try {
    const response = await authAxios.get(`/users/saved/`);

    return response.data;
  } catch (error: any) {
    return error;
  }
};
// Save your favorite job to db
export const saveJob = async (job_id: number) => {
  try {
    const response = await authAxios.post(`/users/saved/${job_id}/`);

    return response;
  } catch (error: any) {
    return error;
  }
};

// Delete your application to a particular job
export const deleteSavedJob = async (
  job_id: number
): Promise<AxiosResponse> => {
  try {
    const response = await authAxios.delete(`/users/saved/${job_id}/`);
    return response;
  } catch (error: any) {
    return error;
  }
};

//Recruiter: Get job details for a job
export const getDashboardDetails = async (): Promise<JobDashboard> => {
  try {
    let url = `/recruiters/jobs/dashboard/`;
    const response: AxiosResponse<JobDashboard> = await authAxios.get(url);
    return response.data;
    // return { data: response.data };
  } catch (error: any) {
    return error;
  }
};
//Recruiter: Get job details for a job
export const getJobDetails = async (query?: string): Promise<JobDetailList> => {
  try {
    let url = `/recruiters/jobs/details/`;
    const response: AxiosResponse<JobDetailList> = await authAxios.get(
      query ? `${url}?search=${query}` : url
    );
    return response.data;
    // return { data: response.data };
  } catch (error: any) {
    return error;
  }
};
//Recruiter: Applicants selected for a job
export const getSelectedApplicants = async (
  job_id: number
): Promise<ApplicantList> => {
  try {
    const response: AxiosResponse<ApplicantList> = await authAxios.get(
      `/recruiters/jobs/${job_id}/selected/`
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

//Recruiter: Select applicant for the job
export const selectApplicant = async (job_id: number, applicant_id: number) => {
  try {
    const response = await authAxios.post(
      `recruiters/jobs/${job_id}/select/${applicant_id}/`
    );
    return response;
  } catch (error: any) {
    return error;
  }
};

//Recruiter: Delete selected applicant for the job
export const deleteSelectedApplicant = async (
  job_id: number,
  applicant_id: number
) => {
  try {
    const response = await authAxios.delete(
      `recruiters/jobs/${job_id}/select/${applicant_id}`
    );
    return response;
  } catch (error: any) {
    return error;
  }
};

// Recruiter view of Users that have applied for a job
export const getJobApplicants = async (
  job_id: number | string
): Promise<ApplicantList> => {
  try {
    const response: AxiosResponse<ApplicantList> = await authAxios.get(
      `/recruiters/jobs/${job_id}/applicants/`
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

//Recruiter: Delete applied applicant for the job
export const deleteApplicant = async (job_id: number, applicant_id: number) => {
  try {
    const response = await authAxios.delete(
      `recruiters/jobs/${job_id}/apply/${applicant_id}`
    );
    return response;
  } catch (error: any) {
    return error;
  }
};
