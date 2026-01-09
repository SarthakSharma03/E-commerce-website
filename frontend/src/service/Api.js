const API_BASE_URL = "http://localhost:3000";
const AUTH_URL = `${API_BASE_URL}/auth`;
const PRODUCTS_URL = `${API_BASE_URL}/products`;
const ADMIN_URL = `${API_BASE_URL}/admin/products`;

const getToken = () => {
  try {
    return localStorage.getItem('auth_token') || '';
  } catch {
    return '';
  }
};

const authHeaders = () => {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

const authHeadersNoJSON = () => {
  const token = getToken();
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = "Something went wrong";
    try {
      const data = await response.json();
      errorMessage = data.error || data.message || errorMessage;
    } catch {
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }
  
  try {
    const data = await response.json();
    return data;
  } catch {
    return {};
  }
};

const Api = {
  login: async (email, password) => {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  registerUser: async (name, email, password) => {
    const response = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${AUTH_URL}/logout`, {
      method: "POST",
      headers: authHeaders(),
    });
    return handleResponse(response);
  },

  getMe: async () => {
    const response = await fetch(`${AUTH_URL}/me`, {
      method: "GET",
      headers: authHeaders(),
    });
    return handleResponse(response);
  },

  updateProfile: async (data) => {
    const response = await fetch(`${AUTH_URL}/profile`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updatePassword: async (currentPassword, newPassword) => {
    const payload = {
      currentPassword,
      newPassword,
      password: newPassword,
      confirmPassword: newPassword,
      current_password: currentPassword,
      new_password: newPassword,
      password_confirmation: newPassword
    };
    const response = await fetch(`${AUTH_URL}/password`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  sendOtp: async (email) => {
    const response = await fetch(`${API_BASE_URL}/otp/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  resetPasswordWithOtp: async (email, otp, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/otp/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    return handleResponse(response);
  },
 
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  payOrder: async (orderId, paymentResult) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/pay`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(paymentResult),
    });
    return handleResponse(response);
  },

  initiatePayment: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/initiate`, {
      method: "POST",
      headers: authHeaders(),
    });
    return handleResponse(response);
  },

  verifyPayment: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/verify`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ orderId }),
    });
    return handleResponse(response);
  },

  getMyOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders/myorders`, {
      method: "GET",
      headers: authHeaders(),
    });
    return handleResponse(response);
  },

  getOrderById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: "GET",
      headers: authHeaders(),
    });
    return handleResponse(response);
  },

  getProducts: async (params = {}, options = {}) => {
    const { signal, ...query } = params || {};
    const queryString = new URLSearchParams(query).toString();
    const url = queryString ? `${PRODUCTS_URL}?${queryString}` : PRODUCTS_URL;
    const response = await fetch(url, {
      method: "GET",
      signal: signal || options.signal,
    });
    return handleResponse(response);
  },

  getProductById: async (id, options = {}) => {
    const response = await fetch(`${PRODUCTS_URL}/${id}`, {
      method: "GET",
      signal: options.signal,
    });
    return handleResponse(response);
  },

  addProduct: async (productData) => {
    const isForm = typeof FormData !== "undefined" && productData instanceof FormData;
    const response = await fetch(ADMIN_URL, {
      method: "POST",
      headers: isForm ? authHeadersNoJSON() : authHeaders(),
      body: isForm ? productData : JSON.stringify(productData),
    });
    return handleResponse(response);
  },

  updateProduct: async (id, productData) => {
    const isForm = typeof FormData !== "undefined" && productData instanceof FormData;
    const response = await fetch(`${ADMIN_URL}/${id}`, {
      method: "PUT",
      headers: isForm ? authHeadersNoJSON() : authHeaders(),
      body: isForm ? productData : JSON.stringify(productData),
    });
    return handleResponse(response);
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${ADMIN_URL}/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return handleResponse(response);
  },
};

export default Api;
