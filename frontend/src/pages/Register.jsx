import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../services/api"

export default function Register() {
  const [role, setRole] = useState("developer")
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

    try {
      const res = await API.post("/auth/register", {
        ...form,
        role,
      })

      alert("Registered successfully!")

      // Optional: reset form
      setForm({
        name: "",
        email: "",
        password: "",
        companyName: "",
        industry: "",
        location: "",
      })

      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {/* Role Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => setRole("developer")}
            className={`w-1/2 p-2 rounded-xl ${
              role === "developer" ? "bg-primary text-white" : ""
            }`}
          >
            Developer
          </button>
          <button
            type="button"
            onClick={() => setRole("company")}
            className={`w-1/2 p-2 rounded-xl ${
              role === "company" ? "bg-primary text-white" : ""
            }`}
          >
            Company
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Fields */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />

          {/* Company Fields */}
          {role === "company" && (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                required
              />

              <input
                type="text"
                name="industry"
                placeholder="Industry (e.g. Fintech, SaaS)"
                value={form.industry}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-xl"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}