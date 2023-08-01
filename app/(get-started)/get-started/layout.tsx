import { ReactNode, Suspense } from "react";
import StepsToComplete from "@/components/StepsToComplete";
import Loading from "@/app/loading";

export default function StartedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* <AuthProvider> */}
        <StepsToComplete>{children}</StepsToComplete>
        {/* </AuthProvider> */}
      </Suspense>
    </>
  );
}
