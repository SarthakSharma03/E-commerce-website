
import { useNavigate, useParams } from 'react-router-dom';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <CheckoutSteps currentStep={3} />
      
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-6" />
        <h2 className="text-3xl font-medium mb-4">Thank you for your order!</h2>
        <p className="text-gray-600 mb-8">
          Your order has been placed successfully. Order ID: <span className="font-medium text-black">{id}</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
           <button 
             onClick={() => navigate('/home')}
             className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors"
           >
             Continue Shopping
           </button>
           
         
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
