import { useState, useEffect } from 'react';
import { publicService } from '../../services/publicService';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import Sidebar from '../../components/public/Sidebar';

const LayerVaccines = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [targetStageFilter, setTargetStageFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchVaccines();
  }, [currentPage, searchTerm, targetStageFilter]);

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        per_page: 20,
        ...(searchTerm && { search: searchTerm }),
        ...(targetStageFilter && { target_stage: targetStageFilter }),
      };
      const response = await publicService.getLayerVaccines(params);
      setVaccines(response.data?.data || []);
      setCurrentPage(response.data?.current_page || 1);
      setLastPage(response.data?.last_page || 1);
      setTotal(response.data?.total || 0);
    } catch (error) {
      console.error('Error fetching vaccines:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique target stages for filter
  const targetStages = [
    'Chicks',
    'Pullets',
    'Layers',
    'Breeding Stock',
    'Day-old Chicks',
    'All ages',
  ];

  if (loading && vaccines.length === 0) {
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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Layer Vaccines</h1>
            <p className="text-gray-600">Comprehensive guide to layer (hen) vaccines and vaccination schedules</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 space-y-4 md:flex md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search vaccines by disease, type, or name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="md:w-64">
              <select
                value={targetStageFilter}
                onChange={(e) => {
                  setTargetStageFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Target Stages</option>
                {targetStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {vaccines.length} of {total} vaccines
          </div>

          {/* Vaccines Grid */}
          {vaccines.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">No vaccines found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {vaccines.map((vaccine) => (
                <div
                  key={vaccine.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {vaccine.disease_en}
                      </h3>
                      {vaccine.vaccine_type_en && (
                        <p className="text-amber-600 font-medium mb-2">
                          {vaccine.vaccine_type_en}
                        </p>
                      )}
                      <p className="text-gray-700 text-lg mb-3">{vaccine.name_mm}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-600">Target Stages:</span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                          {vaccine.target_stages}
                        </span>
                      </div>
                    </div>
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
    </div>
  );
};

export default LayerVaccines;

