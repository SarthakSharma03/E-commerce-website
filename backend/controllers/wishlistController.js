import User from "../models/userModel.js";
import { jsonResponse } from "../middleware/jsonResponse.js";

export const getWishlist = async (req, res) => {
  const user = await User.findById(req.userId).populate("wishlist");
  return jsonResponse(res, { success: true, data: user.wishlist });
};

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return jsonResponse(res, { message: "Product ID is required" }, 400);
  }
  const user = await User.findById(req.userId);
  console.log(user ,'user')
  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }
  await user.populate("wishlist");
  return jsonResponse(res, {
    success: true,
    message: "Added to wishlist",
    data: user.wishlist,
  });
};

export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.userId);
  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();
  await user.populate("wishlist");
  return jsonResponse(res, {
    success: true,
    message: "Removed from wishlist",
    data: user.wishlist,
  });
};

export const clearWishlist = async (req, res) => {
  const user = await User.findById(req.userId);
  user.wishlist = [];
  await user.save();
  return jsonResponse(res, {
    success: true,
    message: "Wishlist cleared",
    data: [],
  });
};

