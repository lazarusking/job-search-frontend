import React from "react";

type Props = {
  title: string;
  placeholder: any;
  type: React.HTMLInputTypeAttribute;
  name: any;
  onChangeFunc: any;
};

export default function ProfileInput({
  title,
  placeholder,
  type,
  name,
  onChangeFunc,
}: Props) {
  return (
    <div className="py-6 border-b border-gray-100">
      <div className="w-full md:w-9/12">
        <div className="flex flex-wrap -m-3">
          <div className="w-full md:w-1/3 p-3">
            <p className="text-sm text-gray-800 font-semibold">{title}</p>
          </div>
          <div className="w-full md:flex-1 p-3">
            <input
              className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-200 rounded-lg shadow-input"
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              onChange={onChangeFunc}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
