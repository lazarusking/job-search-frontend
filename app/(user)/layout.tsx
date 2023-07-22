import Navbar from "@/components/navbar/Navbar";
import { AuthProvider } from "@/context/auth";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        {children}
      </AuthProvider>
    </>
  );
}
