"use client";
import {
  applyForJob,
  deleteApplication,
  deleteSavedJob,
  getAppliedData,
  getSavedData,
  saveJob,
} from "@/lib/api";
import { useEffect, useState } from "react";

export function UserApplySaveComponent({
  slug,
  saved,
}: {
  slug: number;
  saved: boolean;
}) {
  const [isSaved, setIsSaved] = useState(saved);
  const [applied, setApplied] = useState(false);

  async function apply(id: number) {
    const res = await applyForJob(id);
    if (res.status === 201) {
      setApplied(true);
    }
    if (res.response && res.response.status === 201) {
      console.log(res.response);
      setApplied(true);
    }
    if (res.response && res.response.status === 400) {
      const res = await deleteApplication(id);
      if (res.status === 200) {
        setApplied(false);
      }
    }
  }

  async function saveOrUndo(id: number) {
    try {
      const res = await saveJob(id);
      console.log(res);

      if (res.status === 201) {
        setIsSaved(true);
      }
      if (res.response && res.response.status >= 400) {
        const res = await deleteSavedJob(id);
        console.log(res);

        if (res.status === 200) {
          setIsSaved(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      // fetchSearchResults();
      const res = await getSavedData(slug);
      const res2 = await getAppliedData(slug);
      if (res && res.data?.count) {
        setIsSaved(true);
      }

      if (res2 && res2.data?.count) {
        console.log(res2);
        setApplied(true);
      }

      // await saveOrUndo(slug);
    };
    fetchSearchResults();
  }, [slug]);
  return (
    <div className="space-x-3">
      <button
        onClick={() => apply(slug)}
        className="group relative inline-block focus:outline-none focus:ring"
      >
        <span className="relative inline-block border-2 border-blue-500 p-1.5 text-sm bg-blue-500 font-bold tracking-widest text-white group-active:text-opacity-75">
          {applied ? "Applied" : "Apply"}
        </span>
      </button>
      <button
        onClick={() => saveOrUndo(slug)}
        className="group relative inline-block focus:outline-none"
      >
        {/* <span className="absolute inset-0 translate-x-0 translate-y-0 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5" /> */}
        <span className=" rounded-full inline-block border border-current hover:border-2 p-1.5 text-sm font-bold tracking-widest text-blue-400 group-active:text-opacity-75">
          {isSaved ? "Saved" : "Save"}
          {/* Saved */}
        </span>
      </button>
    </div>
  );
}
