import { useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [role, setRole] = useState("developer")
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await API.post("/auth/login", {
      ...form,
      role,
    })

    // Save token
    localStorage.setItem("token", res.data.token)

    alert("Login successful!")

    // Redirect based on role
    if (role === "developer") {
      navigate("/developer-dashboard")
    } else {
      navigate("/company-dashboard")
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed")
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Role Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-xl">
          <button
            onClick={() => setRole("developer")}
            className={`w-1/2 p-2 rounded-xl ${
              role === "developer" ? "bg-primary text-white" : ""
            }`}
          >
            Developer
          </button>
          <button
            onClick={() => setRole("company")}
            className={`w-1/2 p-2 rounded-xl ${
              role === "company" ? "bg-primary text-white" : ""
            }`}
          >
            Company
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-xl"
          >
            Login
          </button>

        </form>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}