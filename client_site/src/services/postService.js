import api from './api';

export const postService = {
  getAll: (params) => api.get('/admin/posts', { params }),
  getById: (id) => api.get(`/admin/posts/${id}`),
  create: (data) => api.post('/admin/posts', data),
  update: (id, data) => {
    // For FormData with PUT, ensure proper method handling
    if (data instanceof FormData) {
      // Laravel may need _method for FormData PUT requests
      data.append('_method', 'PUT');
      return api.post(`/admin/posts/${id}`, data);
    }
    return api.put(`/admin/posts/${id}`, data);
  },
  delete: (id) => api.delete(`/admin/posts/${id}`),
};

