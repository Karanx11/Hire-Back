import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import API from "../services/api"

export default function Register() {
  const [role, setRole] = useState("developer")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    industry: "",
    location: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await API.post("/auth/register", {
        ...form,
        role,
      })

      setTimeout(() => {
        setLoading(false)
        alert("Registered successfully!")
        navigate("/login")
      }, 1000)

    } catch (err) {
      setLoading(false)
      alert(err.response?.data?.message || "Error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#caf0f8] via-white to-[#90e0ef]">

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl"
      >

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* Role Toggle */}
        <div className="flex mb-6 bg-[#e6f7fc] rounded-xl p-1">
          <button
            type="button"
            onClick={() => setRole("developer")}
            className={`w-1/2 py-2 rounded-lg text-sm transition ${
              role === "developer"
                ? "bg-[#0077B6] text-white shadow"
                : "text-gray-600 hover:text-[#0077B6]"
            }`}
          >
            Developer
          </button>

          <button
            type="button"
            onClick={() => setRole("company")}
            className={`w-1/2 py-2 rounded-lg text-sm transition ${
              role === "company"
                ? "bg-[#0077B6] text-white shadow"
                : "text-gray-600 hover:text-[#0077B6]"
            }`}
          >
            Company
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 pr-12 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-[#0077B6]"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Company Fields */}
          {role === "company" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />

              <input
                type="text"
                name="industry"
                placeholder="Industry (e.g. Fintech, SaaS)"
                value={form.industry}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />
            </motion.div>
          )}

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0077B6] hover:bg-[#005f8f] text-white font-semibold flex items-center justify-center gap-2 transition"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </motion.button>

        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#0077B6] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  )
}