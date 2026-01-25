import { useState, useEffect } from 'react';
import { layerVaccineService } from '../../services/layerVaccineService';

const LayerVaccines = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    disease_en: '',
    vaccine_type_en: '',
    name_mm: '',
    target_stages: '',
  });

  useEffect(() => {
    fetchVaccines();
  }, [currentPage, searchTerm]);

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        per_page: 20,
        ...(searchTerm && { search: searchTerm }),
      };
      const response = await layerVaccineService.getAll(params);
      setVaccines(response.data?.data || []);
      setCurrentPage(response.data?.current_page || 1);
      setLastPage(response.data?.last_page || 1);
      setTotal(response.data?.total || 0);
    } catch (error) {
      console.error('Error fetching vaccines:', error);
      alert('Error fetching vaccines');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVaccine) {
        await layerVaccineService.update(editingVaccine.id, formData);
        alert('Vaccine updated successfully');
      } else {
        await layerVaccineService.create(formData);
        alert('Vaccine created successfully');
      }
      setShowModal(false);
      resetForm();
      fetchVaccines();
    } catch (error) {
      console.error('Error saving vaccine:', error);
      const errorMsg = error.response?.data?.message || 'Error saving vaccine';
      alert(errorMsg);
    }
  };

  const handleEdit = (vaccine) => {
    setEditingVaccine(vaccine);
    setFormData({
      disease_en: vaccine.disease_en || '',
      vaccine_type_en: vaccine.vaccine_type_en || '',
      name_mm: vaccine.name_mm || '',
      target_stages: vaccine.target_stages || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vaccine?')) return;
    try {
      await layerVaccineService.delete(id);
      alert('Vaccine deleted successfully');
      fetchVaccines();
    } catch (error) {
      console.error('Error deleting vaccine:', error);
      alert('Error deleting vaccine');
    }
  };

  const resetForm = () => {
    setFormData({
      disease_en: '',
      vaccine_type_en: '',
      name_mm: '',
      target_stages: '',
    });
    setEditingVaccine(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading && vaccines.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Layer Vaccines</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          + Add New Vaccine
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search vaccines..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Stats */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {vaccines.length} of {total} vaccines
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disease (EN)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vaccine Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name (Myanmar)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target Stages</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vaccines.map((vaccine) => (
                <tr key={vaccine.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{vaccine.disease_en}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{vaccine.vaccine_type_en || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{vaccine.name_mm}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{vaccine.target_stages}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(vaccine)}
                      className="text-amber-600 hover:text-amber-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vaccine.id)}
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

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {lastPage}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(lastPage, prev + 1))}
                disabled={currentPage === lastPage}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingVaccine ? 'Edit Layer Vaccine' : 'Create New Layer Vaccine'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disease Name (English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.disease_en}
                  onChange={(e) => setFormData({ ...formData, disease_en: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., Newcastle Disease (ND)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vaccine Type (English)
                </label>
                <input
                  type="text"
                  value={formData.vaccine_type_en}
                  onChange={(e) => setFormData({ ...formData, vaccine_type_en: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., ND Vaccine (Live/Inactivated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vaccine Name (Myanmar) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name_mm}
                  onChange={(e) => setFormData({ ...formData, name_mm: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., ကြက်နယူးကာဆယ်ရောဂါ ကာကွယ်ဆေး"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Stages <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.target_stages}
                  onChange={(e) => setFormData({ ...formData, target_stages: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., Chicks, Pullets, Layers"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter target stages separated by commas (e.g., Chicks, Pullets, Layers)
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition"
                >
                  {editingVaccine ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
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

export default LayerVaccines;

