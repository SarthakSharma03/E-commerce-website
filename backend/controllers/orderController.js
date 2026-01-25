import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { jsonResponse } from "../middleware/jsonResponse.js";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { v4 as uuidv4 } from 'uuid';


let cashfreeInstance = null;
const getCashfree = () => {
    if (!cashfreeInstance) {
        cashfreeInstance = new Cashfree(
            CFEnvironment.SANDBOX,
            process.env.CASHFREE_APP_ID,
            process.env.CASHFREE_SECRET_KEY
        );
    }
    return cashfreeInstance;
};

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

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      return jsonResponse(res, { message: `Product not found: ${item.product}` }, 404);
    }
    if (product.stock < item.qty) {
      return jsonResponse(res, { 
        message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.qty}` 
      }, 400);
    }
  }

  const orderId = uuidv4();

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderId: orderId,
  });

  const createdOrder = await order.save();
  return jsonResponse(res, createdOrder, 201);
};

export const getOrderById = async (req, res) => {
  let order;
 
  const isObjectId = req.params.id.match(/^[0-9a-fA-F]{24}$/);

  if (isObjectId) {
      order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate({
          path: "orderItems.product",
          select: "name images price category"
        });
  } else {
      order = await Order.findOne({ orderId: req.params.id })
        .populate("user", "name email")
        .populate({
          path: "orderItems.product",
          select: "name images price category"
        });
  }

  if (order) {
    return jsonResponse(res, order);
  } else {
    return jsonResponse(res, { message: "Order not found" }, 404);
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems.product');

    if (!order) {
      return jsonResponse(res, { message: "Order not found" }, 404);
    }

    // Only reduce stock if order is not already paid
    if (!order.isPaid) {
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product._id || item.product);
        if (product) {
          if (product.stock < item.qty) {
            return jsonResponse(res, { 
              message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.qty}` 
            }, 400);
          }
          product.stock -= item.qty;
          await product.save();
        }
      }
    }

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
  } catch (error) {
    console.error("Update order to paid error:", error);
    return jsonResponse(res, { message: error.message || "Failed to update order" }, 500);
  }
};

export const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.status = 'Delivered';

    const updatedOrder = await order.save();

    return jsonResponse(res, updatedOrder);
  } else {
    return jsonResponse(res, { message: "Order not found" }, 404);
  }
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;
    
    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    } else {
       // If changing from Delivered to something else, maybe reset isDelivered? 
       // For now, let's keep it simple. If status is delivered, set isDelivered.
    }

    const updatedOrder = await order.save();
    return jsonResponse(res, updatedOrder);
  } else {
    return jsonResponse(res, { message: "Order not found" }, 404);
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate({
    path: "orderItems.product",
    select: "name images price category"
  });
  return jsonResponse(res, orders);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id name")
    .populate({
      path: "orderItems.product",
      select: "name images price category"
    });
  return jsonResponse(res, orders);
};

export const initiatePayment = async (req, res) => {
  try {
   
    const id = req.params.id;
    let order;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        order = await Order.findById(id).populate('user', 'name email phone');
    } else {
        order = await Order.findOne({ orderId: id }).populate('user', 'name email phone');
    }

    if (!order) {
      return jsonResponse(res, { message: "Order not found" }, 404);
    }

    const phone = order.shippingAddress?.phone || order.user.phone || "N/A";
    const customerId = order.user._id.toString();

    const redirectUrl = process.env.PAYMENT_REDIRECT_URL || "http://localhost:5173/order-success";
    const returnUrl = `${redirectUrl}/${order.orderId}`;

    const request = {
      "order_amount": order.totalPrice,
      "order_currency": "INR",
      "order_id": order.orderId,
      "customer_details": {
        "customer_id": customerId,
        "customer_phone": phone,
        "customer_name": order.user.name || "Customer",
        "customer_email": order.user.email
      },
      "order_meta": {
        "return_url": returnUrl
      }
    };

    const cashfree = getCashfree();
    const response = await cashfree.PGCreateOrder(request);
    return jsonResponse(res, response.data);

  } catch (error) {
    console.error("Cashfree Create Order Error:", error.response?.data?.message || error.message);
 
    console.error(JSON.stringify(error.response?.data || {}, null, 2));
    return jsonResponse(res, { message: error.response?.data?.message || error.message }, 500);
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    

    const idToVerify = orderId || req.params.orderId;

    if (!idToVerify) {
        return jsonResponse(res, { message: "Order ID is required" }, 400);
    }

    const order = await Order.findOne({ orderId: idToVerify })
      .populate('user', 'email')
      .populate('orderItems.product');

    if (!order) {
      return jsonResponse(res, { message: "Order not found" }, 404);
    }

    const cashfree = getCashfree();
    const response = await cashfree.PGOrderFetchPayments(idToVerify);
    
 
    const successfulPayment = response.data.find(payment => payment.payment_status === "SUCCESS");

    if (successfulPayment) {
      // Only reduce stock if order is not already paid
      if (!order.isPaid) {
        // Reduce stock for each product in the order
        for (const item of order.orderItems) {
          const product = await Product.findById(item.product._id || item.product);
          if (product) {
            if (product.stock < item.qty) {
              return jsonResponse(res, { 
                message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.qty}` 
              }, 400);
            }
            product.stock -= item.qty;
            await product.save();
          }
        }
      }

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: successfulPayment.cf_payment_id,
        status: successfulPayment.payment_status,
        update_time: successfulPayment.payment_completion_time,
        email_address: order.user.email
      };

      const updatedOrder = await order.save();
      return jsonResponse(res, { message: "Payment Verified", order: updatedOrder });
    } else {
      return jsonResponse(res, { message: "Payment not successful", status: "failed" });
    }

  } catch (error) {
    console.error("Cashfree Verify Payment Error:", error.response?.data?.message || error.message);
    return jsonResponse(res, { message: error.response?.data?.message || error.message }, 500);
  }
};
