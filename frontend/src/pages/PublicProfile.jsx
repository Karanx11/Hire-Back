import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

export default function PublicProfile() {
  const { userId } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/developer/public/${userId}`)
      setProfile(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  // 🔥 Send request from profile
  const sendRequest = async () => {
    try {
      setLoading(true)

      await API.post("/interview/send", {
        developerId: userId,
        message: "We would like to interview you 🚀",
      })

      setSent(true)
      alert("Interview request sent!")
    } catch (err) {
      alert(err.response?.data?.message || "Error sending request")
    } finally {
      setLoading(false)
    }
  }

  if (!profile) {
    return <p className="text-center mt-10">Loading...</p>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">

        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={
              profile.profileImage ||
              "https://via.placeholder.com/100"
            }
            alt="profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          <div>
            <h2 className="text-2xl font-bold">
              {profile.userId?.name}
            </h2>
            <p className="text-gray-500">
              {profile.userId?.email}
            </p>
          </div>
        </div>

        {/* 🔥 Hire Button */}
        <button
          onClick={sendRequest}
          disabled={loading || sent}
          className={`w-full mb-6 py-3 rounded-xl text-white text-lg ${
            sent
              ? "bg-gray-400"
              : "bg-primary hover:scale-105"
          } transition`}
        >
          {sent
            ? "Request Sent ✅"
            : loading
            ? "Sending..."
            : "Hire / Send Interview Request 🚀"}
        </button>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-primary text-white px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Info */}
        <p className="mb-2">
          <strong>Experience:</strong> {profile.experience} years
        </p>

        <p className="mb-2">
          <strong>Expected Salary:</strong> ₹{profile.expectedSalary}
        </p>

        <p className="mb-6">
          <strong>Status:</strong> {profile.availability}
        </p>

        {/* Resume */}
        {profile.resume && (
          <div className="mb-6">
            <a
              href={profile.resume}
              target="_blank"
              className="text-blue-500 underline"
            >
              View Resume 📄
            </a>
          </div>
        )}

        {/* Projects */}
        <div>
          <h3 className="font-semibold mb-4">Projects</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {profile.projects.map((proj, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 shadow-sm"
              >
                {proj.image && (
                  <img
                    src={proj.image}
                    alt="project"
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}

                <h4 className="font-semibold">{proj.title}</h4>

                <p className="text-gray-600 text-sm mb-2">
                  {proj.description}
                </p>

                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    className="text-primary text-sm underline"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}