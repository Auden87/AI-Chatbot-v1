export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-600 rounded flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-300">
              Summit Builders
            </span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Summit Builders LLC. All rights
            reserved. Licensed &amp; Insured in Colorado.
          </p>
        </div>
      </div>
    </footer>
  );
}
