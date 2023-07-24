import React from "react";

type Props = {
  title: string;
  placeholder: any;
  type: React.HTMLInputTypeAttribute;
  name: any;
  onChangeFunc: any;
};

export default function UrlInput({
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
            <div className="flex items-center focus-within:border-green-500 overflow-hidden border border-gray-200 rounded-lg shadow-input">
              <p className="px-4 text-base text-gray-500 font-normal">
                url
              </p>
              <input
                className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none border-l"
                type="text"
                placeholder="flex.co"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
