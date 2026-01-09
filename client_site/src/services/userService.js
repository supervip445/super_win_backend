import api from './api';

export const userService = {
  getAll: () => api.get('/admin/users'),
  getTeachers: () => api.get('/admin/users?role=teacher'),
};

