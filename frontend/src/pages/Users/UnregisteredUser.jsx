function UnregisteredUser() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-purple-100">
      
      {/* Hero Section with Background Image */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-32 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.cdn.newsbytesapp.com/images/l257_41981643892030.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* dark overlay */}
        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold mb-4 animate-bounce">🎵 Welcome to Melody Mesh 🎵</h2>
          <p className="text-lg max-w-2xl mb-8">
            Discover amazing music, playlists, and audio experiences. Access key features as a guest, or login/register for full access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              Register
            </a>
            <a
              href="/login"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              Login
            </a>
          </div>
        </div>
      </section>

      {/* Features / Info Section with Images */}
      <section className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl hover:scale-105 transition-transform">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkJas5HCs99mGB4k_QH4fogZZntPSuLjiCfw&s"
            alt="Curated Playlists"
            className="rounded-xl mb-4 mx-auto w-48 h-48 object-cover"
          />
          <h3 className="text-2xl font-bold mb-3">Curated Playlists</h3>
          <p className="text-gray-600">Enjoy playlists selected for every mood and moment. All users can explore.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl hover:scale-105 transition-transform">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuV8hPHZQ645gM7uO_dvROhepUJJahiMZlUZJyFhAH181whlPov1fHJfvdUXKsTPS8A1o&usqp=CAU"
            alt="Live Sessions"
            className="rounded-xl mb-4 mx-auto w-48 h-48 object-cover"
          />
          <h3 className="text-2xl font-bold mb-3">Live Sessions</h3>
          <p className="text-gray-600">Tune into live performances from emerging artists. Open for everyone.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl hover:scale-105 transition-transform">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAoUZmIGlemtWb_FWH2R01yt1F1u5HCieSw6SKiL63LJ18LevyRamRMBglD3oJhIfOAGE&usqp=CAU"
            alt="Music Discovery"
            className="rounded-xl mb-4 mx-auto w-48 h-48 object-cover"
          />
          <h3 className="text-2xl font-bold mb-3">Music Discovery</h3>
          <p className="text-gray-600">Explore new tracks and genres before you even register. Just for you.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to unlock the full experience?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of music lovers and get access to exclusive content, personalized recommendations, and more.
          </p>
          <a
            href="/register"
            className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 text-lg"
          >
            Create Your Account
          </a>
        </div>
      </section>
    </div>
  );
}

export default UnregisteredUser;