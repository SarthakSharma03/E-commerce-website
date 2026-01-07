import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { jsonResponse } from "../middleware/jsonResponse.js";

const User = userModel;

const signToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};

export const register = async (req, res, _) => {
  const { name, email, password, role = "user" } = req.body;
  if (!name || !email || !password) {
    return jsonResponse(res, { message: "Missing fields" }, 400);
  }
  const exists = await User.findByEmail(email);
  if (exists) {
    return jsonResponse(res, { message: "Email already in use" }, 409);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  return jsonResponse(
    res,
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    },
    201
  );
};

export const login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return jsonResponse(res, { message: "Missing credentials" }, 400);
  }

  email = email.toLowerCase();

  const user = await User.verify(email, password);

  if (!user) {
    return jsonResponse(res, { message: "Invalid credentials" }, 401);
  }

  const token = signToken(user._id.toString());

  return jsonResponse(res, {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const logout = async (req, res) => {
  return jsonResponse(res, { message: "Logged out successfully" });
};

export const me = async (req, res) => {
  const user = await User.findById(req.userId).select(
    "name email role address phone"
  );
  if (!user) {
    return jsonResponse(res, { message: "User not found" }, 404);
  }
  return jsonResponse(res, {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    address: user.address,
    phone: user.phone,
  });
};

export const updateProfile = async (req, res) => {
  const { name, email, address, phone } = req.body;
  const userId = req.userId;

  const user = await User.findById(userId);
  if (!user) {
    return jsonResponse(res, { message: "User not found" }, 404);
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (address) user.address = address;
  if (phone) user.phone = phone;

  await user.save();

  return jsonResponse(res, {
    message: "Profile updated successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      phone: user.phone,
    },
  });
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId;

  if (!currentPassword || !newPassword) {
    return jsonResponse(
      res,
      { message: "Please provide both current and new password" },
      400
    );
  }

  if (newPassword.length < 6) {
    return jsonResponse(
      res,
      { message: "New password must be at least 6 characters" },
      400
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    return jsonResponse(res, { message: "User not found" }, 404);
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return jsonResponse(res, { message: "Incorrect current password" }, 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return jsonResponse(res, { message: "Password updated successfully" });
};
