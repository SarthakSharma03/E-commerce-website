import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { jsonResponse } from "../middleware/jsonResponse.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find();
        const totalRevenue = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);

        const orderStatus = {
            processing: await Order.countDocuments({ status: 'Processing' }),
            shipped: await Order.countDocuments({ status: 'Shipped' }),
            delivered: await Order.countDocuments({ status: 'Delivered' }),
            cancelled: await Order.countDocuments({ status: 'Cancelled' }),
        };

        const today = new Date();
        const monthlySales = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const nextDate = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
            
            const monthOrders = await Order.find({
                createdAt: { $gte: date, $lt: nextDate },
                isPaid: true
            });
            
            const sales = monthOrders.reduce((acc, order) => acc + order.totalPrice, 0);
            monthlySales.push({
                name: date.toLocaleString('default', { month: 'short' }),
                sales: sales
            });
        }

        return jsonResponse(res, {
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue,
            orderStatus,
            monthlySales
        });
    } catch (error) {
        console.error(error);
        return jsonResponse(res, { message: "Error fetching stats" }, 500);
    }
};
