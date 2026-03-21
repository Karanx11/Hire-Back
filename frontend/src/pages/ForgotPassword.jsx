import { useState } from "react"
import { motion } from "framer-motion"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 🔥 Firebase reset email
      await sendPasswordResetEmail(auth, email)

      setTimeout(() => {
        setLoading(false)
        alert("Reset email sent! Check your inbox 📧")
      }, 800)

    } catch (error) {
      setLoading(false)
      alert(error.message)
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

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
          Forgot Password
        </h2>

        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0077B6] hover:bg-[#005f8f] text-white font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </motion.button>

        </form>

      </motion.div>
    </div>
  )
}