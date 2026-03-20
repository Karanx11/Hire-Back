import express from "express"
import { saveProfile, getProfile } from "../controllers/developerController.js"
import { protect } from "../middleware/authMiddleware.js"
import { getPublicProfile } from "../controllers/developerController.js"

const router = express.Router()

router.post("/profile", protect, saveProfile)
router.get("/profile", protect, getProfile)
router.get("/public/:userId", getPublicProfile)
export default router
