import express from "express"
import {
  sendRequest,
  respondRequest,
  getRequests,
} from "../controllers/interviewController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/send", protect, sendRequest)
router.put("/respond", protect, respondRequest)
router.get("/all", protect, getRequests)

export default router