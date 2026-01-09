import api from './api';

export const contactService = {
  getAll: (params) => api.get('/admin/contacts', { params }),
  getById: (id) => api.get(`/admin/contacts/${id}`),
  create: (data) => api.post('/admin/contacts', data),
  update: (id, data) => api.put(`/admin/contacts/${id}`, data),
  delete: (id) => api.delete(`/admin/contacts/${id}`),
  markAsRead: (id) => api.post(`/admin/contacts/${id}/read`),
};

export const publicContactService = {
  submit: (data) => api.post('/public/contact', data),
};

