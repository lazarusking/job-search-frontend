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
    const response = await authAxios.patch(`/users/${user.user_id}/update/`, userData);
    console.log(response);
    return { data: response.data };
  } catch (error) {
    return { error };
  }
};
