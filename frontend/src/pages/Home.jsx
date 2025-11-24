 function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="https://www.icmp.ac.uk/sites/default/files/course-teaser-image/live-event-management-course-london.jpg"
        alt="Music Festival"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-blue-900/50 z-0"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-lg mb-6">
          Melody Mesh
        </h1>
        <p className="text-2xl text-gray-200 mb-12 max-w-2xl">
          Your all-in-one music festival management platform.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl">
          <a
            href="/volunteers"
            className="p-8 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold shadow-lg hover:scale-105 transition-transform text-center text-xl"
          >
            Volunteers
          </a>
          <a
            href="/events/upcoming"
            className="p-8 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition-transform text-center text-xl"
          >
            Latest Events
          </a>
          <a
            href="/events/past"
            className="p-8 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform text-center text-xl"
          >
            Memories
          </a>
          <a
            href="/register"
            className="p-8 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold shadow-lg hover:scale-105 transition-transform text-center text-xl"
          >
            Register
          </a>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="relative z-10 w-full bg-white py-20 px-6 mt-16 rounded-t-3xl shadow-inner">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Why Melody Mesh?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Seamless Management</h3>
            <p className="text-gray-700">
              Organize festivals, volunteers, and events all in one place.
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-bold text-pink-600 mb-4">Engage Audience</h3>
            <p className="text-gray-700">
              Keep music lovers updated with the latest events & highlights.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Memories Archive</h3>
            <p className="text-gray-700">
              Relive past festivals with photo galleries & event stories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
