import { useEffect, useState } from "react"
import API from "../services/api"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"

export default function DeveloperDashboard() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // 🔐 Protect route
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login")
    }
  }, [])

  // Fetch requests
  const fetchRequests = async () => {
    try {
      const res = await API.get("/interview/all")
      setRequests(res.data)
    } catch (err) {
      console.log(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  // Respond
  const respond = async (requestId, status) => {
    try {
      await API.put("/interview/respond", {
        requestId,
        status,
      })

      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status } : req
        )
      )
    } catch {
      alert("Error updating request")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#caf0f8] via-white to-[#90e0ef] p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Developer Dashboard
        </h1>

        <Link
          to="/developer-profile"
          className="bg-[#0077B6] text-white px-4 py-2 rounded-xl hover:bg-[#005f8f]"
        >
          Edit Profile
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Interview Requests
      </h2>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-8 h-8 border-4 border-[#0077B6] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">No requests yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-white/40"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {req.companyId?.name}
              </h2>

              <p className="text-gray-500 mb-2">
                {req.companyId?.email}
              </p>

              <p className="mb-3 text-gray-700">
                <strong>Message:</strong> {req.message}
              </p>

              {/* Status */}
              <p className="mb-4">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    req.status === "accepted"
                      ? "bg-green-100 text-green-600"
                      : req.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {req.status}
                </span>
              </p>

              {/* Actions */}
              {req.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => respond(req._id, "accepted")}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => respond(req._id, "rejected")}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}

        </div>
      )}
    </div>
  )
}