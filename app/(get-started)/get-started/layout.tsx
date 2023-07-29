import { ReactNode, Suspense } from "react";
import Loading from "../../loading";
import StepsToComplete from "@/components/StepsToComplete";

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
