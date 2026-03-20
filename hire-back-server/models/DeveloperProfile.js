import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  resume: String
})

const developerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    skills: [String],
    experience: Number,
    expectedSalary: Number,
    availability: {
      type: String,
      enum: ["Open", "Not Looking"],
      default: "Open",
    },
    profileViews: {
      type: Number,
      default: 0,
    },

    // 🆕 NEW FIELDS
    projects: [projectSchema],
    profileImage: String, // URL
  },
  { timestamps: true }
)

export default mongoose.model("DeveloperProfile", developerProfileSchema)