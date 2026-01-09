import api from './api';

export const publicService = {
  // Posts
  getPosts: () => api.get('/public/posts'),
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
};

