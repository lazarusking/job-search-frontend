import Navbar from "@/components/navbar/Navbar";
import { Inter, Mulish, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";
import { AuthProvider } from "@/context/auth";
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import Logo from "@/public/logo.svg";
const inter = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "",
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
      twitter: {
        card: "summary_large_image",
        creator: TWITTER_CREATOR,
        site: TWITTER_SITE,
        images: Logo,
      },
    }),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          {/* <Navbar /> */}
          <AuthProvider>
            {children}
            <div className="toast-container">
              <ToastContainer limit={2} />
            </div>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
