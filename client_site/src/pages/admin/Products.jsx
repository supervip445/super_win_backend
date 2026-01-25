import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name_en: '',
    name_mm: '',
    composition: '',
    indications_chicken: '',
    indications_pig: '',
    indications_cow: '',
    dosage_chicken: '',
    dosage_pig: '',
    dosage_cow: '',
    packaging: '',
    storage: '',
    special_features: '',
    image: null,
    status: 'active',
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        per_page: 20,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
      };
      const response = await productService.getAll(params);
      setProducts(response.data?.data || []);
      setCurrentPage(response.data?.current_page || 1);
      setLastPage(response.data?.last_page || 1);
      setTotal(response.data?.total || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'image' && formData[key] !== null && formData[key] !== '') {
          data.append(key, formData[key]);
        }
      });
      if (formData.image instanceof File) {
        data.append('image', formData.image);
      }

      if (editingProduct) {
        await productService.update(editingProduct.id, data);
        alert('Product updated successfully');
      } else {
        await productService.create(data);
        alert('Product created successfully');
      }
      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      const errorMsg = error.response?.data?.message || 'Error saving product';
      alert(errorMsg);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name_en: product.name_en || '',
      name_mm: product.name_mm || '',
      composition: product.composition || '',
      indications_chicken: product.indications_chicken || '',
      indications_pig: product.indications_pig || '',
      indications_cow: product.indications_cow || '',
      dosage_chicken: product.dosage_chicken || '',
      dosage_pig: product.dosage_pig || '',
      dosage_cow: product.dosage_cow || '',
      packaging: product.packaging || '',
      storage: product.storage || '',
      special_features: product.special_features || '',
      image: null,
      status: product.status || 'active',
    });
    setImagePreview(product.image || null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.delete(id);
      alert('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name_en: '',
      name_mm: '',
      composition: '',
      indications_chicken: '',
      indications_pig: '',
      indications_cow: '',
      dosage_chicken: '',
      dosage_pig: '',
      dosage_cow: '',
      packaging: '',
      storage: '',
      special_features: '',
      image: null,
      status: 'active',
    });
    setImagePreview(null);
    setEditingProduct(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          + Add New Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-1 md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Stats */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {products.length} of {total} products
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name (EN)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name (MM)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name_en}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{product.name_en}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{product.name_mm}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          product.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-amber-600 hover:text-amber-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name (English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., AMOXYVETO-50 S"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name (Myanmar) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name_mm}
                    onChange={(e) => setFormData({ ...formData, name_mm: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Composition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Composition/Ingredients
                </label>
                <textarea
                  value={formData.composition}
                  onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  rows="3"
                  placeholder="e.g., Amoxicillin Tri-hydrate (574) mg/Gram"
                />
              </div>

              {/* Indications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Indications (Chicken)
                  </label>
                  <textarea
                    value={formData.indications_chicken}
                    onChange={(e) => setFormData({ ...formData, indications_chicken: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="4"
                    placeholder="e.g., Coryza & ORT, Ecoli & Fowl Cholera"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Indications (Pig)
                  </label>
                  <textarea
                    value={formData.indications_pig}
                    onChange={(e) => setFormData({ ...formData, indications_pig: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="4"
                    placeholder="e.g., Rhinitis & Pneumonia, Enteritis"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Indications (Cow/Calf)
                  </label>
                  <textarea
                    value={formData.indications_cow}
                    onChange={(e) => setFormData({ ...formData, indications_cow: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="4"
                    placeholder="e.g., Metritis, Arthritis, Peritoritis"
                  />
                </div>
              </div>

              {/* Dosage */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosage (Chicken)
                  </label>
                  <textarea
                    value={formData.dosage_chicken}
                    onChange={(e) => setFormData({ ...formData, dosage_chicken: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="3"
                    placeholder="e.g., (1-2) gm/50 Kg BW in drinking water"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosage (Pig)
                  </label>
                  <textarea
                    value={formData.dosage_pig}
                    onChange={(e) => setFormData({ ...formData, dosage_pig: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="3"
                    placeholder="e.g., (1-2) gm/25 Kg BW in drinking water"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosage (Cow/Calf)
                  </label>
                  <textarea
                    value={formData.dosage_cow}
                    onChange={(e) => setFormData({ ...formData, dosage_cow: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="3"
                    placeholder="e.g., (1-2) gm/25 Kg BW in drinking water"
                  />
                </div>
              </div>

              {/* Packaging & Storage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Packaging
                  </label>
                  <textarea
                    value={formData.packaging}
                    onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="2"
                    placeholder="e.g., 1 Kg medicine pack/bottle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Storage Instructions
                  </label>
                  <textarea
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="2"
                    placeholder="e.g., Keep away from sunlight, Store in cool dry place"
                  />
                </div>
              </div>

              {/* Special Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Features/Notes
                </label>
                <textarea
                  value={formData.special_features}
                  onChange={(e) => setFormData({ ...formData, special_features: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  rows="4"
                  placeholder="e.g., Special technology features, benefits, etc."
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition"
                >
                  {editingProduct ? 'Update' : 'Create'}
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

export default Products;

