import  { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Api from '../service/Api';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import { CiBank } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    if (window.Cashfree) {
      setCashfree(new window.Cashfree({ mode: "sandbox" }));
    }
  }, []);

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
    
    if (order?.paymentMethod === 'Cash on Delivery') {
      setTimeout(() => {
          toast.success('Order confirmed! Pay on delivery.');
        
          navigate(`/order-success/${order._id}`); 
      }, 1000);
      return;
    }
   
  
    if (!cashfree) {
        toast.error("Cashfree SDK not loaded");
        setProcessing(false);
        return;
    }

    try {
        const res = await Api.initiatePayment(orderId);
        
        if (res && res.payment_session_id) {
            cashfree.checkout({
                paymentSessionId: res.payment_session_id,
                redirectTarget: "_self",
            });
        } else {
            toast.error("Failed to initiate payment");
            setProcessing(false);
        }
    } catch (error) {
        console.error("Payment initiation error:", error);
        toast.error(error.message || "Payment initiation failed");
        setProcessing(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <CheckoutSteps currentStep={2} />
      
      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Order Summary</h3>
            <span className="text-xl font-bold">₹{order?.totalPrice}</span>
          </div>
          
          <div className="space-y-4">
            <div className={`p-4 border rounded-lg cursor-pointer flex items-center justify-between ${order?.paymentMethod === 'Online' ? 'border-green-500 bg-green-50' : ''}`}>
               <div className="flex items-center gap-3">
                 <CiBank size={24} />
                 <span className="font-medium">Online Payment (Cashfree)</span>
               </div>
               {order?.paymentMethod !== 'Cash on Delivery' && <div className="w-4 h-4 rounded-full bg-green-500"></div>}
            </div>

            <div className={`p-4 border rounded-lg cursor-pointer flex items-center justify-between ${order?.paymentMethod === 'Cash on Delivery' ? 'border-green-500 bg-green-50' : ''}`}>
               <div className="flex items-center gap-3">
                 <BsCashCoin size={24} />
                 <span className="font-medium">Cash on Delivery</span>
               </div>
               {order?.paymentMethod === 'Cash on Delivery' && <div className="w-4 h-4 rounded-full bg-green-500"></div>}
            </div>
          </div>
        </div>

        <button 
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-black text-white py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {processing ? 'Processing...' : `Pay ₹${order?.totalPrice}`}
        </button>
      </div>
    </div>
  );
};

export default Payment;
