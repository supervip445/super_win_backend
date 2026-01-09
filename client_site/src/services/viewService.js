import api from './api';

export const viewService = {
  getViews: (viewableType, viewableId, limit = 100) => {
    return api.get('/admin/views', {
      params: {
        viewable_type: viewableType,
        viewable_id: viewableId,
        limit: limit,
      },
    });
  },
  getStats: (viewableType, viewableId) => {
    return api.get('/admin/views/stats', {
      params: {
        viewable_type: viewableType,
        viewable_id: viewableId,
      },
    });
  },
};

