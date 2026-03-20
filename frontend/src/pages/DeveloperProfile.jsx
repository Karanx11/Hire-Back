import { useState, useEffect } from "react"
import API from "../services/api"

export default function DeveloperProfile() {
  const [form, setForm] = useState({
    skills: "",
    experience: "",
    expectedSalary: "",
    availability: "Open",
    profileImage: "",
    resume: "",
  })

  const [projects, setProjects] = useState([
    { title: "", description: "", link: "", image: "" },
  ])

  // 🔥 Upload file (image/pdf)
  const uploadFile = async (file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await API.post("/upload", formData)
      return res.data.url
    } catch (err) {
      console.error(err)
      alert("Upload failed ❌")
      return ""
    }
  }

  // 📥 Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await API.get("/developer/profile")

      if (res.data) {
        setForm({
          skills: res.data.skills?.join(", ") || "",
          experience: res.data.experience || "",
          expectedSalary: res.data.expectedSalary || "",
          availability: res.data.availability || "Open",
          profileImage: res.data.profileImage || "",
          resume: res.data.resume || "",
        })

        setProjects(
          res.data.projects?.length
            ? res.data.projects
            : [{ title: "", description: "", link: "", image: "" }]
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 🖼️ Profile Image Upload
  const handleProfileImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const url = await uploadFile(file)
    setForm({ ...form, profileImage: url })
  }

  // 📄 Resume Upload
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Only PDF allowed")
      return
    }

    const url = await uploadFile(file)
    setForm({ ...form, resume: url })
  }

  // 📁 Project handlers
  const handleProjectChange = (index, e) => {
    const newProjects = [...projects]
    newProjects[index][e.target.name] = e.target.value
    setProjects(newProjects)
  }

  const handleProjectImage = async (index, e) => {
    const file = e.target.files[0]
    if (!file) return

    const url = await uploadFile(file)

    const newProjects = [...projects]
    newProjects[index].image = url
    setProjects(newProjects)
  }

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", link: "", image: "" },
    ])
  }

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  // 💾 Save profile
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await API.post("/developer/profile", {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
        projects,
      })

      alert("Profile updated 🚀")
    } catch (err) {
      console.error(err)
      alert("Error saving profile ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Developer Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 🖼️ Profile Image */}
          <div>
            <label className="block mb-1 font-medium">
              Profile Image
            </label>

            <input type="file" onChange={handleProfileImage} />

            {form.profileImage && (
              <img
                src={form.profileImage}
                alt="profile"
                className="w-20 h-20 mt-2 rounded-full object-cover"
              />
            )}
          </div>

          {/* Skills */}
          <input
            type="text"
            name="skills"
            placeholder="Skills (React, Node)"
            value={form.skills}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          {/* 📄 Resume */}
          <div>
            <label className="block mb-1 font-medium">
              Upload Resume (PDF)
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
            />

            {form.resume && (
              <a
                href={form.resume}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                View Resume
              </a>
            )}
          </div>

          {/* Experience */}
          <input
            type="number"
            name="experience"
            placeholder="Experience (years)"
            value={form.experience}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          {/* Salary */}
          <input
            type="number"
            name="expectedSalary"
            placeholder="Expected Salary"
            value={form.expectedSalary}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          {/* Projects */}
          <div>
            <h3 className="font-semibold mb-2">Projects</h3>

            {projects.map((proj, index) => (
              <div key={index} className="border p-4 rounded-xl mb-3">

                <input
                  type="text"
                  name="title"
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) => handleProjectChange(index, e)}
                  className="w-full p-2 mb-2 border rounded"
                />

                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) => handleProjectChange(index, e)}
                  className="w-full p-2 mb-2 border rounded"
                />

                <input
                  type="text"
                  name="link"
                  placeholder="Project Link"
                  value={proj.link}
                  onChange={(e) => handleProjectChange(index, e)}
                  className="w-full p-2 mb-2 border rounded"
                />

                {/* 📸 Project Image */}
                <input
                  type="file"
                  onChange={(e) => handleProjectImage(index, e)}
                />

                {proj.image && (
                  <img
                    src={proj.image}
                    alt="project"
                    className="w-full h-32 object-cover mt-2 rounded"
                  />
                )}

                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 mt-2"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addProject}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              + Add Project
            </button>
          </div>

          <button className="w-full bg-green-600 text-white p-3 rounded-xl">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  )
}