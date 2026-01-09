import { useState, useEffect } from 'react';
import { publicService } from '../../services/publicService';

const LikeDislike = ({ likeableType, likeableId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userAction, setUserAction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCounts();
  }, [likeableType, likeableId]);

  const fetchCounts = async () => {
    try {
      const response = await publicService.getLikeCounts({
        likeable_type: likeableType,
        likeable_id: likeableId,
      });
      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);
      setUserAction(response.data.user_action);
    } catch (error) {
      console.error('Error fetching like counts:', error);
    }
  };

  const handleToggle = async (type) => {
    setLoading(true);
    try {
      await publicService.toggleLike({
        likeable_type: likeableType,
        likeable_id: likeableId,
        type: type,
      });
      await fetchCounts();
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleToggle('like')}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
          userAction === 'like'
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-green-100'
        }`}
      >
        <span>👍</span>
        <span>{likes}</span>
      </button>
      <button
        onClick={() => handleToggle('dislike')}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
          userAction === 'dislike'
            ? 'bg-red-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-red-100'
        }`}
      >
        <span>👎</span>
        <span>{dislikes}</span>
      </button>
    </div>
  );
};

export default LikeDislike;

