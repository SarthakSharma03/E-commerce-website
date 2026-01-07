import React from 'react';

const OrderSummary = ({ cartItems, totalAmount }) => {
  return (
    <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
      <h3 className="text-xl font-medium mb-4">Order Summary</h3>
      <div className="space-y-4 mb-4">
        {cartItems.map((item) => (
          <div key={item._id || item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={item.image || (item.images && item.images[0]) || '/placeholder.jpg'} 
                alt={item.name} 
                className="w-12 h-12 object-contain border border-gray-200 rounded"
                onError={(e) => { e.target.src = '/placeholder.jpg'; }}
              />
              <div>
                <p className="text-sm font-medium line-clamp-1 max-w-[150px]">{item.name || item.title}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-sm font-medium">${item.price * item.quantity}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${totalAmount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2">
          <span>Total</span>
          <span>${totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
