"use client";

import { verifyToken } from "@/context/auth";
import { User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";

export default function withAuth<T extends User>(WrappedComponent: ComponentType<T>) {
  const MyComp = (props: any) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      async function verify() {
        const accessToken = localStorage.getItem("access_token");

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
    }, [router]);

    if (verified) {
      return <WrappedComponent {...props} />;
    }
  };
  return MyComp;
}
