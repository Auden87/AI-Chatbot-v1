export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            <span className="text-xl font-bold text-gray-900">
              Summit Builders
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Get a Free Estimate
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
