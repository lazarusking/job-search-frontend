"use client";
import { authAxios } from "@/lib/auth";
import { UserToken } from "@/lib/interfaces";
import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const API_BASE = process.env.NEXT_PUBLIC_API_HOST;

interface TokenResponse {
  access: string;
  access_expires: number;
  refresh: string;
}

const makeUrl = (endpoint: string): string => {
  return API_BASE + endpoint;
};

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

const fetchNewToken = async (): Promise<AxiosResponse<any>> => {
  // const url = makeUrl("/token/refresh/");
  // return fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  // });
  const token = JSON.parse(localStorage.getItem("refresh_token"));
  const res = await authAxios.post("/auth/login/refresh/", { refresh: token });
  return res;
};

export const verifyToken = async (token: string) => {
  try {
    const res = await authAxios.post("auth/login/verify/", { token: token });
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

async function fetchUser(token: string): Promise<Response> {
  const url = makeUrl("/me/");
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

type AuthContextProps = {
  isAuthenticated: boolean;
  loading: boolean;
  user: UserToken | null;
  // login: (email: string, password: string) => Promise<AxiosResponse<any>>;
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
  const [user, setUser] = useState<UserToken | null>(null);
  const [accessToken, setAccessToken] = useLocalStorage("access_token", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refresh_token", "");
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<number>(0);
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

  const accessTokenIsValid = async (): Promise<boolean> => {
    const token = JSON.parse(localStorage.getItem("access_token"));
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
        const user: UserToken = jwtDecode(token);
        initUser(token);
        const expiry = new Date(user.exp * 1000);
        console.log("Checking token expiry:", expiry, accessTokenExpiry, token);
        console.log(expiry.getTime() > Date.now());

        return expiry.getTime() > Date.now();
        // return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const initAuth = async (): Promise<void> => {
    setLoading(true);
    const valid = await accessTokenIsValid();
    console.log(valid);

    if (!valid) {
      console.log("Invalid access token so refetching");
      await TokenRefresh();
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

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

  const TokenRefresh = async (): Promise<string> => {
    setLoading(true);
    try {
      const resp = await fetchNewToken();
      const tokenData = await resp.data;
      handleNewToken(tokenData);
      if (user === null) {
        console.log("No user loaded so loading from refreshed token");
        await initUser(tokenData.access);
      }
      return tokenData.access;
    } catch (error) {
      // setNotAuthenticated();
      return "";
    }
  };

  const handleNewToken = (data: TokenResponse): void => {
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

  const logout = (): void => {
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
    logout,
    getToken,
    accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
