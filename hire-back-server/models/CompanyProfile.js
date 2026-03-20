import mongoose from "mongoose"

const companyProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    companyName: String,
    industry: String,
    location: String,
  },
  { timestamps: true }
)

export default mongoose.model("CompanyProfile", companyProfileSchema)