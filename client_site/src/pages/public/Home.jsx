import { useState, useEffect } from 'react';
import { publicService } from '../../services/publicService';
import { Link } from 'react-router-dom';
import BannerSlider from '../../components/public/BannerSlider';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import Sidebar from '../../components/public/Sidebar';
import ChatIcon from '../../components/Chat/ChatIcon';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const postsRes = await publicService.getPosts().catch(err => {
        console.error('Error fetching posts:', err);
        return { data: { data: [] } };
      });
      setPosts(postsRes.data?.data?.slice(0, 6) || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
        {/* Banner Slider */}
        <BannerSlider />
        {/* Recent Posts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.category?.name || 'Uncategorized'}</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
      
      {/* Chat Icon */}
      <ChatIcon />
    </div>
  );
};

export default Home;

