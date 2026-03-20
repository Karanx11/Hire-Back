import cloudinary from "../config/cloudinary.js"

export const uploadImage = async (req, res) => {
  try {
    const file = req.file

    const result = await cloudinary.uploader.upload_stream(
      { folder: "hireback" },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error })
        }
        res.json({ url: result.secure_url })
      }
    )

    result.end(file.buffer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}