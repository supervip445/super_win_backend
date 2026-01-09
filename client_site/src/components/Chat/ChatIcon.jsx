import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicAuthService } from '../../services/publicAuthService';
import { FaComments, FaTimes } from 'react-icons/fa';
import Chat from './Chat';
import BASE_URL from '../../hooks/BaseUrl';

const ChatIcon = () => {
  const navigate = useNavigate();
  const [publicUser, setPublicUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Check if user is logged in
  useEffect(() => {
    const user = publicAuthService.getCurrentUser();
    setPublicUser(user);
  }, []);

  // Check for unread messages
  const checkUnreadMessages = async () => {
    if (!publicUser) return;

    try {
      const token = localStorage.getItem('public_token');
      const response = await fetch(`${BASE_URL}/public/chat/messages?per_page=50`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.data) {
          // Count unread messages (messages without read_at that are received by user)
          const unread = data.data.filter(msg => !msg.read_at && msg.receiver_id === publicUser.id);
          setUnreadCount(unread.length);
        }
      }
    } catch (error) {
      // Silently fail - don't show errors for background checks
    }
  };

  // Handle chat icon click
  const handleChatClick = () => {
    if (!publicUser) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }
    setIsOpen(!isOpen);
  };

  // Poll for unread messages every 5 seconds
  useEffect(() => {
    if (publicUser && !isOpen) {
      checkUnreadMessages();
      const interval = setInterval(checkUnreadMessages, 5000);
      return () => clearInterval(interval);
    } else {
      setUnreadCount(0); // Reset when chat is open
    }
  }, [publicUser, isOpen]);

  return (
    <>
      {/* Sticky Chat Icon */}
      <button
        onClick={handleChatClick}
        className="fixed left-4 bottom-20 sm:bottom-6 z-40 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-yellow-400/50 group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <FaTimes size={24} className="animate-spin-on-hover" />
        ) : (
          <div className="relative">
            <FaComments size={24} />
            {publicUser && unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Popup - Only show if user is logged in */}
      {publicUser && <Chat isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatIcon;

