import React from "react";
import InputWrapper from "./InputWrapper";

type Props = {
  first_name: any;
  last_name: any;
  onChangeFunc: any;
  readOnly?: boolean;
};

export default function NameInputs({
  first_name,
  last_name,
  onChangeFunc,
}: Props) {
  return (
    <InputWrapper>
      <div className="w-full md:w-1/3 p-3">
        <p className="text-sm text-gray-800 font-semibold">Name</p>
      </div>
      <div className="w-full md:w-1/3 p-3">
        <input
          className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-200 rounded-lg shadow-input"
          type="text"
          name="first_name"
          id="first_name"
          placeholder="John"
          defaultValue={first_name}
          onChange={onChangeFunc}
        />
      </div>
      <div className="w-full md:w-1/3 p-3">
        <input
          className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-200 rounded-lg shadow-input"
          type="text"
          placeholder="Doe"
          name="last_name"
          id="last_name"
          defaultValue={last_name}
          onChange={onChangeFunc}
        />
      </div>
    </InputWrapper>
  );
}
