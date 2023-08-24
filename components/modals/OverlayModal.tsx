import React, { ReactNode, useCallback, useEffect, useRef } from "react";

export default function OverlayModal({
  title,
  setModal,
  children,
  css,
}: {
  title: string;
  children: ReactNode;
  setModal: any;
  css?: string;
}) {
  const modalRef = useRef(null);
  function handleOutsideClick(event: any) {
    event.stopPropagation();

    const node = modalRef.current;
    // console.debug(node);
    // console.debug(event.currentTarget, event.target, event.target === node);
    if (event.target === node) {
      return setModal(false);
    }
  }
  const handleShow = useCallback(() => {
    setModal((show: any) => !show);
  }, [setModal]);

  useEffect(() => {
    const node = modalRef.current;
    const handleCancel = (event: {
      preventDefault: () => void;
      key: string;
    }) => {
      // event.preventDefault();
      if (event.key === "Escape") {
        handleShow();
      }
    };
    if (node) {
      window.addEventListener("keydown", handleCancel);
    }

    return () => {
      window?.removeEventListener("keydown", handleCancel);
    };
  }, [handleShow]);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={handleOutsideClick}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          onClick={handleOutsideClick}
          ref={modalRef}
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            className={`${css} relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
