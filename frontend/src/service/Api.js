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

  // Product Endpoints
  getProducts: async (params = {}) => {
    const { signal, ...query } = params;
    return await axiosInstance.get('/products', { 
      params: query,
      signal 
    });
  },

  getProductById: async (id, config = {}) => {
    return await axiosInstance.get(`/products/${id}`, {
      signal: config.signal
    });
  },

  // Admin Product Endpoints
  addProduct: async (productData) => {
   
    return await axiosInstance.post('/admin/products', productData);
  },

  updateProduct: async (id, productData) => {
   
    return await axiosInstance.put(`/admin/products/${id}`, productData);
  },

  deleteProduct: async (id) => {
    return await axiosInstance.delete(`/admin/products/${id}`);
  },

  // Wishlist Endpoints
  addToWishlist: async (productId) => {
    return await axiosInstance.post('/wishlist', { productId });
  },

  removeFromWishlist: async (productId) => {
    return await axiosInstance.delete(`/wishlist/${productId}`);
  },

  getWishlist: async () => {
    return await axiosInstance.get('/wishlist');
  },
};

export default Api;
