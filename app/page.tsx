export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Master WSET Spirits Certification
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track your tastings with our unique hold-button timeline, explore
          interactive regional maps, and build your spirits knowledge with
          AI-powered study guides.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Hold-Button Timeline
          </h3>
          <p className="text-gray-600 text-sm">
            Record flavor intensity by holding buttons. Watch your tasting
            unfold in a visual timeline and flavor wheel.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Interactive Maps
          </h3>
          <p className="text-gray-600 text-sm">
            Explore Scotch regions, Kentucky bourbon trails, and more. Track
            your tasting coverage on personalized maps.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI Study Guides
          </h3>
          <p className="text-gray-600 text-sm">
            Get instant, comprehensive profiles for any spirit. Production
            methods, typical profiles, and WSET exam notes.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to start tasting?</h3>
        <p className="mb-6 text-blue-100">
          Create your first tasting timeline and experience the unique
          hold-button interface.
        </p>
        <a
          href="/tasting/new"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Start Your First Tasting
        </a>
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p className="text-sm">
          Built for WSET Level 1-3 certification. Track tastings, explore
          regions, and master spirits knowledge.
        </p>
      </div>
    </div>
  );
}
