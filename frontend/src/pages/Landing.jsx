export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-md">
        <h1 className="text-2xl font-bold text-primary">Hire Back</h1>

        <div className="space-x-4">
          <a href="/login" className="text-gray-700 hover:text-primary">
            Login
          </a>
          <a
            href="/register"
            className="bg-primary text-white px-4 py-2 rounded-xl"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-24 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Developers get hired. Companies compete.
        </h2>

        <p className="text-gray-600 max-w-xl mb-6">
          Hire Back flips the job market — companies apply to developers.
        </p>

        <a
          href="/register"
          className="bg-primary text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition"
        >
          Join Now
        </a>
      </div>

    </div>
  )
}