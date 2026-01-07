import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Api from '../service/Api';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import CreditCardForm from '../components/checkout/CreditCardForm';
import { CiBank } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  // State for Credit Card Form if needed (fallback)
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!orderId) {
      toast.error('No order ID found');
      navigate('/home');
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await Api.getOrderById(orderId);
        if (res) {
          setOrder(res);
        }
      } catch (error) {
        console.error('Fetch order error:', error);
        toast.error('Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  const handlePayment = async () => {
    setProcessing(true);
    
    // For Cash on Delivery, we don't need to process a payment transaction
    if (order?.paymentMethod === 'Cash on Delivery') {
      setTimeout(() => {
          toast.success('Order confirmed! Pay on delivery.');
          navigate(`/order-success/${orderId}`);
      }, 1000);
      return;
    }
   
    if (order?.paymentMethod === 'Credit Card') {
      const newErrors = {};
      if (!cardData.cardNumber) newErrors.cardNumber = "Card number is required";
      if (!cardData.expiry) newErrors.expiry = "Expiry is required";
      if (!cardData.cvv) newErrors.cvv = "CVV is required";
      if (!cardData.name) newErrors.name = "Name is required";

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        setProcessing(false);
        return;
      }
    }
   
    // Simulate Payment Processing for UPI / Card
    setTimeout(async () => {
      try {
        const paymentResult = {
          id: `PAY-${Date.now()}`,
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: order?.user?.email || 'user@example.com',
        };

        const res = await Api.payOrder(orderId, paymentResult);
        if (res && res.isPaid) {
          toast.success('Payment Successful!');
          navigate(`/order-success/${orderId}`); 
        } else {
          toast.error('Payment verification failed');
        }
      } catch (error) {
        console.error('Payment error:', error);
        toast.error(error.message || 'Payment failed');
      } finally {
        setProcessing(false);
      }
    }, 2000);
  };

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  }

  if (!order) {
    return <div className="min-h-[50vh] flex items-center justify-center">Order not found</div>;
  }

  const paymentMethod = order.paymentMethod;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <CheckoutSteps currentStep={2} />

      <div className="text-sm text-gray-500 mb-8">
        Home / Checkout / <span className="text-black">Payment</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
           <h2 className="text-2xl font-medium mb-6">Make Payment</h2>
           <div className="bg-gray-50 p-6 rounded border border-gray-200">
             
             {/* Dynamic Content based on Payment Method */}
             {paymentMethod === 'Credit Card' && (
               <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Credit Card</span>
                  </div>
                  <CreditCardForm cardData={cardData} setCardData={setCardData} errors={errors} />
               </div>
             )}

             {paymentMethod === 'UPI' && (
               <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                     <CiBank size={48} className="text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">UPI Payment</h3>
                  <p className="text-gray-500 mb-6">Scan the QR code to pay</p>
                  
                  <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-300 mx-auto flex items-center justify-center mb-6">
                     <span className="text-gray-400 font-medium">QR CODE</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Use any UPI app to complete the payment
                  </div>
               </div>
             )}

             {paymentMethod === 'Cash on Delivery' && (
               <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                     <BsCashCoin size={48} className="text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Cash on Delivery</h3>
                  <p className="text-gray-500 mb-6">
                    Please verify your order details below before confirming.
                    You will pay ${order.totalPrice} upon delivery.
                  </p>
               </div>
             )}

             {/* Fallback for unknown methods */}
             {!['Credit Card', 'UPI', 'Cash on Delivery'].includes(paymentMethod) && (
                <div className="text-center py-8">
                   <p>Payment Method: {paymentMethod}</p>
                </div>
             )}

           </div>
        </div>

        <div>
           <h2 className="text-2xl font-medium mb-6">Order Summary</h2>
           <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <div className="space-y-4 mb-4">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-10 h-10 object-contain"
                            onError={(e) => { e.target.src = '/placeholder.jpg'; }} 
                        />
                        <span className="text-sm line-clamp-1 max-w-[150px]">{item.name}</span>
                     </div>
                     <span className="text-sm">${item.price} x {item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                 <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${order.itemsPrice}</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${order.shippingPrice === 0 ? 'Free' : `$${order.shippingPrice}`}</span>
                 </div>
                 <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total:</span>
                    <span>${order.totalPrice}</span>
                 </div>
              </div>
              
              <button
                onClick={handlePayment}
                disabled={processing || order.isPaid}
                className="w-full mt-6 bg-red-500 text-white py-3 rounded hover:bg-red-600 transition-colors disabled:opacity-50 font-medium"
              >
                {processing ? 'Processing...' : (
                    order.isPaid ? 'Paid' : (paymentMethod === 'Cash on Delivery' ? 'Confirm Order' : 'Pay Now')
                )}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
