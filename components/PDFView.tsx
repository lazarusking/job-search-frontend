import "react-pdf/dist/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import React, { useState } from "react";
import BaseModal from "./modals/BaseModal";

type Props = {};

export default function PDFView({ resume, name, showDocument }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const options = {
    cMapUrl: "/cmaps/",
    standardFontDataUrl: "/standard_fonts/",
  };
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
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
        css={"bg-white sm:max-w-none"}
      >
        <Document
          file={resume}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          className={"mx-auto"}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </BaseModal>
    </>
  );
}
