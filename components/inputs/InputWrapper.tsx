import { ReactNode } from "react";

export default function InputWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="py-6 border-b border-gray-100">
      <div className="w-full md:w-9/12">
        <div className="flex flex-wrap -m-3">{children}</div>
      </div>
    </div>
  );
}
