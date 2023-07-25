"use client";

import { useAuth, verifyToken } from "@/context/auth";
import { User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";

export default function withAuth<T extends User>(
  WrappedComponent: ComponentType<T>
) {
  const Component = (props: any) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);
    const { accessToken,user } = useAuth();

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

    if (verified) {
      return <WrappedComponent {...props} user={user} />;
    }
  };
  return Component;
}
