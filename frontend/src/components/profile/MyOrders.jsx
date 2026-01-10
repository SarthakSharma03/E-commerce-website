import { useEffect, useState } from 'react';
import Api from '../../service/Api';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Api.getMyOrders();
        // Check if response is an array or if data is nested
        if (Array.isArray(response)) {
             setOrders(response);
        } else if (response?.data && Array.isArray(response.data)) {
             setOrders(response.data);
        } else {
            // If response is just an object but not an array, check if it has orders property
            // or just set empty array
            setOrders([]);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center border border-gray-100 rounded-sm">
        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-4">Go explore our products and make your first purchase!</p>
        <button 
          onClick={() => navigate('/products')}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-red-500 mb-4">My Orders</h2>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id || order.orderId} className="border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-100 pb-4 mb-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium text-gray-900">#{order.orderId || order._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium text-gray-900">₹{order.totalPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 border border-gray-200 overflow-hidden">
                    <img 
                      src={item.image || '/placeholder.jpg'} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                 <div className="flex gap-4">
                     <span className={`text-xs px-2 py-1 rounded ${order.isPaid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                     </span>
                 </div>
                 {!order.isPaid && order.paymentMethod !== 'Cash on Delivery' && order.status !== 'Cancelled' && (
                     <button 
                        onClick={() => navigate(`/payment?orderId=${order.orderId || order._id}`)}
                        className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                     >
                        Pay Now
                     </button>
                 )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
