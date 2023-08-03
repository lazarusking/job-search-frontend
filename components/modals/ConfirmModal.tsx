import React, { useCallback } from "react";
import BaseModal from "./BaseModal";

type Props = {};

export default function ConfirmModal({
  title,
  setModal,
  onConfirm,
  ...props
}: {
  title: string;
  setModal: any;
  css?: string;
  onConfirm: any;
}) {
  const handleConfirm = useCallback(() => {
    onConfirm();
    setModal((show: any) => !show);
  }, [onConfirm, setModal]);
  return (
    <BaseModal title={title} setModal={setModal} {...props}>
      <div className="max-w-lg w-full m-auto p-8 bg-white rounded-md">
        {/* <h3
          className="mb-2 text-2xl font-semibold text-gray-900"
          data-config-id="auto-txt-1-1"
        >
          {title}
        </h3> */}
        <p
          className="mb-6 font-medium text-sm text-gray-500"
          data-config-id="auto-txt-2-1"
        >
          Are you sure?
        </p>
        <div className="flex flex-wrap justify-end -m-2">
          <div className="w-full md:w-1/2 p-2">
            <button
              onClick={() => setModal(false)}
              className="flex flex-wrap justify-center w-full px-4 py-2.5 bg-white font-medium text-base text-gray-500 hover:text-gray-600 border border-gray-200 hover:border-gray-300 rounded-md shadow-button"
            >
              <p data-config-id="auto-txt-3-1">Cancel</p>
            </button>
          </div>
          <div className="w-full md:w-1/2 p-2">
            <button
              onClick={handleConfirm}
              className="flex flex-wrap justify-center w-full px-4 py-2.5 bg-green-500 hover:bg-green-600 font-medium text-base text-white border border-green-500 rounded-md shadow-button"
            >
              <p data-config-id="auto-txt-4-1">Confirm</p>
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
