"use client";
import { authAxios } from "@/lib/auth";
import { UserToken } from "@/lib/interfaces";
import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

// const API_BASE = process.env.NEXT_PUBLIC_API_HOST;

interface TokenResponse {
  access: string;
  access_expires: number;
  refresh: string;
}

// const makeUrl = (endpoint: string): string => {
//   return API_BASE + endpoint;
// };

const fetchToken = async (
  email: string,
  password: string
): Promise<AxiosResponse<any>> => {
  console.log(JSON.stringify({ email, password }));

  const res = await authAxios.post(
    "/auth/login/",
    JSON.stringify({ email, password })
  );
  return res;
};
const createUser = async (
  username: string,
  email: string,
  password1: string,
  password2: string,
  first_name: string,
  last_name: string,
  type: string | null
): Promise<AxiosResponse<any>> => {
  console.log(
    JSON.stringify({
      username,
      email,
      password1,
      password2,
      first_name,
      last_name,
    })
  );
  let url = "/auth/register/";
  if (type === "recruiter") {
    url = "/auth/register/recruiter";
  }
  const res = await authAxios.post(
    url,
    JSON.stringify({
      username,
      email,
      password1,
      password2,
      first_name,
      last_name,
    })
  );
  return res;
};

const fetchNewToken = async (token: any): Promise<AxiosResponse<any>> => {
  // console.log(token)
  // const token = JSON.parse(localStorage.getItem("refresh_token"));
  const res = await authAxios.post("/auth/login/refresh/", { refresh: token });
  return res;
};

export const verifyToken = async (token: string) => {
  try {
    const res = await authAxios.post("/auth/login/verify/", { token: token });
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const logoutUser = async (token: string) => {
  try {
    console.log(token);
    const res = await authAxios.post("/auth/logout/", { refresh: token });
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// async function fetchUser(token: string): Promise<Response> {
//   const url = makeUrl("/me/");
//   return fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

type AuthContextProps = {
  accessToken: string;
  isAuthenticated: boolean;
  loading: boolean;
  user: UserToken | null;
  // login: (email: string, password: string) => Promise<AxiosResponse<any>>;
  // register: () => void;
  logout: () => void;
  getToken: () => Promise<string>;
};

const AuthContext = React.createContext<Partial<AuthContextProps>>({});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useLocalStorage("access_token", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refresh_token", "");
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<number>(0);
  const [user, setUser] = useState<UserToken | null>(() => {
    try {
      return jwtDecode(accessToken);
    } catch (error) {
      return null;
    }
  });
  const setNotAuthenticated = (): void => {
    setIsAuthenticated(false);
    setLoading(false);
    setUser(null);
    setAccessToken("");
    setRefreshToken("");
    setAccessTokenExpiry(0);
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh_token");
  };
  const handleNewToken = useCallback(
    (data: TokenResponse): void => {
      const user: UserToken = jwtDecode(data.access);
      setAccessToken(data.access);
      setRefreshToken(data.access);
      const expiryInt = user.exp * 1000;
      setAccessTokenExpiry(expiryInt);
      setIsAuthenticated(true);
      setLoading(false);
      // localStorage.setItem("access_token", data.access);
      // localStorage.setItem("refresh_token", data.refresh);
      authAxios.defaults.headers["Authorization"] = "Bearer " + data.access;
    },
    [setAccessToken, setRefreshToken]
  );

  const TokenRefresh = useCallback(async (): Promise<string> => {
    setLoading(true);
    try {
      const resp = await fetchNewToken(refreshToken);
      const tokenData = await resp.data;
      console.log(tokenData);

      // handleNewToken(tokenData);
      setAccessToken(tokenData.access);
      if (user === null) {
        console.log("No user loaded so loading from refreshed token");
        await initUser(tokenData.access);
      }
      return tokenData.access;
    } catch (error) {
      // setNotAuthenticated();
      return "";
    }
  }, [refreshToken, setAccessToken, user]);

  const accessTokenIsValid = useCallback(async (): Promise<boolean> => {
    const token = JSON.parse(localStorage.getItem("access_token")!);
    // console.log(token, accessToken);
    if (accessToken === "") {
      console.log(accessToken || token === "");
      return false;
    }
    try {
      const verified = await verifyToken(accessToken);
      console.log(verified);
      if (verified) {
        console.log("verified");
        const user: UserToken = jwtDecode(accessToken);
        initUser(accessToken);
        const expiry = new Date(user.exp * 1000);
        console.log("Checking token expiry:", expiry, accessTokenExpiry);
        console.log(expiry.getTime() > Date.now());

        return expiry.getTime() > Date.now();
        // return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }, [accessToken, accessTokenExpiry]);

  const initAuth = useCallback(async (): Promise<void> => {
    setLoading(true);
    // const user: UserToken = jwtDecode(accessToken);
    // initUser(accessToken);
    const valid = await accessTokenIsValid();
    console.log(`valid token ${valid}`);

    if (!valid) {
      console.log("Invalid access token so refetching");
      await TokenRefresh();
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [TokenRefresh, accessTokenIsValid]);

  useEffect(() => {
    initAuth();
  }, []);

  const initUser = async (token: string): Promise<void> => {
    // const resp = await fetchUser(token);
    // const user = await resp.json();
    const user: UserToken = jwtDecode(token);
    console.log(user);
    setUser(user);
  };

  const login = async (
    email: string,
    password: string
  ): Promise<AxiosResponse<any>> => {
    try {
      const resp = await fetchToken(email, password);
      const tokenData = await resp.data;
      console.log(resp);
      handleNewToken(tokenData);
      await initUser(tokenData.access);
      return resp;
    } catch (error: any) {
      console.log(error);
      setIsAuthenticated(false);
      setLoading(true);
      return error;
      // Let the page handle the error
    }

    // return resp;
  };
  const register = async (
    userDetail: any,
    type: string | null
  ): Promise<AxiosResponse<any>> => {
    try {
      const { username, email, password1, password2, first_name, last_name } =
        userDetail;
      const resp = await createUser(
        username,
        email,
        password1,
        password2,
        first_name,
        last_name,
        type
      );
      const tokenData = await resp.data;
      console.log(resp);
      handleNewToken(tokenData);
      await initUser(tokenData.access);
      return resp;
    } catch (error: any) {
      console.log(error);
      setIsAuthenticated(false);
      setLoading(true);
      return error;
      // Let the page handle the error
    }

    // return resp;
  };

  const getToken = async (): Promise<string> => {
    // Returns an access token if there's one or refetches a new one
    console.log("Getting access token..");
    if (await accessTokenIsValid()) {
      console.log("Getting access token.. existing token still valid");
      return Promise.resolve(accessToken);
    } else if (loading) {
      while (loading) {
        console.log("Getting access token.. waiting for token to be refreshed");
      }
      // Assume this means the token is in the middle of refreshing
      return Promise.resolve(accessToken);
    } else {
      console.log("Getting access token.. getting a new token");
      const token = await TokenRefresh();
      return token;
    }
  };

  const logout = async (): Promise<void> => {
    await logoutUser(refreshToken);
    setAccessToken("");
    setRefreshToken("");
    setAccessTokenExpiry(0);
    setNotAuthenticated();
    // const url = makeUrl("/token/logout/");
    // fetch(url, {
    //   method: "POST",
    //   credentials: "include",
    // });
    // TODO: call endpoint to delete cookie
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    getToken,
    accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): any => useContext(AuthContext);
