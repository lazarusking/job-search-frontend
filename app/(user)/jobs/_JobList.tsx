import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function JobList({ id, title, location, job_type, deleteFunc }) {
  return (
    <tr className="border-b border-blue-50">
      <td className="flex items-center py-4 px-6 font-medium">
        <input className="mr-3" type="checkbox" name="" id="" />
        <div className="flex px-4 py-3">
          {/* <img
              className="w-8 h-8 mr-4 object-cover rounded-md"
              src="https://images.unsplash.com/photo-1559893088-c0787ebfc084?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt=""
            /> */}
          <div>
            <Link href={`job/${id}`}>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-gray-500">{location}</p>
            </Link>
          </div>
        </div>
      </td>
      <td className="font-medium">
        <p className="text-sm">Example of Project</p>
        <p className="text-xs text-gray-500">New development</p>
      </td>

      <td>
        <button onClick={() => deleteFunc(id)}>
          <TrashIcon className="w-5 h-5 text-red-700" />
        </button>
      </td>
    </tr>
  );
}
