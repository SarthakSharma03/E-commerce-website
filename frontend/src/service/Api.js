import axios from 'axios';

const API_BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,

});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let errorMessage = "Something went wrong";
    if (error.response) {
     
      const data = error.response.data;
      errorMessage = data.error || data.message || errorMessage;
    } else if (error.request) {
     
      errorMessage = "No response from server";
    } else {
          errorMessage = error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
);

const Api = {
  // Auth Endpoints
  login: async (email, password) => {
    return await axiosInstance.post('/auth/login', { email, password });
  },

  registerUser: async (name, email, password) => {
    return await axiosInstance.post('/auth/register', { name, email, password });
  },

  registerAdmin: async (name, email, password) => {
    return await axiosInstance.post('/auth/register', { name, email, password, role: 'admin' });
  },

  logout: async () => {
    return await axiosInstance.post('/auth/logout');
  },

  getMe: async () => {
    return await axiosInstance.get('/auth/me');
  },

  updateProfile: async (data) => {
    return await axiosInstance.put('/auth/profile', data);
  },

  updatePassword: async (currentPassword, newPassword) => {
    const payload = {
      currentPassword,
      newPassword,
      password: newPassword,
      confirmPassword: newPassword,
    };
    return await axiosInstance.put('/auth/password', payload);
  },

  // OTP Endpoints
  sendOtp: async (email) => {
    return await axiosInstance.post('/otp/send', { email });
  },

  resetPasswordWithOtp: async (email, otp, newPassword) => {
    return await axiosInstance.post('/otp/reset-password', { email, otp, newPassword });
  },

  // Order Endpoints
  createOrder: async (orderData) => {
    return await axiosInstance.post('/orders', orderData);
  },

  getAllOrders: async () => {
    return await axiosInstance.get('/orders');
  },

  updateOrderStatus: async (orderId, status) => {
    return await axiosInstance.put(`/orders/${orderId}/status`, { status });
  },

  payOrder: async (orderId, paymentResult) => {
    return await axiosInstance.put(`/orders/${orderId}/pay`, paymentResult);
  },

  initiatePayment: async (orderId) => {
    return await axiosInstance.post(`/orders/${orderId}/initiate`);
  },

  verifyPayment: async (orderId) => {
    return await axiosInstance.post('/orders/verify', { orderId });
  },

  getMyOrders: async () => {
    return await axiosInstance.get('/orders/myorders');
  },

  getOrderById: async (id) => {
    return await axiosInstance.get(`/orders/${id}`);
  },

  // Wishlist Endpoints
  addToWishlist: async (productId) => {
    return await axiosInstance.post('/wishlist', { productId });
  },

  removeFromWishlist: async (productId) => {
    return await axiosInstance.delete(`/wishlist/${productId}`);
  },

  clearWishlist: async () => {
    return await axiosInstance.delete('/wishlist');
  },

  getWishlist: async () => {
    return await axiosInstance.get('/wishlist');
  },

  // Admin Product Endpoints
  createProduct: async (formData) => {
    return await axiosInstance.post('/admin/products', formData);
  },

  updateProduct: async (id, formData) => {
    return await axiosInstance.put(`/admin/products/${id}`, formData);
  },

  deleteProduct: async (id) => {
    return await axiosInstance.delete(`/admin/products/${id}`);
  },

  getProducts: async (params) => {
    return await axiosInstance.get('/products', { params });
  },
  
  getProductById: async (id) => {
    return await axiosInstance.get(`/products/${id}`);
  },

  getAdminProductById: async (id) => {
    return await axiosInstance.get(`/admin/products/${id}`);
  },

  getDashboardStats: async () => {
    return await axiosInstance.get('/admin/products/stats');
  },

  checkPincode: async (pincode) => {
    return await axiosInstance.post('/pincode/check', { pincode });
  },

  rateProduct: async (id, rating) => {
    return await axiosInstance.post(`/products/${id}/rate`, { rating });
  },
  // Contact Us Endpoint
  contactUs: async (data) => {
    return await axiosInstance.post('/contact', data);
  },
  
  // Admin Contact Messages
  getContacts: async () => {
    return await axiosInstance.get('/contact');
  },
  
  updateContactStatus: async (id, status) => {
    return await axiosInstance.put(`/contact/${id}/status`, { status });
  },

  // Pincode Endpoint
  checkPincode: async (pincode) => {
    return await axiosInstance.post('/pincode/check', { pincode });
  },

  // Admin Pincode Management
  getAllPincodes: async (params) => {
    return await axiosInstance.get('/pincode/admin/all', { params });
  },

  updatePincodeDeliverable: async (id, isDeliverable) => {
    return await axiosInstance.put(`/pincode/admin/${id}/deliverable`, { isDeliverable });
  },

  getPincodeStats: async () => {
    return await axiosInstance.get('/pincode/admin/stats');
  },
};

export default Api;
