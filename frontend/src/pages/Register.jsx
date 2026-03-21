import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  signInWithEmailAndPassword,
  sendEmailVerification 
} from "firebase/auth"
import { auth } from "../firebase"
import API from "../services/api"

export default function Login() {
  const [role, setRole] = useState("developer")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notVerified, setNotVerified] = useState(false)

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const resendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser)
      alert("Verification email sent again! Check inbox or spam 📧")
    } catch {
      alert("Failed to resend email")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      const user = userCredential.user

      // 🔐 CHECK EMAIL VERIFIED
      if (!user.emailVerified) {
        setLoading(false)
        setNotVerified(true)
        return
      }

      // 🔥 OPTIONAL backend sync
      try {
        await API.post("/users/sync", {
          uid: user.uid,
          email: user.email,
          role,
        })
      } catch (err) {
        console.log("Backend optional:", err.message)
      }

      setTimeout(() => {
        setLoading(false)

        if (role === "developer") {
          navigate("/developer-dashboard")
        } else {
          navigate("/company-dashboard")
        }
      }, 800)

    } catch (error) {
      setLoading(false)
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#caf0f8] via-white to-[#90e0ef]">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl"
      >

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {/* Role Toggle */}
        <div className="flex mb-6 bg-[#e6f7fc] rounded-xl p-1">
          <button
            onClick={() => setRole("developer")}
            className={`w-1/2 py-2 rounded-lg ${
              role === "developer"
                ? "bg-[#0077B6] text-white"
                : "text-gray-600"
            }`}
          >
            Developer
          </button>

          <button
            onClick={() => setRole("company")}
            className={`w-1/2 py-2 rounded-lg ${
              role === "company"
                ? "bg-[#0077B6] text-white"
                : "text-gray-600"
            }`}
          >
            Company
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-[#0077B6]"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-3 pr-12 rounded-xl border focus:ring-2 focus:ring-[#0077B6]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0077B6] text-white rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

        </form>

        {/* ❌ NOT VERIFIED MESSAGE */}
        {notVerified && (
          <div className="mt-6 text-center text-sm bg-red-50 border border-red-200 p-3 rounded-xl">
            ❌ Your email is not verified <br />
            Please check your <b>Inbox</b> or{" "}
            <span className="text-red-500 font-semibold">Spam folder</span>.
            
            <br />

            <button
              onClick={resendVerification}
              className="mt-2 text-[#0077B6] font-semibold"
            >
              🔁 Resend Verification Email
            </button>
          </div>
        )}

        <p className="text-center mt-6 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#0077B6] font-semibold">
            Register
          </Link>
        </p>

      </motion.div>
    </div>
  )
}