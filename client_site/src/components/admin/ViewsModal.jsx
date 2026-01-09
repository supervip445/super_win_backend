import { useState, useEffect } from 'react';
import { viewService } from '../../services/viewService';

const ViewsModal = ({ isOpen, onClose, viewableType, viewableId }) => {
  const [viewsData, setViewsData] = useState({ views: [], stats: null, loading: false });

  useEffect(() => {
    if (isOpen && viewableType && viewableId) {
      fetchViews();
    }
  }, [isOpen, viewableType, viewableId]);

  const fetchViews = async () => {
    setViewsData({ views: [], stats: null, loading: true });
    try {
      const response = await viewService.getViews(viewableType, viewableId);
      setViewsData({
        views: response.data?.data || [],
        stats: response.data?.stats || null,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching views:', error);
      setViewsData({ views: [], stats: null, loading: false });
      alert('Error loading view data');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">View Statistics & IP Addresses</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {viewsData.loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Statistics */}
            {viewsData.stats && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Total Views</div>
                  <div className="text-2xl font-bold text-blue-600">{viewsData.stats.total_views || 0}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Unique IPs</div>
                  <div className="text-2xl font-bold text-green-600">{viewsData.stats.unique_ips || 0}</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Views (24h)</div>
                  <div className="text-2xl font-bold text-amber-600">{viewsData.stats.recent_views_24h || 0}</div>
                </div>
              </div>
            )}

            {/* IP Addresses Table */}
            <div>
              <h3 className="text-lg font-semibold mb-4">IP Addresses</h3>
              {viewsData.views.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No views recorded yet</div>
              ) : (
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">IP Address</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">User Agent</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {viewsData.views.map((view) => (
                        <tr key={view.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-mono text-gray-900">{view.ip_address}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs" title={view.user_agent || 'N/A'}>
                            {view.user_agent || 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {view.created_at ? new Date(view.created_at).toLocaleString() : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewsModal;

