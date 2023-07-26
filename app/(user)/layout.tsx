import Navbar from "@/components/navbar/Navbar";
import { AuthProvider } from "@/context/auth";
import { ReactNode, Suspense } from "react";
import Loading from "../loading";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* <AuthProvider> */}
        <Navbar />
        {children}
        {/* </AuthProvider> */}
      </Suspense>
    </>
  );
}
