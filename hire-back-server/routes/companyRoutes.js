import express from "express"
import { getDevelopers } from "../controllers/companyController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/developers", protect, getDevelopers)

export default router