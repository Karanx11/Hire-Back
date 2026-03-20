import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import Notification from "../models/Notification.js"

const router = express.Router()

// Get notifications
router.get("/", protect, async (req, res) => {
  const notifications = await Notification.find({
    userId: req.user.id,
  }).sort({ createdAt: -1 })

  res.json(notifications)
})

// Mark as read
router.put("/:id", protect, async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  )

  res.json(notification)
})

export default router