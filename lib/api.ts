import { authAxios } from "./auth";
import { User, UserProfile, UserToken } from "./interfaces";

export const updateUser = async (user: UserToken, userData: UserProfile) => {
  try {
    const response = await authAxios.patch(`/users/${user.user_id}`, userData);

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};
