import { authAxios } from "./auth";
import { Job, JobList, UserProfile, UserToken } from "./interfaces";

// Update User Profile

export const updateUser = async (user: UserToken, userData: UserProfile) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await authAxios.patch(
      `/users/${user.user_id}/`,
      userData,
      config
    );
    console.log(response);
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
export const appliedJobs = async () => {
  try {
    const response = await authAxios.get(`/users/applied/`);
    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

// The jobs a user has been selected for
export const selectedJobs = async () => {
  try {
    const response = await authAxios.get(`/users/selected/`);
    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

// The jobs view
export const getJobs = async (): Promise<JobList> => {
  try {
    const response = await authAxios.get(`/recruiters/jobs/`);
    return response.data
    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

// Apply to a particular job
export const applyForJob = async (job: Job) => {
  try {
    const response = await authAxios.post(`/users/apply/${job.id}/`);

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

// Delete your application to a particular job
export const deleteApplication = async (job: Job) => {
  try {
    const response = await authAxios.delete(`/users/apply/${job.id}/`);

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

//Recruiter: Applicants selected for a job
export const getJobDetails = async (job: Job) => {
  try {
    const response = await authAxios.get(`recruiters/jobs/${job.id}/`);

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};
//Recruiter: Applicants selected for a job
export const selectedApplicants = async (job: Job) => {
  try {
    const response = await authAxios.get(`recruiters/jobs/${job.id}/selected/`);

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

//Recruiter: Select applicant for the job
export const selectApplicant = async (user: UserToken, job: Job) => {
  try {
    const response = await authAxios.put(
      `recruiters/jobs/${job.id}/select/${user.user_id}`
    );

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

//Recruiter: Delete selected applicant for the job
export const deleteSelectedApplicant = async (user: UserToken, job: Job) => {
  try {
    const response = await authAxios.delete(
      `recruiters/jobs/${job.id}/select/${user.user_id}`
    );

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

// Recruiter view of Users that have applied for a job
export const jobApplicants = async (job: Job) => {
  try {
    const response = await authAxios.get(
      `recruiters/jobs/${job.id}/applicants/`
    );

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

// Recruiter view of Job Details wiith info such as new applicants
export const jobDetails = async () => {
  try {
    const response = await authAxios.get(`recruiters/jobs/details/`);

    return response;
  } catch (error) {
    return { error };
  }
};
