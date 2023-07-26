import React from "react";
import InputWrapper from "./InputWrapper";

type Props = {
  title: string;
  name: string;
  value: any;
  onChangeFunc: any;
  selected: any;
  getList: any;
  readOnly?: boolean;
};

export default function SelectInput({
  value,
  name,
  title,
  selected,
  onChangeFunc,
  getList,
}: Props) {
  return (
    <InputWrapper>
      <div className="w-full md:w-1/3 p-3">
        <p className="text-sm text-gray-800 font-semibold">{title}</p>
      </div>
      <div className={`w-full md:flex-1 p-3 ${selected}`}>
        <select
          onChange={onChangeFunc}
          name={name}
          value={selected}
          aria-label={title}
          className="appearance-none w-full py-2.5 px-4 text-gray-900 text-base font-normal bg-white border outline-none border-gray-200 focus:border-green-500 rounded-lg shadow-input"
        >
          {value && getList(value)}
        </select>
      </div>
    </InputWrapper>
  );
}
