import Order from "../models/orderModel.js";
import { jsonResponse } from "../middleware/jsonResponse.js";

export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return jsonResponse(res, { message: "No order items" }, 400);
  }

  const order = new Order({
    orderItems,
    user: req.userId,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  return jsonResponse(res, createdOrder, 201);
};

export const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    return jsonResponse(res, updatedOrder);
  } else {
    return jsonResponse(res, { message: "Order not found" }, 404);
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
  return jsonResponse(res, orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    if (req.user.role !== "admin" && order.user._id.toString() !== req.userId) {
      return jsonResponse(
        res,
        { message: "Not authorized to view this order" },
        401
      );
    }
    return jsonResponse(res, order);
  } else {
    return jsonResponse(res, { message: "Order not found" }, 404);
  }
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  return jsonResponse(res, orders);
};
