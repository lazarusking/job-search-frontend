import { authAxios } from "./auth";
import { UserProfile, UserToken } from "./interfaces";

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

export const appliedJobs = async (user: UserToken, data) => {
  const response = await authAxios.get(
    `/users/${user.user_id}/applicants/`,
    data
  );

  return response.data;
};
export const applyJob = async (user: UserToken, data) => {
  const response = await authAxios.post(
    `/users/${user.user_id}/applicants/`,
    data
  );

  return response.data;
};

// Get admissions for a particular patient
export const getAdmissions = async (accessToken, patient_id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await authAxios.get(
    `admissions-info/?patient_id=${patient_id}`,
    config
  );

  return response.data;
};

export const updateAmission = async (accessToken, admissionUri, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios.patch(admissionUri, data, config);

  return response.data;
};
