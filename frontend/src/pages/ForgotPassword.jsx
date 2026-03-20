import { useState } from "react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <p className="text-gray-600 text-sm mb-4 text-center">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl"
            required
          />

          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-xl"
          >
            Send Reset Link
          </button>

        </form>

      </div>
    </div>
  )
}