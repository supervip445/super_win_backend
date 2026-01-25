import api from './api';

export const productService = {
  // Get all products with pagination and search
  getAll: (params) => api.get('/admin/products', { params }),
  
  // Get single product
  getById: (id) => api.get(`/admin/products/${id}`),
  
  // Create new product
  create: (data) => {
    // For FormData with images
    if (data instanceof FormData) {
      return api.post('/admin/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    return api.post('/admin/products', data);
  },
  
  // Update product
  update: (id, data) => {
    // For FormData with images
    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      return api.post(`/admin/products/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    return api.put(`/admin/products/${id}`, data);
  },
  
  // Delete product
  delete: (id) => api.delete(`/admin/products/${id}`),
};

