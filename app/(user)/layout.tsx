"use client";
import Chatbot from "@/components/chatbot/ChatInterface";
import UserChatbot from "@/components/chatbot/UserChatbot";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/context/auth";
import { ReactNode } from "react";
const exampleMessages = [
  {
    heading: "Ask job interview questions",
    message: `How should I prepare for a job interview?`,
  },
  {
    heading: "Ask about resume tips",
    message: "Should I have more than one page on my resume? \n",
  },
];
export default function RootLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <>
      {/* <Suspense fallback={<Loading />}> */}
      {/* <AuthProvider> */}
      <Navbar />
      {user && <UserChatbot />}
      {children}
      {/* </AuthProvider> */}
      {/* </Suspense> */}
    </>
  );
}
