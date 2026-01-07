import nodemailer from "nodemailer";
const sendEmail = async (email, subject, text) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email service configuration missing (EMAIL_USER or EMAIL_PASS)");
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
    });

    console.log("Email sent successfully to", email);
  } catch (error) {
    console.error("Email not sent:", error);
    throw error;
  }
};

export default sendEmail;
