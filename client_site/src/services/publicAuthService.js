import api from './api';

export const publicAuthService = {
  register: async (data) => {
    const response = await api.post('/public/register', data);
    if (response.data.token) {
      localStorage.setItem('public_token', response.data.token);
      localStorage.setItem('public_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/public/login', credentials);
    if (response.data.token) {
      localStorage.setItem('public_token', response.data.token);
      localStorage.setItem('public_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('public_token');
    localStorage.removeItem('public_user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('public_user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('public_token');
  },

  getProfile: async () => {
    const response = await api.get('/public/profile');
    return response.data;
  },
};

