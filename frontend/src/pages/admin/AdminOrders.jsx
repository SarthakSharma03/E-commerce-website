import { useEffect, useState } from "react";
import Api from "../../service/Api";
import { toast } from "react-toastify";
import { FaEye, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await Api.getAllOrders();
      setOrders(res?.orders || res || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await Api.updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const openOrderDetails = async (orderId) => {
    try {
      setIsViewOpen(true);
      setViewLoading(true);
      setSelectedOrder(null);
      const order = await Api.getOrderById(orderId);
      setSelectedOrder(order);
    } catch (error) {
      toast.error(error.message || "Failed to load order details");
      setIsViewOpen(false);
    } finally {
      setViewLoading(false);
    }
  };

  const closeOrderDetails = () => {
    setIsViewOpen(false);
    setSelectedOrder(null);
    setViewLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      order?._id?.toString().toLowerCase().includes(search) ||
      order?.user?.name?.toLowerCase().includes(search) ||
      order?.user?.email?.toLowerCase().includes(search);

    const matchesStatus =
      filterStatus === "All" || (order?.status || 'Processing') === filterStatus;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {isViewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeOrderDetails}
        >
          <div
            className="bg-white w-full max-w-3xl rounded-xl shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
              <button
                type="button"
                onClick={closeOrderDetails}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {viewLoading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                </div>
              ) : !selectedOrder ? (
                <div className="text-gray-500">No order details found.</div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500">Order</p>
                      <p className="font-semibold text-gray-900">
                        #{selectedOrder.orderId || selectedOrder._id}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedOrder.createdAt
                          ? new Date(selectedOrder.createdAt).toLocaleString()
                          : "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500">Customer</p>
                      <p className="font-semibold text-gray-900">
                        {selectedOrder.user?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedOrder.user?.email || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border rounded-lg p-4">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="font-bold text-gray-900">
                        ₹{Number(selectedOrder.totalPrice || 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                      <p className="text-xs text-gray-500">Payment</p>
                      <p className="font-semibold text-gray-900">
                        {selectedOrder.isPaid ? "Paid" : "Unpaid"}
                      </p>
                      {selectedOrder.paidAt && (
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(selectedOrder.paidAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="font-semibold text-gray-900">
                        {selectedOrder.status || "Processing"}
                      </p>
                      {selectedOrder.isDelivered && selectedOrder.deliveredAt && (
                        <p className="text-sm text-gray-600 mt-1">
                          Delivered:{" "}
                          {new Date(selectedOrder.deliveredAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      Shipping Address
                    </p>
                    <div className="text-sm text-gray-700">
                      <p>{selectedOrder.shippingAddress?.address || "—"}</p>
                      <p>
                        {[selectedOrder.shippingAddress?.city, selectedOrder.shippingAddress?.postalCode]
                          .filter(Boolean)
                          .join(" - ") || "—"}
                      </p>
                      <p>{selectedOrder.shippingAddress?.country || "—"}</p>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-sm font-semibold text-gray-900">
                        Items
                      </p>
                    </div>
                    <div className="divide-y">
                      {(selectedOrder.orderItems || []).map((item, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-3 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {item.product?.images?.[0] ? (
                              <img
                                src={item.product.images[0]}
                                alt={item.product?.name || "Product"}
                                className="w-12 h-12 rounded object-cover border"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded bg-gray-100 border" />
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.product?.name || "Product"}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {item.product?._id || ""}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm text-gray-900 font-semibold">
                              x{item.qty}
                            </p>
                            <p className="text-xs text-gray-500">
                              ₹{Number(item.product?.price || 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                      {(selectedOrder.orderItems || []).length === 0 && (
                        <div className="px-4 py-6 text-center text-gray-500">
                          No items found.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Order ID or User..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Order ID
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  User
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Date
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Total
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Payment
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      #{order.orderId || order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {order.user?.name || "Unknown"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {order.user?.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ₹{Number(order.totalPrice || 0).toFixed(2)}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status || 'Processing'}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-medium border-none focus:ring-2 focus:ring-offset-1 focus:ring-opacity-60 cursor-pointer ${getStatusColor(order.status || 'Processing')}`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => openOrderDetails(order._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="View order details"
                        title="View order details"
                      >
                        <FaEye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
