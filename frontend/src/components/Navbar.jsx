import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Notifications from "../components/Notifications"
import API from "../services/api"
import socket from "../socket"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  // Fetch unread notification count
  const fetchCount = async () => {
    try {
      const res = await API.get("/notifications")
      const unread = res.data.filter((n) => !n.isRead).length
      setCount(unread)
    } catch (err) {
      console.error("Failed to fetch notifications")
    }
  }

  useEffect(() => {
    fetchCount()
  }, [])

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-primary cursor-pointer"
        onClick={() => navigate("/")}
      >
        Hire Back
      </h1>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        
        {/* 🔔 Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="relative text-xl"
          >
            🔔

            {/* 🔴 Badge */}
            {count > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {count}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-80 z-50">
              <Notifications onClose={() => setOpen(false)} />
            </div>
          )}
        </div>

        {/* Auth Buttons */}
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 rounded-xl hover:bg-gray-100"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="px-4 py-2 rounded-xl bg-primary text-white"
        >
          Register
        </button>

      </div>
    </nav>
  )
}