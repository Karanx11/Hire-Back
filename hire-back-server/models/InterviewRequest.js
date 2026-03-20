import mongoose from "mongoose"

const interviewRequestSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
)

export default mongoose.model("InterviewRequest", interviewRequestSchema)