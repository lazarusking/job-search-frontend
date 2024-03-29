export default function JobCard() {
  return (
    <a
      className="block p-4 mb-4 bg-gray-600 rounded-xl hover:bg-gray-700 transition duration-200"
      href="#"
    >
      <h4 className="text-white font-semibold leading-6 mb-1">
        Implement Login
      </h4>
      <div className="flex items-center mb-4">
        <span className="h-2 w-2 mr-1 bg-pink-400 rounded-full" />
        <span className="text-xs font-medium text-pink-400">Development</span>
      </div>
      <p className="text-xs text-gray-300 leading-normal mb-10">
        This is an example task that can be used within a Kanban system.
      </p>
      <div className="pt-4 border-t border-gray-500">
        <div className="flex flex-wrap items-center justify-between -m-2">
          <div className="w-auto p-2">
            <div className="flex items-center p-2 bg-gray-500 rounded-md">
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0001 2.33337H3.00008C2.2637 2.33337 1.66675 2.93033 1.66675 3.66671V11.6667C1.66675 12.4031 2.2637 13 3.00008 13H11.0001C11.7365 13 12.3334 12.4031 12.3334 11.6667V3.66671C12.3334 2.93033 11.7365 2.33337 11.0001 2.33337Z"
                  stroke="#3D485B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.66675 1V3.66667"
                  stroke="#3D485B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.3335 1V3.66667"
                  stroke="#3D485B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.66675 6.33337H12.3334"
                  stroke="#3D485B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.3335 9H7.00016"
                  stroke="#3D485B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 9V11"
                  stroke="#3D485B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-xs font-medium text-gray-200">
                Jul 03
              </span>
            </div>
          </div>
          <div className="w-auto p-2">
            <div className="flex h-full items-center">
              <img
                className="w-7 h-7 rounded-full object-cover"
                src="https://shuffle.dev/trizzle-assets/images/avatar-men-circle-border.png"
                alt=""
              />
              <img
                className="w-7 h-7 -ml-3 rounded-full object-cover"
                src="https://shuffle.dev/trizzle-assets/images/avatar-women-circle-border.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
