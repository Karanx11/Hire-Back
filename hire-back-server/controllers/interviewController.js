import InterviewRequest from "../models/InterviewRequest.js"
import Notification from "../models/Notification.js"
import { getIO, getUsers } from "../socket.js" 

// Send request (Company → Developer)
export const sendRequest = async (req, res) => {
  try {
    const { developerId, message } = req.body

    if (!developerId) {
      return res.status(400).json({ message: "Developer ID is required" })
    }

    // ❗ Prevent duplicate requests
    const existing = await InterviewRequest.findOne({
      companyId: req.user.id,
      developerId,
      status: "pending",
    })

    if (existing) {
      return res.status(400).json({ message: "Request already sent" })
    }

    const request = await InterviewRequest.create({
      companyId: req.user.id,
      developerId,
      message,
    })

    const notificationMessage = "You received a new interview request 🚀"

    // ✅ Save notification
    await Notification.create({
      userId: developerId,
      message: notificationMessage,
      type: "request",
    })

    // 🔥 Real-time emit
    const io = getIO()
    const users = getUsers()

    const socketId = users[developerId.toString()]
    if (socketId) {
      io.to(socketId).emit("newNotification", {
        message: notificationMessage,
        type: "request",
      })
    }

    res.status(201).json(request)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Developer responds (Accept/Reject)
export const respondRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body

    if (!requestId || !status) {
      return res.status(400).json({ message: "Request ID and status required" })
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const request = await InterviewRequest.findById(requestId)

    if (!request) {
      return res.status(404).json({ message: "Request not found" })
    }

    // ❗ Authorization check
    if (request.developerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" })
    }

    request.status = status
    await request.save()

    const notificationMessage = `Your request was ${status}`

    // ✅ Save notification
    await Notification.create({
      userId: request.companyId,
      message: notificationMessage,
      type: status,
    })

    // 🔥 Real-time emit
    const io = getIO()
    const users = getUsers()

    const socketId = users[request.companyId.toString()]
    if (socketId) {
      io.to(socketId).emit("newNotification", {
        message: notificationMessage,
        type: status,
      })
    }

    res.json(request)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all requests
export const getRequests = async (req, res) => {
  try {
    let requests

    if (req.user.role === "company") {
      requests = await InterviewRequest.find({
        companyId: req.user.id,
      })
        .populate("developerId", "name email")
        .sort({ createdAt: -1 })
    } else {
      requests = await InterviewRequest.find({
        developerId: req.user.id,
      })
        .populate("companyId", "name email")
        .sort({ createdAt: -1 })
    }

    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}