import PDFView from "@/components/PDFView";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { rgbDataURL } from "@/lib/image";
import { ApplicantDetail } from "@/lib/interfaces";
import { TrashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import { useToggle } from "usehooks-ts";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface List extends ApplicantDetail {
  status: string;
  deleteFunc: any;
  select?: any;
}

export default function JobList({
  applicant,
  id,
  job,
  date_posted,
  deleteFunc,
  select,
  status,
}: List) {
  const [showDelete, setDeleteModal] = useState(false);
  const [showResume, setShowResume] = useToggle();
  return (
    <tr className="text-xs">
      <td className="py-5 px-6 font-medium">{id}</td>
      <td className="relative flex px-4 py-3">
        {applicant.avatar ? (
          <Image
            className="w-8 h-8 mr-4 object-cover rounded-md"
            // src="https://images.unsplash.com/photo-1559893088-c0787ebfc084?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            src={`${applicant.avatar}`}
            alt=""
            width={50}
            height={50}
            blurDataURL={rgbDataURL(255, 255, 255)}
            placeholder="blur"
          />
        ) : (
          <Image
            className="w-8 h-8 mr-4 object-cover rounded-md"
            src="https://images.unsplash.com/photo-1559893088-c0787ebfc084?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt=""
            width={50}
            height={50}
          />
        )}
        <div>
          <Link href={`/dashboards/jobs/${job.id}/${applicant.user.id}`}>
            <p className="font-medium">{applicant.user.username}</p>
            <p className="text-gray-500">{applicant.user.email}</p>
          </Link>
        </div>
      </td>
      <td className="font-medium">{new Date(date_posted).toDateString()}</td>
      <td>
        <span className="inline-block py-1 px-2 text-white bg-green-500 rounded-full">
          {status}
        </span>
      </td>

      <td>
        <button onClick={setShowResume} className="inline-block mr-2">
          <EyeIcon className="w-5 h-5 text-blue-700" />
        </button>
        {select && (
          <button
            className="inline-block mr-2"
            onClick={() => select(job.id, applicant.user.id)}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2667 6.32499L7.69169 9.90832L6.31669 8.53332C6.24198 8.44609 6.15005 8.37524 6.04666 8.32522C5.94328 8.2752 5.83067 8.24709 5.7159 8.24266C5.60114 8.23823 5.48669 8.25756 5.37975 8.29946C5.27282 8.34135 5.17569 8.4049 5.09448 8.48611C5.01327 8.56733 4.94972 8.66445 4.90783 8.77139C4.86593 8.87833 4.84659 8.99277 4.85102 9.10753C4.85546 9.2223 4.88357 9.33491 4.93359 9.4383C4.9836 9.54169 5.05446 9.63362 5.14169 9.70832L7.10002 11.675C7.17789 11.7522 7.27024 11.8133 7.37177 11.8548C7.4733 11.8963 7.58202 11.9173 7.69169 11.9167C7.91031 11.9157 8.11981 11.8289 8.27502 11.675L12.4417 7.50832C12.5198 7.43085 12.5818 7.33869 12.6241 7.23714C12.6664 7.13559 12.6882 7.02667 12.6882 6.91666C12.6882 6.80665 12.6664 6.69773 12.6241 6.59618C12.5818 6.49463 12.5198 6.40246 12.4417 6.32499C12.2856 6.16978 12.0743 6.08266 11.8542 6.08266C11.634 6.08266 11.4228 6.16978 11.2667 6.32499ZM9.00002 0.666656C7.35185 0.666656 5.74068 1.1554 4.37027 2.07108C2.99986 2.98675 1.93176 4.28824 1.30103 5.81096C0.670298 7.33368 0.50527 9.00923 0.826813 10.6257C1.14836 12.2423 1.94203 13.7271 3.10747 14.8925C4.2729 16.058 5.75776 16.8517 7.37427 17.1732C8.99078 17.4947 10.6663 17.3297 12.1891 16.699C13.7118 16.0683 15.0133 15.0002 15.9289 13.6297C16.8446 12.2593 17.3334 10.6482 17.3334 8.99999C17.3334 7.90564 17.1178 6.82201 16.699 5.81096C16.2802 4.79991 15.6664 3.88125 14.8926 3.10743C14.1188 2.33361 13.2001 1.71978 12.1891 1.30099C11.178 0.882205 10.0944 0.666656 9.00002 0.666656ZM9.00002 15.6667C7.68148 15.6667 6.39255 15.2757 5.29622 14.5431C4.19989 13.8106 3.34541 12.7694 2.84083 11.5512C2.33624 10.333 2.20422 8.99259 2.46146 7.69939C2.71869 6.40618 3.35363 5.2183 4.28598 4.28594C5.21833 3.35359 6.40622 2.71866 7.69942 2.46142C8.99263 2.20419 10.3331 2.33621 11.5512 2.84079C12.7694 3.34538 13.8106 4.19986 14.5432 5.29619C15.2757 6.39252 15.6667 7.68145 15.6667 8.99999C15.6667 10.7681 14.9643 12.4638 13.7141 13.714C12.4638 14.9643 10.7681 15.6667 9.00002 15.6667Z"
                fill="#17BB84"
              />
            </svg>
          </button>
        )}
        <button onClick={() => setDeleteModal(true)}>
          <TrashIcon className="w-5 h-5 text-red-700" />
        </button>
        {showDelete && (
          <ConfirmModal
            setModal={setDeleteModal}
            title="Confirm Delete"
            css={"bg-white"}
            onConfirm={() => deleteFunc(job.id, applicant.user.id)}
          />
        )}
        {showResume && (
          <PDFView
            name={applicant.user.first_name}
            resume={applicant.resume}
            showDocument={setShowResume}
          />
        )}
      </td>
    </tr>
  );
}
