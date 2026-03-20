import DeveloperProfile from "../models/DeveloperProfile.js"
import User from "../models/User.js"

// Get all developers with filters
export const getDevelopers = async (req, res) => {
  try {
    const { skills, experience, salary } = req.query

    let query = {}

    // Filter by skills
    if (skills) {
      query.skills = { $in: skills.split(",") }
    }

    // Filter by experience
    if (experience) {
      query.experience = { $gte: Number(experience) }
    }

    // Filter by salary
    if (salary) {
      query.expectedSalary = { $lte: Number(salary) }
    }

    const developers = await DeveloperProfile.find(query).populate(
      "userId",
      "name email"
    )

    res.json(developers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}