import DeveloperProfile from "../models/DeveloperProfile.js"

// Create or Update Profile
export const saveProfile = async (req, res) => {
  try {
    const {
      skills,
      experience,
      expectedSalary,
      availability,
      projects,
      profileImage,
    } = req.body

    let profile = await DeveloperProfile.findOne({
      userId: req.user.id,
    })

    const data = {
      skills,
      experience,
      expectedSalary,
      availability,
      projects,
      profileImage,
    }

    if (profile) {
      profile = await DeveloperProfile.findOneAndUpdate(
        { userId: req.user.id },
        data,
        { new: true }
      )
    } else {
      profile = await DeveloperProfile.create({
        userId: req.user.id,
        ...data,
      })
    }

    res.json(profile)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const profile = await DeveloperProfile.findOne({
      userId: req.user.id,
    })

    res.json(profile)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// Get public profile by userId
export const getPublicProfile = async (req, res) => {
  try {
    const { userId } = req.params

    const profile = await DeveloperProfile.findOne({ userId }).populate(
      "userId",
      "name email"
    )

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    res.json(profile)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}