import api from './api';

export const layerVaccineService = {
  // Get all vaccines with pagination and search
  getAll: (params) => api.get('/admin/layer-vaccines', { params }),
  
  // Get single vaccine
  get: (id) => api.get(`/admin/layer-vaccines/${id}`),
  
  // Create new vaccine
  create: (data) => api.post('/admin/layer-vaccines', data),
  
  // Update vaccine
  update: (id, data) => api.put(`/admin/layer-vaccines/${id}`, data),
  
  // Delete vaccine
  delete: (id) => api.delete(`/admin/layer-vaccines/${id}`),
};

