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
            {posts.map((post) => {
              // Strip HTML tags for preview
              const textContent = post.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
              const preview = textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent;
              
              return (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full flex items-center justify-center ${post.image ? 'hidden' : 'flex'}`}
                    >
                      <div className="text-center p-4">
                        <svg className="w-16 h-16 mx-auto text-amber-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-amber-600 text-sm font-medium">No Image</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4.5rem]">
                      {preview}
                    </p>
                    <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category?.name || 'Uncategorized'}
                      </span>
                      <span className="text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'numeric', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
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

