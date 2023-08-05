"use client";

import { useAuth, verifyToken } from "@/context/auth";
import { User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";

const HOME_ROUTE = "/";
const RECRUITER_HOME_ROUTE = "/dashboard";
const ROUTE_ROLES = ["recruiter", "job_seeker"] as const;

type RouteRole = (typeof ROUTE_ROLES)[number];
export default function withAuth<T extends User>(
  WrappedComponent: ComponentType<T> | any,
  routeRole: RouteRole
) {
  const Component = (props: any) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);
    const { accessToken, user, loading, isAuthenticated } = useAuth();
    const [hasMounted, sethasMounted] = useState(false);
    useEffect(() => {
      sethasMounted(true);
    }, []);
    useEffect(() => {
      async function verify() {
        // const accessToken = localStorage.getItem("access_token");
        // console.log(accessToken);

        if (!accessToken) {
          router.replace("/login");
          return;
        } else {
          const isValid = await verifyToken(accessToken);
          if (isValid) {
            setVerified(isValid);
            return;
          } else {
            localStorage.removeItem("access_token");
            router.replace("/login");
            return;
          }
        }
      }
      verify();
    }, [accessToken, router]);
    useEffect(() => {
      if (!loading) {
        if (isAuthenticated) {
          if (routeRole === "recruiter" && !user?.is_recruiter) {
            console.log(routeRole);
            router.replace(RECRUITER_HOME_ROUTE);
          }
          if (routeRole === "job_seeker" && user?.is_recruiter) {
            router.replace(HOME_ROUTE);
          }
        }
      }
      return () => {};
    }, [isAuthenticated, loading, router, user?.is_recruiter]);
    // if (loading) {
    //   console.log("loading...");

    //   return <LoadingAnimation />;
    // }
    if (!hasMounted) return null;

    if (verified) {
      return <WrappedComponent {...props} user={user} />;
    }
  };
  return Component;
}
