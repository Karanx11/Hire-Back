import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import socket from "./socket"
import { Toaster, toast } from "react-hot-toast"

// Pages
import PublicProfile from "./pages/PublicProfile"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import CompanyDashboard from "./pages/CompanyDashboard"
import DeveloperDashboard from "./pages/DeveloperDashboard"
import DeveloperProfile from "./pages/DeveloperProfile"

function App() {

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))

      if (user?._id && socket) {
        if (socket.connected) {
          socket.emit("register", user._id)
        } else {
          socket.on("connect", () => {
            socket.emit("register", user._id)
          })
        }
      }

      // 🔔 Listen for notifications
      socket.on("newNotification", (data) => {
        toast.success(data.message)
      })

    } catch (error) {
      console.error("Invalid user in localStorage")
    }

    return () => {
      socket.off("connect")
      socket.off("newNotification")
    }
  }, [])

  return (
    <>
      {/* ✅ Toast UI */}
      <Toaster position="top-right" />

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
          <Route path="/developer-profile" element={<DeveloperProfile />} />
          <Route path="/developer/:userId" element={<PublicProfile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App