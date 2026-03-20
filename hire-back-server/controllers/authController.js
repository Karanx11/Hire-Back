import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import CompanyProfile from "../models/CompanyProfile.js"

//Register
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

    // If company → create company profile
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

// Login
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