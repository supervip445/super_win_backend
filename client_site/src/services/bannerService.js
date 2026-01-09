import api from './api';

export const bannerService = {
  getAll: () => api.get('/admin/banners'),
  getById: (id) => api.get(`/admin/banners/${id}`),
  create: (data) => {
    const formData = new FormData();
    formData.append('image', data.image);
    // Only append order if it's a valid number, otherwise let backend use default
    if (data.order !== undefined && data.order !== null && data.order !== '') {
      formData.append('order', parseInt(data.order) || 0);
    }
    // Convert boolean to string '1' or '0' for FormData
    if (data.is_active !== undefined) {
      formData.append('is_active', data.is_active ? '1' : '0');
    }
    return api.post('/admin/banners', formData);
  },
  update: (id, data) => {
    const formData = new FormData();
    if (data.image) formData.append('image', data.image);
    // Only append order if it's a valid number
    if (data.order !== undefined && data.order !== null && data.order !== '') {
      formData.append('order', parseInt(data.order) || 0);
    }
    // Convert boolean to string '1' or '0' for FormData
    if (data.is_active !== undefined) {
      formData.append('is_active', data.is_active ? '1' : '0');
    }
    formData.append('_method', 'PUT');
    return api.post(`/admin/banners/${id}`, formData);
  },
  delete: (id) => api.delete(`/admin/banners/${id}`),
};

export const bannerTextService = {
  getAll: () => api.get('/admin/banner-texts'),
  getById: (id) => api.get(`/admin/banner-texts/${id}`),
  create: (data) => api.post('/admin/banner-texts', data),
  update: (id, data) => api.put(`/admin/banner-texts/${id}`, data),
  delete: (id) => api.delete(`/admin/banner-texts/${id}`),
};

