import { useEffect, useState } from "react"
import API from "../services/api"
import socket from "../socket"
import toast from "react-hot-toast"

export default function Notifications() {
  const [notifications, setNotifications] = useState([])

  const fetchNotifications = async () => {
    const res = await API.get("/notifications")
    setNotifications(res.data)
  }

  useEffect(() => {
    fetchNotifications()

    // 🔥 REAL-TIME LISTENER
    socket.on("newNotification", (data) => {
      toast.success(data.message) // 🍞 toast instead of alert

      // 🔊 sound
      const audio = new Audio("/notification.mp3")
      audio.play()

      fetchNotifications()
    })

    return () => socket.off("newNotification")
  }, [])

  return (
    <div className="bg-white shadow-xl rounded-xl p-4 w-80 absolute right-0 top-12 z-50">

      <h3 className="font-semibold mb-3">Notifications</h3>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className={`p-2 rounded mb-2 ${
              n.isRead ? "bg-gray-100" : "bg-blue-50"
            }`}
          >
            <p className="text-sm">{n.message}</p>
          </div>
        ))
      )}
    </div>
  )
}