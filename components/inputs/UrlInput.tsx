import InputWrapper from "./InputWrapper";

type Props = {
  title: string;
  name: string;
  value: any;
  placeholder: any;
  onChangeFunc: any;
};

export default function UrlInput({
  placeholder,
  value,
  title,
  name,
  onChangeFunc,
}: Props) {
  return (
    <InputWrapper>
      <div className="w-full md:w-1/3 p-3">
        <p className="text-sm text-gray-800 font-semibold">{title}</p>
      </div>
      <div className="w-full md:flex-1 p-3">
        <div className="flex items-center focus-within:border-green-500 overflow-hidden border border-gray-200 rounded-lg shadow-input">
          <p className="px-4 text-base text-gray-500 font-normal">url</p>
          <input
            className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none border-l"
            type="url/"
            placeholder={placeholder}
            name={name}
            id={name}
            defaultValue={value}
            onChange={onChangeFunc}
          />
        </div>
      </div>
    </InputWrapper>
  );
}
