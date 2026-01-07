import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { profileSchema } from '../../validation/profileValidation';
import Api from '../../service/Api';

const ProfileForm = ({ user, onUserUpdate }) => {
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      address: user.address || '',
      phone: user.phone || '',
    },
    resolver: yupResolver(profileSchema, undefined, { abortEarly: false }),
    mode: 'onChange',
    criteriaMode: 'all',
  });

  useEffect(() => {
    reset({
      name: user.name || '',
      email: user.email || '',
      address: user.address || '',
      phone: user.phone || '',
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    setMessage({ type: '', text: '' });
    setIsSubmitting(true);
    try {
      await Api.updateProfile(data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      onUserUpdate(data); 
      
      const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
      localStorage.setItem('user_info', JSON.stringify({ ...userInfo, ...data }));
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-10">
      <h2 className="text-xl font-medium text-red-500 mb-6">Edit Your Profile</h2>

      {message.text && (
        <div className={`p-4 mb-4 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label className="text-sm">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full bg-gray-100 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Name"
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ messages, message }) => {
              if (messages) {
                return (
                  <ul className="mt-1 text-xs text-red-600 space-y-1">
                    {Object.entries(messages).map(([type, msg]) => (
                      <li key={type}>{msg}</li>
                    ))}
                  </ul>
                );
              }
              return message ? <p className="text-xs text-red-600">{message}</p> : null;
            }}
          />
        </div>
        <div className="space-y-2">
           <label className="text-sm">Email</label>
           <input
            type="email"
            {...register('email')}
            className="w-full bg-gray-100 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Email"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ messages, message }) => {
              if (messages) {
                return (
                  <ul className="mt-1 text-xs text-red-600 space-y-1">
                    {Object.entries(messages).map(([type, msg]) => (
                      <li key={type}>{msg}</li>
                    ))}
                  </ul>
                );
              }
              return message ? <p className="text-xs text-red-600">{message}</p> : null;
            }}
          />
        </div>
         <div className="space-y-2">
          <label className="text-sm">Address</label>
          <input
            type="text"
            {...register('address')}
            className="w-full bg-gray-100 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Address"
          />
          <ErrorMessage
            errors={errors}
            name="address"
            render={({ messages, message }) => {
              if (messages) {
                return (
                  <ul className="mt-1 text-xs text-red-600 space-y-1">
                    {Object.entries(messages).map(([type, msg]) => (
                      <li key={type}>{msg}</li>
                    ))}
                  </ul>
                );
              }
              return message ? <p className="text-xs text-red-600">{message}</p> : null;
            }}
          />
        </div>
         <div className="space-y-2">
          <label className="text-sm">Phone</label>
          <input
            type="text"
            {...register('phone')}
            className="w-full bg-gray-100 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Phone"
          />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ messages, message }) => {
              if (messages) {
                return (
                  <ul className="mt-1 text-xs text-red-600 space-y-1">
                    {Object.entries(messages).map(([type, msg]) => (
                      <li key={type}>{msg}</li>
                    ))}
                  </ul>
                );
              }
              return message ? <p className="text-xs text-red-600">{message}</p> : null;
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
         <button type="button" className="text-gray-500 text-sm hover:text-black hover:cursor-pointer" onClick={() => reset()}>
           Cancel
         </button>
         <button type="submit" disabled={isSubmitting} className="bg-red-500 text-white px-8 py-3 rounded text-sm hover:bg-red-600 transition-colors disabled:opacity-70 hover:cursor-pointer">
           {isSubmitting ? 'Saving...' : 'Save Changes'}
         </button>
      </div>
    </form>
  );
};

export default ProfileForm;
