import { useEffect, useState } from 'react';
import { postService } from '../../services/postService';
import { categoryService } from '../../services/categoryService';
import { donationService } from '../../services/donationService';
import { contactService } from '../../services/contactService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    posts: 0,
    categories: 0,
    donations: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsRes, categoriesRes, donationsRes, contactsRes] = await Promise.all([
          postService.getAll().catch(() => ({ data: { data: [] } })),
          categoryService.getAll().catch(() => ({ data: { data: [] } })),
          donationService.getAll().catch(() => ({ data: { data: [] } })),
          contactService.getAll().catch(() => ({ data: { data: [] } })),
        ]);

        setStats({
          posts: postsRes.data?.data?.length || 0,
          categories: categoriesRes.data?.data?.length || 0,
          donations: donationsRes.data?.data?.length || 0,
          contacts: contactsRes.data?.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Posts', value: stats.posts, icon: '📝', color: 'bg-blue-500' },
    { label: 'Categories', value: stats.categories, icon: '📁', color: 'bg-green-500' },
    { label: 'Donations', value: stats.donations, icon: '💰', color: 'bg-yellow-500' },
    { label: 'Contacts', value: stats.contacts, icon: '📧', color: 'bg-purple-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{card.label}</p>
                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition">
            <h3 className="font-semibold text-blue-800">Create New Post</h3>
            <p className="text-sm text-blue-600">Add a new blog post</p>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition">
            <h3 className="font-semibold text-green-800">Manage Donations</h3>
            <p className="text-sm text-green-600">View and approve donations</p>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition">
            <h3 className="font-semibold text-purple-800">View Contacts</h3>
            <p className="text-sm text-purple-600">Check new messages</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

