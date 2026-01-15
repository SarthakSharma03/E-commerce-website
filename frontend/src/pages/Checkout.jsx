import  { useState } from 'react';
import { useCart } from '../context/useCart';
import { useNavigate } from 'react-router-dom';
import Api from '../service/Api';
import AddressForm from '../components/checkout/AddressForm';
import OrderSummary from '../components/checkout/OrderSummary';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import CreditCardForm from '../components/checkout/CreditCardForm';
import { toast } from 'react-toastify';
import { CiCreditCard1, CiBank } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkoutSchema } from '../validation/checkoutValidation';

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
      paymentMethod: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: ''
    },
    mode: 'onChange'
  });

  const selectedPaymentMethod = watch('paymentMethod');

  const onSubmit = async (data) => {
    setLoading(true);

    const orderData = {
      orderItems: cartItems.map(item => ({
        qty: item.quantity,
        product: item._id || item.id
      })),
      shippingAddress: {
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country
      },
      paymentMethod: data.paymentMethod,
      itemsPrice: totalAmount,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: totalAmount
    };

    try {
      // 1. Create Order
      const response = await Api.createOrder(orderData);
      
      if (!response || (!response._id && !response.id)) {
        throw new Error('Failed to create order');
      }

      const orderId = response._id || response.id;
      clearCart();

      // 2. Handle Payment
      if (data.paymentMethod === 'Credit Card') {
         try {
            // Simulate Payment Delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const paymentResult = {
              id: `PAY-${Date.now()}`,
              status: 'COMPLETED',
              update_time: new Date().toISOString(),
              email_address: 'user@example.com',
            };
            
            await Api.payOrder(orderId, paymentResult);
            toast.success('Order placed and paid successfully!');
            navigate(`/order-success/${orderId}`); 
         } catch (payError) {
            console.error('Payment processing error:', payError);
            toast.error('Payment failed. Please retry.');
            navigate(`/payment?orderId=${orderId}&method=Credit%20Card`);
         }
      } else {
   
         navigate(`/payment?orderId=${orderId}&method=${encodeURIComponent(data.paymentMethod)}`);
      }

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-medium">Your Cart is Empty</h2>
        <button 
          onClick={() => navigate('/home')}
          className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <CheckoutSteps currentStep={selectedPaymentMethod === 'Credit Card' ? 2 : 1} />
      
      <div className="text-sm text-gray-500 mb-8">
        Home / Cart / <span className="text-black">Checkout</span>
      </div>
      <h2 className="text-3xl font-medium mb-8">Billing Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <AddressForm register={register} errors={errors} />
        </div>
        
        <div className="w-full lg:w-[400px]">
          <OrderSummary cartItems={cartItems} totalAmount={totalAmount} />
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Payment Method</h3>
            
            <div className="space-y-3">
               {/* Credit Card Option */}
               <label className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-all ${selectedPaymentMethod === 'Credit Card' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                 <div className="flex items-center gap-3">
                   <input 
                     type="radio" 
                     value="Credit Card"
                     {...register('paymentMethod')}
                     className="accent-black w-4 h-4"
                   />
                   <span className="font-medium">Credit Card</span>
                 </div>
                 <div className="flex gap-2 text-gray-500">
                    <CiCreditCard1 size={24} />
                 </div>
               </label>
               
               {/* Show Form inline if CC selected */}
               {selectedPaymentMethod === 'Credit Card' && (
                  <CreditCardForm register={register} errors={errors} />
               )}

               {/* Bank / UPI Option */}
               <label className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-all ${selectedPaymentMethod === 'UPI' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                 <div className="flex items-center gap-3">
                   <input 
                     type="radio" 
                     value="UPI"
                     {...register('paymentMethod')}
                     className="accent-black w-4 h-4"
                   />
                   <span className="font-medium">UPI / Net Banking</span>
                 </div>
                 <div className="flex gap-2 text-gray-500">
                    <CiBank size={24} />
                 </div>
               </label>

               {/* COD Option */}
               <label className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-all ${selectedPaymentMethod === 'Cash on Delivery' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                 <div className="flex items-center gap-3">
                   <input 
                     type="radio" 
                     value="Cash on Delivery"
                     {...register('paymentMethod')}
                     className="accent-black w-4 h-4"
                   />
                   <span className="font-medium">Cash on Delivery</span>
                 </div>
                 <div className="flex gap-2 text-gray-500">
                    <BsCashCoin size={24} />
                 </div>
               </label>
               {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white py-3 rounded mt-6 hover:bg-red-600 transition-colors disabled:opacity-50 font-medium cursor-pointer"
            >
              {loading ? 'Processing...' : (selectedPaymentMethod === 'Credit Card' ? 'Place Order' : 'Continue to Payment')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
