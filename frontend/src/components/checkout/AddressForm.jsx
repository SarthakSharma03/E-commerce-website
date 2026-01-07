
const AddressForm = ({ register, errors }) => {
  return (
    <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
      <h3 className="text-xl font-medium mb-4">Shipping Address</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Address</label>
          <input
            type="text"
            {...register('address')}
            className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 focus:outline-none focus:border-black`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">City</label>
            <input
              type="text"
              {...register('city')}
              className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 focus:outline-none focus:border-black`}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Postal Code</label>
            <input
              type="text"
              {...register('postalCode')}
              className={`w-full border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 focus:outline-none focus:border-black`}
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Country</label>
          <input
            type="text"
            {...register('country')}
            className={`w-full border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 focus:outline-none focus:border-black`}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
