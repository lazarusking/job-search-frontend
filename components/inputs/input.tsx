import React, { ReactNode } from "react";
import InputWrapper from "./InputWrapper";

type Props = {
  title: string;
  placeholder: any;
  type: React.HTMLInputTypeAttribute;
  name: any;
  value: any;
  onChangeFunc: any;
  readOnly?: boolean;
  children?: ReactNode;
};

export default function ProfileInput({
  title,
  placeholder,
  type,
  name,
  value,
  onChangeFunc,
  children,
  readOnly,
}: Partial<Props>) {
  return (
    <InputWrapper>
      <div className="w-full md:w-1/3 p-3">
        <p className="text-sm text-gray-800 font-semibold">{title}</p>
      </div>
      <div className="w-full md:flex-1 p-3">
        {!children ? (
          <>
            <label htmlFor={name}></label>
            <input
              className={`${
                readOnly ? "disabled:bg-gray-300" : ""
              } w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-200 rounded-lg shadow-input`}
              type={type}
              name={name}
              id={name}
              defaultValue={value}
              placeholder={placeholder}
              onChange={onChangeFunc}
              readOnly={readOnly}
              disabled={readOnly}
            />
          </>
        ) : (
          children
        )}
      </div>
    </InputWrapper>
  );
}
