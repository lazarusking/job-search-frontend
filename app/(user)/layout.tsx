"use client";
import UserChatbot from "@/components/chatbot/UserChatbot";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/context/auth";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      {user && <UserChatbot />}
      {children}
    </>
  );
}
