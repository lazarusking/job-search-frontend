"use client";
import { authAxios } from "@/lib/auth";
import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
import React, { useState, useEffect, useContext } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_HOST;

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
}

interface TokenResponse {
  access: string;
  access_expires: number;
  refresh: string;
}
export interface UserToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
  email: string;
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
  const token = localStorage.getItem("refresh_token");
  const res = await authAxios.post("/auth/login/refresh", { refresh: token });
  return res;
};

export const verifyToken = async (token: string) => {
  try {
    const res = await authAxios.post("auth/login/verify/", { token });
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
  user: User | UserToken | null;
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
  const [user, setUser] = useState<User | UserToken | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<number>(0);

  const setNotAuthenticated = (): void => {
    setIsAuthenticated(false);
    setLoading(false);
    setUser(null);
    setAccessToken("");
    setAccessTokenExpiry(0);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const accessTokenIsValid = (): boolean => {
    if (accessToken === "") {
      return false;
    }
    const expiry = new Date(accessTokenExpiry);
    console.log("Checking token expiry:", expiry);
    return expiry.getTime() > Date.now();
  };

  const initAuth = async (): Promise<void> => {
    setLoading(true);
    if (!accessTokenIsValid()) {
      console.log("Invalid access token so refetching");
      await refreshToken();
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     initAuth();
  //   }, []);

  const initUser = async (token: string): Promise<void> => {
    // const resp = await fetchUser(token);
    // const user = await resp.json();
    const user: UserToken = jwtDecode(token);
    console.log(user);
    setUser(user);
  };

  const refreshToken = async (): Promise<string> => {
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
      setNotAuthenticated();
      return "";
    }
  };

  const handleNewToken = (data: TokenResponse): void => {
    const user: UserToken = jwtDecode(data.access);
    setAccessToken(data.access);
    const expiryInt = user.exp * 1000;
    setAccessTokenExpiry(expiryInt);
    setIsAuthenticated(true);
    setLoading(false);
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
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
    if (accessTokenIsValid()) {
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
      const token = await refreshToken();
      return token;
    }
  };

  const logout = (): void => {
    setAccessToken("");
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): any => useContext(AuthContext);
