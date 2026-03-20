import { useEffect, useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"

export default function DeveloperDashboard() {
  const [requests, setRequests] = useState([])

  // Fetch all interview requests
  const fetchRequests = async () => {
    try {
      const res = await API.get("/interview/all")
      setRequests(res.data)
    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  // Respond to request
  const respond = async (requestId, status) => {
    try {
      await API.put("/interview/respond", {
        requestId,
        status,
      })

      alert(`Request ${status}`)
      fetchRequests() // refresh
    } catch (err) {
      alert("Error updating request")
    }
  }

  return (
    
    <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">Dashboard</h1>

  <Link
    to="/developer-profile"
    className="bg-primary text-white px-4 py-2 rounded-xl"
  >
    Edit Profile
  </Link>
</div>
      <h1 className="text-3xl font-bold mb-6">
        Interview Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <h2 className="text-xl font-semibold">
                {req.companyId?.name}
              </h2>

              <p className="text-gray-500 mb-2">
                {req.companyId?.email}
              </p>

              <p className="mb-3">
                <strong>Message:</strong> {req.message}
              </p>

              <p className="mb-3">
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    req.status === "accepted"
                      ? "text-green-600"
                      : req.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
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
                    className="bg-green-500 text-white px-4 py-2 rounded-xl"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => respond(req._id, "rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
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