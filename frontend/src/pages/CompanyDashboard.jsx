import { useEffect, useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"

export default function CompanyDashboard() {
  const [developers, setDevelopers] = useState([])
  const [sentRequests, setSentRequests] = useState([])

  // Fetch developers
  const fetchDevelopers = async () => {
    try {
      const res = await API.get("/company/developers")
      setDevelopers(res.data)
    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  useEffect(() => {
    fetchDevelopers()
  }, [])

  // Send interview request
  const sendRequest = async (developerId) => {
    try {
      await API.post("/interview/send", {
        developerId,
        message: "We want to hire you 🚀",
      })

      alert("Request sent!")

      // Disable button after sending
      setSentRequests((prev) => [...prev, developerId])
    } catch (err) {
      alert(err.response?.data?.message || "Error sending request")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Explore Developers 🚀
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {developers.map((dev) => (
          <div
            key={dev._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            {/* Profile Image */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={
                  dev.profileImage ||
                  "https://via.placeholder.com/80"
                }
                alt="profile"
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h2 className="text-lg font-semibold">
                  {dev.userId?.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  {dev.userId?.email}
                </p>
              </div>
            </div>

            {/* Skills */}
            <p className="mb-2">
              <strong>Skills:</strong>{" "}
              {dev.skills?.join(", ")}
            </p>

            {/* Experience */}
            <p className="mb-2">
              <strong>Experience:</strong> {dev.experience} yrs
            </p>

            {/* Salary */}
            <p className="mb-3">
              <strong>Expected Salary:</strong> ₹
              {dev.expectedSalary}
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-2">

              {/* 🔥 View Profile */}
              <Link
                to={`/developer/${dev.userId._id}`}
                className="text-center border border-primary text-primary py-2 rounded-xl hover:bg-primary hover:text-white transition"
              >
                View Profile
              </Link>

              {/* Send Request */}
              <button
                onClick={() => sendRequest(dev.userId._id)}
                disabled={sentRequests.includes(dev.userId._id)}
                className={`py-2 rounded-xl text-white ${
                  sentRequests.includes(dev.userId._id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:scale-105"
                } transition`}
              >
                {sentRequests.includes(dev.userId._id)
                  ? "Request Sent"
                  : "Send Interview Request"}
              </button>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}