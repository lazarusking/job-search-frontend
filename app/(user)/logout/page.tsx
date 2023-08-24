"use client";
import { useAuth } from "@/context/auth";
import React, { useEffect } from "react";

const Logout = (): React.ReactElement => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  if (isAuthenticated) return <></>;
  return <h1 className="text-xl pt-3 pb-5">{`You've been logged out`}</h1>;
};

export default Logout;
