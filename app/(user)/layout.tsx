import Navbar from "@/components/navbar/Navbar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <Suspense fallback={<Loading />}> */}
      {/* <AuthProvider> */}
      <Navbar />
      {children}
      {/* </AuthProvider> */}
      {/* </Suspense> */}
    </>
  );
}
