"use client";

import { useAuth, verifyToken } from "@/context/auth";
import { User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";
import LoadingAnimation from "./Loading";

export default function withAuth<T extends User>(
  WrappedComponent: ComponentType<T> | any
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
