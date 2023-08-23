import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import BaseModal from "./modals/BaseModal";

export default function PDFView({ resume, name, showDocument }: any) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const options = {
    cMapUrl: "/cmaps/",
    standardFontDataUrl: "/standard_fonts/",
  };
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  return (
    <>
      <BaseModal
        setModal={showDocument}
        title={`${name} Resume`}
        css={"bg-white sm:max-w-max"}
      >
        <Document
          file={resume}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          className={"mx-auto"}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="space-x-2">
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            className="p-2 bg-gray-400 rounded"
            onClick={previousPage}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 bg-gray-400 rounded"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </BaseModal>
    </>
  );
}
