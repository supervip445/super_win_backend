import { useState, useEffect } from 'react';
import { bannerTextService } from '../../services/bannerService';

const BannerTexts = () => {
  const [bannerTexts, setBannerTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBannerText, setEditingBannerText] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    is_active: true,
  });

  useEffect(() => {
    fetchBannerTexts();
  }, []);

  const fetchBannerTexts = async () => {
    try {
      const response = await bannerTextService.getAll();
      setBannerTexts(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching banner texts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBannerText) {
        await bannerTextService.update(editingBannerText.id, formData);
      } else {
        await bannerTextService.create(formData);
      }
      setShowModal(false);
      resetForm();
      fetchBannerTexts();
    } catch (error) {
      console.error('Error saving banner text:', error);
      alert('Error saving banner text');
    }
  };

  const handleEdit = (bannerText) => {
    setEditingBannerText(bannerText);
    setFormData({
      text: bannerText.text || '',
      is_active: bannerText.is_active !== undefined ? bannerText.is_active : true,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner text?')) return;
    try {
      await bannerTextService.delete(id);
      fetchBannerTexts();
    } catch (error) {
      console.error('Error deleting banner text:', error);
      alert('Error deleting banner text');
    }
  };

  const resetForm = () => {
    setFormData({
      text: '',
      is_active: true,
    });
    setEditingBannerText(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Banner Texts</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          + Add New Banner Text
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Text</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bannerTexts.map((bannerText) => (
              <tr key={bannerText.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md truncate">{bannerText.text}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      bannerText.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {bannerText.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(bannerText)}
                    className="text-amber-600 hover:text-amber-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(bannerText.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingBannerText ? 'Edit Banner Text' : 'Create New Banner Text'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter banner text for marquee..."
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700"
                >
                  {editingBannerText ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerTexts;

