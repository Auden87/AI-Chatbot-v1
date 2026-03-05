export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900/30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="text-amber-400 font-semibold mb-4 tracking-wide uppercase text-sm">
            Denver&apos;s Trusted Builder Since 2003
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Building Dreams,{" "}
            <span className="text-amber-400">One Project at a Time</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
            From kitchen remodels to custom homes, Summit Builders delivers
            quality craftsmanship across the Denver metro area. Licensed,
            insured, and committed to exceeding your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-colors text-center"
            >
              Get a Free Estimate
            </a>
            <a
              href="#services"
              className="border border-white/30 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors text-center"
            >
              Our Services
            </a>
          </div>
          <div className="flex items-center gap-8 mt-12 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Licensed &amp; Insured
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              500+ Projects Completed
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Free Estimates
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
