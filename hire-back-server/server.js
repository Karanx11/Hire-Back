import dns from "dns"

dns.setServers(["8.8.8.8", "8.8.4.4"])
dns.setDefaultResultOrder("ipv4first")

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import http from "http"
import { initSocket } from "./socket.js"

import authRoutes from "./routes/authRoutes.js"
import interviewRoutes from "./routes/interviewRoutes.js"
import developerRoutes from "./routes/developerRoutes.js"
import companyRoutes from "./routes/companyRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

dotenv.config()

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/interview", interviewRoutes)
app.use("/api/developer", developerRoutes)
app.use("/api/company", companyRoutes)
app.use("/api/notifications", notificationRoutes)
app.use("/api/upload", uploadRoutes)

// ✅ SOCKET INIT
const server = http.createServer(app)
initSocket(server)

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅")
    server.listen(5000, () => {
      console.log("Server running on port 5000 🚀")
    })
  })
  .catch(err => console.log(err))