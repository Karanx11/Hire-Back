import nodemailer from "nodemailer"

const sendEmail = async (to, subject, text) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER)
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing")

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    console.log("Sending email to:", to)

    const info = await transporter.sendMail({
      from: `"HireBack" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    })

    console.log("Email sent:", info.response)

  } catch (error) {
    console.error("EMAIL ERROR:", error)
    throw error
  }
}

export default sendEmail