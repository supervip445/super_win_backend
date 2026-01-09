import axios from 'axios';
import BaseUrl from '../hooks/BaseUrl';

const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Accept': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    // Add admin token for admin routes
    if (config.url && config.url.includes('/admin/') && !config.url.includes('/admin/login')) {
      const token = localStorage.getItem('admin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // Add public user token for public protected routes
    if (config.url && (config.url.includes('/public/profile') || config.url.includes('/public/logout') || config.url.includes('/public/chat/'))) {
      const token = localStorage.getItem('public_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // Don't set Content-Type for FormData, let axios handle it
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

