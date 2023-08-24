import { AuthProvider } from "@/context/auth";
import Logo from "@/public/logo.svg";
import { Metadata } from "next";
import { Mulish } from "next/font/google";
import { ReactNode, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Loading from "./loading";
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME, SITE_NAME_URL } = process.env;
const inter = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_NAME,
  metadataBase: new URL(SITE_NAME_URL!),
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
