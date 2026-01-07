import Otp from "../models/otpModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import { jsonResponse } from "../middleware/jsonResponse.js";
import bcrypt from "bcrypt";

export const sendOtp = async (req, res) => {
  const { email:bodyEmail } = req.body;

  if (!bodyEmail) {
    return jsonResponse(res, { message: "Email is required" }, 400);
  }

  const email = bodyEmail.toLowerCase();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.findByEmail(email);
  if (!user) {
    return jsonResponse(
      res,
      { message: "User with this email does not exist" },
      404
    );
  }

  await Otp.deleteMany({ email });

  await Otp.create({ email, otp });

   sendEmail(
    email,
    "Your OTP Code",
    `Your OTP code is ${otp}. It expires in 5 minutes.`
  ).catch((err)=>{
    console.log("smpt : error : ",err.message);
  })

  return jsonResponse(res, { message: "OTP sent successfully" });
};


export const resetPasswordWithOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return jsonResponse(res, { message: "All fields are required" }, 400);
  }

  const otpRecord = await Otp.findOne({ email, otp });
  if (!otpRecord) {
    return jsonResponse(res, { message: "Invalid or expired OTP" }, 400);
  }

  const user = await User.findByEmail(email);
  if (!user) {
    return jsonResponse(res, { message: "User not found" }, 404);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  await Otp.deleteOne({ _id: otpRecord._id });

  return jsonResponse(res, { message: "Password reset successfully" });
};
