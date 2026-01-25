import { useState, useEffect } from 'react';
import { publicService } from '../../services/publicService';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import Sidebar from '../../components/public/Sidebar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        per_page: 12,
        ...(searchTerm && { search: searchTerm }),
      };
      const response = await publicService.getProducts(params);
      setProducts(response.data?.data || []);
      setCurrentPage(response.data?.current_page || 1);
      setLastPage(response.data?.last_page || 1);
      setTotal(response.data?.total || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout with Sidebar */}
      <div className="flex flex-1 relative">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block md:relative">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full md:w-[calc(100%-16rem)] container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Products</h1>
            <p className="text-gray-600">Browse our range of veterinary medicines and products</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products by name or composition..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {products.length} of {total} products
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                  onClick={() => handleViewDetail(product)}
                >
                  {/* Image */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name_en}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full flex items-center justify-center ${product.image ? 'hidden' : 'flex'}`}
                    >
                      <div className="text-center p-4">
                        <svg className="w-16 h-16 mx-auto text-amber-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-amber-600 text-sm font-medium">No Image</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {product.name_en}
                    </h3>
                    <p className="text-gray-700 text-lg mb-3">{product.name_mm}</p>
                    {product.composition && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.composition}
                      </p>
                    )}
                    <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {lastPage > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {lastPage}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 bg-white"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(lastPage, prev + 1))}
                  disabled={currentPage === lastPage}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 bg-white"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Detail Modal */}
      {showDetailModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name_en}</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedProduct(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Image */}
              {selectedProduct.image && (
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name_en}
                    className="w-full h-64 object-contain rounded-lg border border-gray-200"
                  />
                </div>
              )}

              {/* Basic Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedProduct.name_mm}</h3>
                {selectedProduct.composition && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-1">Composition:</h4>
                    <p className="text-gray-600">{selectedProduct.composition}</p>
                  </div>
                )}
              </div>

              {/* Indications */}
              {(selectedProduct.indications_chicken || selectedProduct.indications_pig || selectedProduct.indications_cow) && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Indications:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedProduct.indications_chicken && (
                      <div>
                        <h5 className="font-medium text-amber-600 mb-1">🐔 Chicken:</h5>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{selectedProduct.indications_chicken}</p>
                      </div>
                    )}
                    {selectedProduct.indications_pig && (
                      <div>
                        <h5 className="font-medium text-amber-600 mb-1">🐷 Pig:</h5>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{selectedProduct.indications_pig}</p>
                      </div>
                    )}
                    {selectedProduct.indications_cow && (
                      <div>
                        <h5 className="font-medium text-amber-600 mb-1">🐄 Cow/Calf:</h5>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{selectedProduct.indications_cow}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dosage */}
              {(selectedProduct.dosage_chicken || selectedProduct.dosage_pig || selectedProduct.dosage_cow) && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Dosage:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedProduct.dosage_chicken && (
                      <div>
                        <h5 className="font-medium text-amber-600 mb-1">🐔 Chicken:</h5>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{selectedProduct.dosage_chicken}</p>
                      </div>
                    )}
                    {selectedProduct.dosage_pig && (
                      <div>
                        <h5 className="font-medium text-amber-600 mb-1">🐷 Pig:</h5>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{selectedProduct.dosage_pig}</p>
                      </div>
                    )}
                    {selectedProduct.dosage_cow && (
                      <div>
                        <h5 className="font-medium text-amber-600 mb-1">🐄 Cow/Calf:</h5>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{selectedProduct.dosage_cow}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Packaging & Storage */}
              {(selectedProduct.packaging || selectedProduct.storage) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProduct.packaging && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Packaging:</h4>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{selectedProduct.packaging}</p>
                    </div>
                  )}
                  {selectedProduct.storage && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Storage:</h4>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{selectedProduct.storage}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Special Features */}
              {selectedProduct.special_features && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Special Features:</h4>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{selectedProduct.special_features}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

