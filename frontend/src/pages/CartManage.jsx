import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const CartManage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <h2 className="text-2xl font-medium text-center">Your Cart is Empty</h2>
        <Link to="/home" className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      
    
      <div className="text-sm text-gray-500 mb-6">
        <NavLink to="/home" className="hover:underline">Home</NavLink> / <span className="text-black">Cart</span>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Cart Table */}
        <div className="lg:col-span-2 overflow-x-auto">
          <table className="w-full border-collapse min-w-160">
            <thead>
              <tr className="h-16 shadow-sm text-left">
                <th className="pl-4">Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th className="text-right pr-4">Subtotal</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {cartItems.map((item) => (
                <tr key={item._id || item.id} className="h-24 hover:bg-gray-50">
                  <td className="pl-4">
                    <div className="flex items-center gap-4 relative">
                      <button
                        onClick={() => removeFromCart(item._id || item.id)}
                        className="absolute -left-2 -top-2 bg-red-500 text-white rounded-full p-1 opacity-0 hover:opacity-100"
                      >
                        <RxCross2 size={12} />
                      </button>

                      <img
                        src={item.image || item.images?.[0] || '/placeholder.jpg'}
                        className="w-12 h-12 object-contain"
                        alt={item.title}
                      />

                      <span className="text-sm line-clamp-1">{item.title || item.name}</span>
                    </div>
                  </td>

                  <td>${item.price}</td>

                  <td>
                    <div className="inline-flex items-center border rounded px-2 py-1 gap-3">
                      <span>{item.quantity}</span>
                      <div className="flex flex-col cursor-pointer hover:text-red-500">
                        <button onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}>
                          <IoIosArrowUp size={12} />
                        </button>
                        <button
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                        >
                          <IoIosArrowDown size={12} />
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="text-right pr-4 font-medium">
                    ${item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link to="/home" className="border px-6 py-3 rounded hover:bg-gray-50">
              Return To Shop
            </Link>
            <button className="border px-6 py-3 rounded hover:bg-gray-50">
              Update Cart
            </button>
          </div>
        </div>

        {/* Cart Total */}
        <div className="border border-black rounded p-6 h-fit">
          <h3 className="text-lg font-medium mb-6">Cart Total</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between border-b pb-3">
              <span>Subtotal</span>
              <span>${totalAmount}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartManage;
