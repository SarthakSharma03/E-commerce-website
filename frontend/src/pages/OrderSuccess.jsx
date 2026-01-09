import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Api from '../service/Api';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState('loading');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
       
        const orderRes = await Api.getOrderById(id);
        
        if (orderRes) {
          setOrder(orderRes);
          
         
          if (orderRes.paymentMethod !== 'Cash on Delivery' && !orderRes.isPaid) {
             const uuid = orderRes.orderId;
             try {
                 const verifyRes = await Api.verifyPayment(uuid);
                 if (verifyRes && verifyRes.order && verifyRes.order.isPaid) {
                    setStatus('success');
                    setOrder(verifyRes.order);
                 } else {
                    setStatus('failed');
                 }
             } catch (verErr) {
                 console.error("Verification failed", verErr);
                 setStatus('failed');
             }
          } else {
        
             setStatus('success');
          }
        } else {
             setStatus('error');
        }
      } catch (error) {
        console.error('Order fetch error:', error);
        setStatus('error');
      }
    };

    if (id) {
        verify();
    }
  }, [id]);

  if (status === 'loading') {
      return (
          <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
      );
  }

  if (status === 'failed' || status === 'error') {
      return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 text-center">
             <FaTimesCircle className="text-red-500 text-6xl mb-6 mx-auto" />
             <h2 className="text-3xl font-medium mb-4">Payment Verification Failed</h2>
             <p className="text-gray-600 mb-8">
                We couldn't verify your payment. If you were charged, the amount will be refunded automatically.
             </p>
             <button 
                 onClick={() => navigate('/home')}
                 className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
               >
                 Go to Home
               </button>
        </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <CheckoutSteps currentStep={3} />
      
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-6" />
        <h2 className="text-3xl font-medium mb-4">Thank you for your order!</h2>
        <p className="text-gray-600 mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-gray-500 mb-8">
            Order ID: <span className="font-medium text-black">{order?.orderId || id}</span>
        </p>
        
        {order && (
            <div className="bg-gray-50 p-6 rounded-lg max-w-lg w-full mb-8 text-left">
                <h3 className="font-bold mb-4 border-b pb-2">Order Details</h3>
                <div className="space-y-2">
                    <p><span className="font-medium">Amount:</span> ₹{order.totalPrice}</p>
                    <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
                    <p><span className="font-medium">Status:</span> {order.isPaid ? 'Paid' : 'Pending Payment'}</p>
                    <div className="mt-4">
                        <span className="font-medium">Shipping to:</span>
                        <p className="text-sm text-gray-600 mt-1">
                            {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                        </p>
                    </div>
                </div>
            </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
           <button 
             onClick={() => navigate('/home')}
             className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
           >
             Continue Shopping
           </button>
           
           <button 
             onClick={() => navigate('/orders/myorders')} 
             className="border border-black text-black px-8 py-3 rounded hover:bg-gray-50 transition-colors"
           >
             View My Orders
           </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
