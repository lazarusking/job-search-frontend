export default function Logo({ className }: { className: string }) {
  return (
    <svg
      width="85"
      height="60"
      viewBox="0 0 85 60"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M41 51L25.5 51C11.4167 51 0 39.5833 0 25.5C0 11.4167 11.4167 0 25.5 0L41 0L41 51Z"
        fill="currentColor"
      />
      <path
        d="M44 9H59.5C73.5833 9 85 20.4167 85 34.5C85 48.5833 73.5833 60 59.5 60H44V9Z"
        fill="currentColor"
      />
    </svg>
  );
}
