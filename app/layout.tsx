import Navbar from "@/components/navbar/Navbar";
import { Inter, Mulish, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";
import { AuthProvider } from "@/context/auth";
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

const inter = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: SITE_NAME,
  description: "",
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
      twitter: {
        card: "summary_large_image",
        creator: TWITTER_CREATOR,
        site: TWITTER_SITE,
      },
    }),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Suspense fallback={<Loading />}>
      <body className={inter.className}>
        {/* <Navbar /> */}
        <AuthProvider>{children}</AuthProvider>
      </body>
      </Suspense>
    </html>
  );
}
