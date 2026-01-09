import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { publicService } from '../../services/publicService';
import LikeDislike from '../../components/public/LikeDislike';
import CommentSection from '../../components/public/CommentSection';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import Sidebar from '../../components/public/Sidebar';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await publicService.getPost(id);
      setPost(response.data?.data);
    } catch (error) {
      console.error('Error fetching post:', error);
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h2>
          <Link to="/" className="text-amber-600 hover:underline">Go back home</Link>
        </div>
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
        <article className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          )}
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                {post.category?.name || 'Uncategorized'}
              </span>
              <div className="flex items-center gap-4">
                {post.views_count !== undefined && (
                  <span className="flex items-center gap-1 text-gray-600 text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="font-semibold">{post.views_count || 0}</span>
                    <span>views</span>
                  </span>
                )}
                <span className="text-gray-500 text-sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
            
            <LikeDislike
              likeableType="App\Models\Post"
              likeableId={post.id}
            />

            <div className="mt-8 prose max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            <CommentSection
              commentableType="App\Models\Post"
              commentableId={post.id}
            />
          </div>
        </article>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PostDetail;

