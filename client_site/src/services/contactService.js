import api from './api';

export const contactService = {
  getAll: () => api.get('/admin/contacts'),
  getById: (id) => api.get(`/admin/contacts/${id}`),
  update: (id, data) => api.put(`/admin/contacts/${id}`, data),
  delete: (id) => api.delete(`/admin/contacts/${id}`),
  markAsRead: (id) => api.post(`/admin/contacts/${id}/read`),
};

