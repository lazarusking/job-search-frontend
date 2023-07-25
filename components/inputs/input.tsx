import React from "react";

type Props = {
  title: string;
  placeholder: any;
  type: React.HTMLInputTypeAttribute;
  name: any;
  value: any;
  onChangeFunc: any;
  readOnly?: boolean;
};

export default function ProfileInput({
  title,
  placeholder,
  type,
  name,
  value,
  onChangeFunc,
  readOnly,
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
              className={`${
                readOnly && "disabled:bg-gray-400"
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
          </div>
        </div>
      </div>
    </div>
  );
}
