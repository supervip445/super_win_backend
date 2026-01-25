import api from './api';

export const publicService = {
  // Posts
  getPosts: (params) => api.get('/public/posts', { params }),
  getPost: (id) => api.get(`/public/posts/${id}`),

  // Likes/Dislikes
  toggleLike: (data) => api.post('/public/likes/toggle', data),
  getLikeCounts: (params) => api.get('/public/likes/counts', { params }),

  // Comments
  getComments: (params) => api.get('/public/comments', { params }),
  addComment: (data) => api.post('/public/comments', data),

  // Banners
  getBanners: () => api.get('/public/banners'),
  getBannerTexts: () => api.get('/public/banner-texts'),

  // Pig Vaccines
  getPigVaccines: (params) => api.get('/public/pig-vaccines', { params }),
  getPigVaccine: (id) => api.get(`/public/pig-vaccines/${id}`),
  
  // Layer Vaccines
  getLayerVaccines: (params) => api.get('/public/layer-vaccines', { params }),
  getLayerVaccine: (id) => api.get(`/public/layer-vaccines/${id}`),
  
  // Products
  getProducts: (params) => api.get('/public/products', { params }),
  getProduct: (id) => api.get(`/public/products/${id}`),
};

