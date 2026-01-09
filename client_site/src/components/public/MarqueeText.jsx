import { useState, useEffect } from 'react';
import { publicService } from '../../services/publicService';

const MarqueeText = () => {
  const [bannerTexts, setBannerTexts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBannerTexts();
  }, []);

  const fetchBannerTexts = async () => {
    try {
      const response = await publicService.getBannerTexts();
      setBannerTexts(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching banner texts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || bannerTexts.length === 0) {
    return null;
  }

  // Combine all active texts
  const combinedText = bannerTexts.map(bt => bt.text).join(' • ');

  return (
    <div className="bg-amber-700 text-white py-3 overflow-hidden relative">
      <div className="marquee-container">
        <div className="marquee-content">
          <span className="marquee-text">{combinedText}</span>
          <span className="marquee-text" aria-hidden="true">{combinedText}</span>
        </div>
      </div>
      <style>{`
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
        .marquee-text {
          padding-right: 50px;
          font-size: 1rem;
          font-weight: 500;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MarqueeText;

