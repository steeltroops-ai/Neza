import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if we're in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token, redirect to login
          window.location.href = '/auth/login';
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Save the new tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token is invalid, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API service functions
const apiService = {
  // Auth
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  refreshToken: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
  getProfile: () => api.get('/auth/profile'),

  // Users
  getUser: (id: string) => api.get(`/users/${id}`),
  updateUser: (id: string, data: any) => api.patch(`/users/${id}`, data),

  // Services
  getServices: (params?: { categoryId?: string; search?: string }) => 
    api.get('/services', { params }),
  getService: (id: string) => api.get(`/services/${id}`),
  getServicesByProvider: (providerId: string) => 
    api.get(`/services/provider/${providerId}`),
  createService: (data: any) => api.post('/services', data),
  updateService: (id: string, data: any) => api.patch(`/services/${id}`, data),
  deleteService: (id: string) => api.delete(`/services/${id}`),

  // Bookings
  getBookings: () => api.get('/bookings'),
  getBooking: (id: string) => api.get(`/bookings/${id}`),
  createBooking: (data: any) => api.post('/bookings', data),
  updateBooking: (id: string, data: any) => api.patch(`/bookings/${id}`, data),
  cancelBooking: (id: string) => api.patch(`/bookings/${id}/cancel`),

  // Payments
  createPayment: (data: any) => api.post('/payments', data),
  getPayment: (id: string) => api.get(`/payments/${id}`),
};

export default apiService;