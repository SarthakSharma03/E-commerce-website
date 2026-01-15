import { useEffect, useState } from 'react';
import Api from '../../service/Api';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaShoppingBag,
  FaChevronRight,
  FaCalendarAlt,
  FaMoneyBillWave,
} from 'react-icons/fa';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Api.getMyOrders();
       
        const orderData = Array.isArray(response)
          ? response
          : response?.data && Array.isArray(response.data)
          ? response.data
          : [];
        setOrders(orderData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
      case 'canceled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className="mr-1.5" />;
      case 'shipped':
        return <FaShippingFast className="mr-1.5" />;
      case 'cancelled':
      case 'canceled':
        return <FaTimesCircle className="mr-1.5" />;
      default:
        return <FaBoxOpen className="mr-1.5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <FaShoppingBag className="w-10 h-10 text-red-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't made any orders yet. Explore our collection!
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-red-600 text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <nav className="flex mb-8 text-sm text-gray-500">
        <NavLink to="/" className="hover:text-red-600 transition-colors">
          Home
        </NavLink>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">My Orders</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your recent purchases and delivery status
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.map((order) => {
          const orderItems = Array.isArray(order.orderItems) ? order.orderItems : [];
          const totalItems = orderItems.reduce((sum, item) => sum + (Number(item?.qty) || 0), 0);

          const itemsPrice =
            order.itemsPrice ||
            order.totalPrice - (Number(order.shippingPrice) || 0) - (Number(order.taxPrice) || 0) ||
            0;

          const status = order.status || 'Pending';

          const rawOrderId =
            (order.orderId && String(order.orderId)) ||
            (order._id && String(order._id)) ||
            '';
          const displayOrderId =
            rawOrderId.length > 20 ? `${rawOrderId.slice(0, 16)}...` : rawOrderId;

          return (
            <div
              key={order._id || order.orderId || Math.random().toString(36).slice(2)}
              className="relative flex flex-col bg-white/90 border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5 hover:scale-[1.01] backdrop-blur-sm"
            >
              <div className="bg-gray-200 px-6 py-4 flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div className="flex items-center text-gray-900 font-semibold max-w-xs md:max-w-sm overflow-hidden">
                    <span className="text-gray-500 font-normal mr-2 whitespace-nowrap">OrderId:</span>
                    <span className="truncate">
                      #{displayOrderId || '—'}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '—'}
                  </div>
                </div>

                <div
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px]  font-medium border ${getStatusColor(
                    status
                  )} whitespace-nowrap`}
                >
                  {getStatusIcon(status)}
                  {status}
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                          Order details
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          {totalItems} {totalItems === 1 ? 'item' : 'items'} •{' '}
                          {status}
                        </p>
                      </div>
                    </div>

                    {orderItems.length > 0 ? (
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">
                          Items in this order
                        </p>
                        <div className="flex gap-3 overflow-x-auto pb-3 ">
                          {orderItems.map((item, idx) => {
                            const product = item.product || {};
                            const image =
                              (Array.isArray(product.images) && product.images[0]) ||
                              product.image ||
                              '/placeholder.jpg';
                            const name = product.name || item.name || 'Product';

                            return (
                              <div
                                key={item._id || item.product?._id || idx}
                                className="min-w-35 max-w-40  relative overflow-hidden  rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow shrink-0 snap-start "
                              >
                                <div className="w-full h-28 bg-gray-50 flex items-center justify-center overflow-hidden">
                                  <img  
                                    src={image}
                                    alt={name}
                                    className="max-h-full object-contain group-hover:scale-105 transition-transform"
                                    onError={(e) => (e.target.src = '/placeholder.jpg')}
                                  />
                                </div>
                                <div className="px-3 py-2 border-t border-gray-100">
                                  <p className="text-xs font-medium text-gray-900 line-clamp-2">
                                    {name}
                                  </p>
                                  <p className="text-[11px] text-gray-500 mt-1">
                                    Qty: {item.qty || 1}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-4">No items found in this order</p>
                    )}
                  </div>

                  <div className="lg:w-72 flex flex-col justify-between pt-4 lg:pt-0 lg:border-l lg:border-gray-100 lg:pl-8">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Payment</span>
                        <span className="flex items-center text-xs text-gray-700">
                          <FaMoneyBillWave className="mr-1 text-green-500" />
                          {order.paymentMethod || 'Unknown'}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Items Subtotal</span>
                        <span>₹{itemsPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className={order.shippingPrice > 0 ? '' : 'text-green-600'}>
                          {order.shippingPrice > 0 ? `₹${order.shippingPrice}` : 'Free'}
                        </span>
                      </div>
                      {(order.taxPrice || 0) > 0 && (
                        <div className="flex justify-between text-gray-600">
                          <span>Tax</span>
                          <span>₹{Number(order.taxPrice).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-lg">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-red-600">
                          ₹{(Number(order.totalPrice) || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
