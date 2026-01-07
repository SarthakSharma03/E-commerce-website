import React from 'react';

const CreditCardForm = ({ register, errors }) => {
  
  const handleCardNumberChange = (e, onChange) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 16);
    e.target.value = value;
    onChange(e);
  };

  const handleExpiryChange = (e, onChange) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    e.target.value = value;
    onChange(e);
  };

  const handleCvvChange = (e, onChange) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 3);
    e.target.value = value;
    onChange(e);
  };

  return (
    <div className="mt-4 p-6 border border-gray-200 rounded-lg bg-gray-50 animate-fadeIn">
      <h4 className="font-medium mb-4 text-sm uppercase tracking-wider text-gray-700">Credit Card Details</h4>
      
      <div className="space-y-4">
        <div>
          {(() => {
            const { onChange, ...rest } = register('cardNumber');
            return (
              <input
                type="text"
                placeholder="Card Number (16 digits)"
                {...rest}
                onChange={(e) => handleCardNumberChange(e, onChange)}
                className={`w-full p-3 border rounded outline-none transition-colors ${errors.cardNumber ? 'border-red-500' : 'border-gray-300 focus:border-black'}`}
              />
            );
          })()}
          {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber.message}</p>}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
             {(() => {
                const { onChange, ...rest } = register('expiry');
                return (
                  <input
                    type="text"
                    placeholder="MM/YY"
                    {...rest}
                    onChange={(e) => handleExpiryChange(e, onChange)}
                    className={`w-full p-3 border rounded outline-none transition-colors ${errors.expiry ? 'border-red-500' : 'border-gray-300 focus:border-black'}`}
                  />
                );
             })()}
             {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry.message}</p>}
          </div>
          <div className="flex-1">
             {(() => {
                const { onChange, ...rest } = register('cvv');
                return (
                  <input
                    type="text"
                    placeholder="CVV"
                    {...rest}
                    onChange={(e) => handleCvvChange(e, onChange)}
                    className={`w-full p-3 border rounded outline-none transition-colors ${errors.cvv ? 'border-red-500' : 'border-gray-300 focus:border-black'}`}
                  />
                );
             })()}
             {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv.message}</p>}
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Cardholder Name"
            {...register('name')}
            className={`w-full p-3 border rounded outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-black'}`}
          />
           {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
