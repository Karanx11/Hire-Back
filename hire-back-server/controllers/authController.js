import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"

import CompanyProfile from "../models/CompanyProfile.js"

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      companyName,
      industry,
      location,
    } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    if (role === "company") {
      await CompanyProfile.create({
        userId: user._id,
        companyName,
        industry,
        location,
      })
    }

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body

    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: "User not found" })

    if (user.role !== role)
      return res.status(400).json({ message: "Invalid role" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user)
      return res.status(404).json({ message: "User not found" })

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex")

    // Hash token before saving (security)
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex")

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000 // 15 min

    await user.save()

    // Create reset link
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`

    // TODO: Send email here (nodemailer)
    console.log("Reset Link:", resetUrl)

    res.json({ message: "Reset link sent to email" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body

    // Hash incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex")

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" })

    // Update password
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword

    // Clear reset fields
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.json({ message: "Password reset successful" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}