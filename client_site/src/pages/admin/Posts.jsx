import { useState, useEffect } from 'react';
import { postService } from '../../services/postService';
import { categoryService } from '../../services/categoryService';
import RichTextEditor from '../../components/admin/RichTextEditor';
import ImageUploader from '../../components/admin/ImageUploader';
import ViewsModal from '../../components/admin/ViewsModal';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showViewsModal, setShowViewsModal] = useState(false);
  const [viewingPost, setViewingPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedPostForViews, setSelectedPostForViews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    images: [],
    status: 'draft',
  });

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postService.getAll();
      setPosts(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Helper function to check if HTML content is empty
  const isContentEmpty = (html) => {
    if (!html || html.trim() === '') return true;
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    // Get text content and check if it's empty
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.trim() === '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.title || formData.title.trim() === '') {
      alert('Error saving post: The title field is required.');
      return;
    }
    
    // Validate content - but be more lenient for HTML content
    const contentToValidate = formData.content || '';
    if (isContentEmpty(contentToValidate)) {
      alert('Error saving post: The content field is required.');
      return;
    }
    
    try {
      const data = new FormData();
      data.append('title', formData.title.trim());
      // Don't trim HTML content as it may contain important formatting and whitespace
      // Only ensure it's not null/undefined
      const contentValue = contentToValidate || '';
      data.append('content', contentValue);
      // Send category_id (empty string will be converted to null in Laravel)
      data.append('category_id', formData.category_id || '');
      data.append('status', formData.status);
      
      // Append all images
      formData.images.forEach((image, index) => {
        data.append(`images[${index}]`, image);
      });

      if (editingPost) {
        console.log('Updating post:', editingPost.id);
        console.log('Form data:', {
          title: formData.title,
          contentLength: formData.content?.length,
          category_id: formData.category_id,
          status: formData.status,
          imagesCount: formData.images.length
        });
        await postService.update(editingPost.id, data);
        alert('Post updated successfully!');
      } else {
        await postService.create(data);
        alert('Post created successfully!');
      }
      setShowModal(false);
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      // Show more detailed error message
      if (error.response?.data?.message) {
        alert(`Error saving post: ${error.response.data.message}`);
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        let errorMessage = 'Validation failed:\n';
        for (const key in errors) {
          errorMessage += `- ${errors[key].join(', ')}\n`;
        }
        alert(errorMessage);
      } else {
        alert('Error saving post: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const handleView = (post) => {
    setViewingPost(post);
    setShowDetailModal(true);
  };

  const handleViewCountClick = (post) => {
    setSelectedPostForViews(post);
    setShowViewsModal(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    // Ensure content is properly loaded - handle both string and HTML content
    const postContent = post.content || '';
    setFormData({
      title: post.title || '',
      content: postContent,
      category_id: post.category_id ? String(post.category_id) : '',
      images: [],
      status: post.status || 'draft',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await postService.delete(id);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category_id: '',
      images: [],
      status: 'draft',
    });
    setEditingPost(null);
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
        <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          + Add New Post
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div 
                    className="text-sm font-medium text-gray-900 cursor-pointer hover:text-amber-600 transition"
                    onClick={() => handleView(post)}
                    title="Click to view details"
                  >
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{post.category?.name || 'N/A'}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewCountClick(post)}
                    className="text-blue-600 hover:text-blue-900 font-semibold cursor-pointer"
                    title="Click to view IP addresses"
                  >
                    {post.views_count || 0}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleView(post)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    title="View Details"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-amber-600 hover:text-amber-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select Category (Optional)</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  placeholder="Write your post content here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                <ImageUploader
                  images={formData.images}
                  onImagesChange={(images) => setFormData({ ...formData, images })}
                  maxImages={10}
                  enableCrop={false}
                />
                {editingPost && editingPost.image && formData.images.length === 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                    <img
                      src={editingPost.image}
                      alt="Current"
                      className="h-32 w-auto rounded-lg border border-gray-300"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700"
                >
                  {editingPost ? 'Update' : 'Create'}
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

      {/* Detail Modal */}
      {showDetailModal && viewingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Post Details</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setViewingPost(null);
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
              {viewingPost.image && (
                <div>
                  <img
                    src={viewingPost.image}
                    alt={viewingPost.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <div className="text-lg font-semibold text-gray-900">{viewingPost.title}</div>
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="text-gray-900">{viewingPost.category?.name || 'N/A'}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full ${
                      viewingPost.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {viewingPost.status}
                  </span>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                  <div className="text-gray-900">
                    {viewingPost.created_at ? new Date(viewingPost.created_at).toLocaleString() : 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Updated At</label>
                  <div className="text-gray-900">
                    {viewingPost.updated_at ? new Date(viewingPost.updated_at).toLocaleString() : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <div 
                  className="prose max-w-none p-4 bg-gray-50 rounded-lg border border-gray-200"
                  dangerouslySetInnerHTML={{ __html: viewingPost.content }}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleEdit(viewingPost);
                  }}
                  className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700"
                >
                  Edit Post
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setViewingPost(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Views Modal */}
      <ViewsModal
        isOpen={showViewsModal}
        onClose={() => {
          setShowViewsModal(false);
          setSelectedPostForViews(null);
        }}
        viewableType={selectedPostForViews ? 'App\\Models\\Post' : null}
        viewableId={selectedPostForViews?.id || null}
      />
    </div>
  );
};

export default Posts;
