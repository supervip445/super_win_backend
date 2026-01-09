import api from './api';

export const pigVaccineService = {
  // Get all vaccines with pagination and search
  getAll: (params) => api.get('/admin/pig-vaccines', { params }),
  
  // Get single vaccine
  get: (id) => api.get(`/admin/pig-vaccines/${id}`),
  
  // Create new vaccine
  create: (data) => api.post('/admin/pig-vaccines', data),
  
  // Update vaccine
  update: (id, data) => api.put(`/admin/pig-vaccines/${id}`, data),
  
  // Delete vaccine
  delete: (id) => api.delete(`/admin/pig-vaccines/${id}`),
};

