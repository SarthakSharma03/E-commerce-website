import { useEffect, useState } from "react";
import Api from "../../service/Api";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaBox,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await Api.getDashboardStats();
        setStats(data);
      } catch (error) {
        toast.error("Failed to load dashboard stats");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
      </div>
    );
  }

  if (!stats) return null;

  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div className={`p-4 rounded-xl ${color} text-white`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </motion.div>
  );

  const maxSales = Math.max(
    ...(stats.monthlySales?.map((s) => s.sales) || [0]),
    1
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Overview of your store's performance
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/products/add")}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 cursor-pointer"
          >
            + Add Product
          </button>

          <span className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-full font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers size={24} />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<FaShoppingCart size={24} />}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<FaBox size={24} />}
          color="bg-orange-500"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${(stats.totalRevenue || 0).toLocaleString()}`}
          icon={<FaMoneyBillWave size={24} />}
          color="bg-green-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Monthly Revenue
          </h3>

          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {stats.monthlySales?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 flex-1 group"
              >
                <div className="relative w-full flex justify-center items-end h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${(item.sales / maxSales) * 100}%`,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="w-full max-w-10 bg-red-500 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ₹{item.sales.toLocaleString()}
                    </div>
                  </motion.div>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {item.name}
                </span>
              </div>
            ))}

            {!stats.monthlySales?.length && (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No sales data available
              </div>
            )}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Order Status
          </h3>

          <div className="space-y-6">
            {[
              {
                label: "Processing",
                value: stats.orderStatus?.processing,
                color: "bg-blue-500",
                bg: "bg-blue-100",
              },
              {
                label: "Shipped",
                value: stats.orderStatus?.shipped,
                color: "bg-yellow-500",
                bg: "bg-yellow-100",
              },
              {
                label: "Delivered",
                value: stats.orderStatus?.delivered,
                color: "bg-green-500",
                bg: "bg-green-100",
              },
              {
                label: "Cancelled",
                value: stats.orderStatus?.cancelled,
                color: "bg-red-500",
                bg: "bg-red-100",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">
                    {item.label}
                  </span>
                  <span className="font-bold text-gray-900">
                    {item.value || 0}
                  </span>
                </div>

                <div className={`h-2.5 w-full ${item.bg} rounded-full`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        stats.totalOrders
                          ? ((item.value || 0) /
                              stats.totalOrders) *
                            100
                          : 0
                      }%`,
                    }}
                    transition={{ duration: 1 }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
