"use client";

export default function UserJobsPageDetail({ title, description }: any) {
  return (
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-500 font-medium">{description}</p>
    </div>
  );
}
