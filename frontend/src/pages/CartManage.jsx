import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const CartManage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-medium">Your Cart is Empty</h2>
        <Link to="/home" className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="text-sm text-gray-500 mb-10">
        Home / <span className="text-black">Cart</span>
      </div>

      <div className="overflow-x-auto gap-6 mb-10">
        <table className="w-[50%]  border-collapse">
          <thead>
            <tr className="shadow-sm h-16  text-left">
              <th className="pl-4 font-medium w-1/3">Product</th>
              <th className="font-medium w-1/6">Price</th>
              <th className="font-medium w-1/6">Quantity</th>
              <th className="font-medium w-1/6 text-right pr-4">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <tr key={item._id || item.id} className="h-24 group hover:bg-gray-50 transition-colors">
                <td className="pl-4 align-middle">
                  <div className="flex items-center gap-4 relative">
                    <button 
                      onClick={() => removeFromCart(item._id || item.id)}
                      className="absolute -left-2 -top-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <RxCross2 size={12} />
                    </button>
                    <img 
                      src={item.image || (item.images && item.images[0]) || '/placeholder.jpg'} 
                      alt={item.name || item.title} 
                      className="w-12 h-12 object-contain"
                      onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                    />
                    <span className="text-sm line-clamp-1 pr-4">{item.name || item.title}</span>
                  </div>
                </td>
                <td className="align-middle">${item.price}</td>
                <td className="align-middle">
                  <div className="inline-flex items-center border border-gray-300 rounded px-2 py-1 gap-3">
                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                    <div className="flex flex-col gap-0.5">
                      <button 
                        onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                        className="hover:text-red-500"
                      >
                        <IoIosArrowUp size={12} />
                      </button>
                      <button 
                        onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                      
                        className="hover:text-red-500 disabled:opacity-30"
                      >
                        <IoIosArrowDown size={12} />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-right pr-4 font-medium">
                  ${item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row  gap-15 mb-16">
        <Link to="/home" className="border border-gray-300 px-8 py-3 rounded font-medium hover:bg-gray-50 w-fit">
          Return To Shop
        </Link>
        <button className="border border-gray-300 px-8 py-3 rounded font-medium hover:bg-gray-50 w-fit">
          Update Cart
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-10">
    
        <div className="flex flex-wrap gap-4 h-fit md:w-1/2">
          <input 
            type="text" 
            placeholder="Coupon Code" 
            className="border border-gray-300 rounded px-4 py-3 flex-1 min-w-50 focus:outline-none focus:border-black"
          />
          <button className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors">
            Apply Coupon
          </button>
        </div>

      
        <div className="border border-black rounded p-6 absolute top-50 right-20 md:w-1/3">
          <h3 className="font-medium text-lg mb-6">Cart Total</h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between pb-4 border-b border-gray-200">
              <span>Subtotal:</span>
              <span>${totalAmount}</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-gray-200">
              <span>Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span>${totalAmount}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition-colors"
          >
            Process to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartManage;
