import React, { useEffect, useState, useRef } from 'react';
import { publicAuthService } from '../../services/publicAuthService';
import BASE_URL from '../../hooks/BaseUrl';
import { IoMdClose, IoMdSend } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import livechatSound from '../../assets/sounds/livechat.mp3';
import notiSound from '../../assets/sounds/noti.wav';

const Chat = ({ isOpen, onClose }) => {
  const [publicUser, setPublicUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const previousMessagesCountRef = useRef(0);

  // Play sound when new message arrives (only if it's from admin/agent)
  const playChatSound = () => {
    try {
      // Try MP3 first, fallback to WAV if not supported
      const audio = new Audio(livechatSound);
      audio.volume = 0.7;
      
      audio.play().catch(error => {
        // If MP3 fails, try WAV fallback
        console.warn('MP3 playback failed, trying WAV fallback:', error);
        try {
          const fallbackAudio = new Audio(notiSound);
          fallbackAudio.volume = 0.7;
          fallbackAudio.play().catch(fallbackError => {
            console.error('Error playing fallback sound:', fallbackError);
          });
        } catch (fallbackError) {
          console.error('Error creating fallback audio:', fallbackError);
        }
      });
    } catch (error) {
      console.error('Error creating audio element:', error);
    }
  };

  // Get public user
  useEffect(() => {
    const user = publicAuthService.getCurrentUser();
    setPublicUser(user);
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch messages
  const fetchMessages = async (page = 1, append = false) => {
    if (!publicUser || !isOpen) return;

    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const token = localStorage.getItem('public_token');
      const response = await fetch(`${BASE_URL}/public/chat/messages?per_page=20&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        publicAuthService.logout();
        toast.error('Session expired. Please login again.');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.message) {
          toast.error(errorData.message);
        } else {
          toast.error('Failed to load messages');
        }
        setLoading(false);
        setIsLoadingMore(false);
        return;
      }

      const data = await response.json();
      
      // Handle Laravel pagination format
      let fetchedMessages = [];
      if (data && Array.isArray(data)) {
        // If it's a collection (array), treat as first page
        fetchedMessages = data;
        setHasMore(false); // Collection doesn't have pagination
        setCurrentPage(1);
      } else if (data && data.data) {
        // If it's paginated response
        fetchedMessages = data.data;
        const pagination = data.meta || {};
        setHasMore(pagination.current_page < pagination.last_page);
        setCurrentPage(page);
      }
      
      if (fetchedMessages.length > 0) {
        const reversedMessages = fetchedMessages.reverse();
        
        if (append) {
          setMessages(prev => [...reversedMessages, ...prev]);
        } else {
          // Check for new messages from admin when not appending (polling scenario)
          const previousCount = previousMessagesCountRef.current;
          if (previousCount > 0 && reversedMessages.length > previousCount && isOpen) {
            // Get only the newly added messages
            const newMessages = reversedMessages.slice(previousCount);
            // Check if any new message is from admin/agent
            const hasNewMessageFromAdmin = newMessages.some(msg => 
              msg.sender_type === 'agent' || msg.sender_id !== publicUser?.id
            );
            
            if (hasNewMessageFromAdmin) {
              playChatSound();
            }
          }
          
          setMessages(reversedMessages);
          previousMessagesCountRef.current = reversedMessages.length;
          setTimeout(scrollToBottom, 100);
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || sending) return;

    const messageText = newMessage.trim();
    if (messageText.length > 2000) {
      toast.error('Message is too long (max 2000 characters)');
      return;
    }

    setSending(true);
    setNewMessage('');

    try {
      const token = localStorage.getItem('public_token');
      const response = await fetch(`${BASE_URL}/public/chat/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (response.status === 401) {
        publicAuthService.logout();
        toast.error('Session expired. Please login again.');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to send message');
        setNewMessage(messageText); // Restore message on error
        return;
      }

      const data = await response.json();
      if (data && data.data) {
        setMessages(prev => [...prev, data.data]);
        setTimeout(scrollToBottom, 100);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      setNewMessage(messageText); // Restore message on error
    } finally {
      setSending(false);
    }
  };

  // Load more messages (scroll to top)
  const loadMoreMessages = () => {
    if (hasMore && !isLoadingMore) {
      fetchMessages(currentPage + 1, true);
    }
  };

  // Initial fetch and refresh on open
  useEffect(() => {
    if (isOpen && publicUser) {
      // Reset previous count when opening chat
      previousMessagesCountRef.current = 0;
      fetchMessages(1, false);
      
      // Poll for new messages every 3 seconds
      const interval = setInterval(() => {
        fetchMessages(1, false);
      }, 3000);

      return () => clearInterval(interval);
    } else {
      // Reset count when chat is closed
      previousMessagesCountRef.current = 0;
    }
  }, [isOpen, publicUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  // Handle scroll for loading more
  const handleScroll = (e) => {
    const container = e.target;
    if (container.scrollTop === 0 && hasMore && !isLoadingMore) {
      const previousScrollHeight = container.scrollHeight;
      loadMoreMessages();
      // Maintain scroll position after loading
      setTimeout(() => {
        container.scrollTop = container.scrollHeight - previousScrollHeight;
      }, 100);
    }
  };

  if (!isOpen) return null;

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-[#0b141a] rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:w-[400px] h-[calc(100vh-90px)] sm:h-[600px] max-h-[calc(100vh-90px)] sm:max-h-[600px] flex flex-col border border-gray-700/50 mb-16 sm:mb-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-[#2a2f32]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <FaUser className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Support Chat</h3>
              <p className="text-green-400 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Online
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700/50 rounded-lg"
            aria-label="Close chat"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-1 scroll-smooth bg-[#0b141a]"
          style={{ scrollbarWidth: 'thin' }}
        >
          {isLoadingMore && (
            <div className="text-center text-blue-400 text-sm py-2">
              Loading older messages...
            </div>
          )}
          
          {loading && messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400 mx-auto mb-3"></div>
                <p className="text-gray-400">Loading messages...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                  <FaUser className="text-blue-400 text-2xl" />
                </div>
                <p className="text-gray-300">No messages yet</p>
                <p className="text-gray-500 text-sm mt-1">Start a conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => {
              // User messages: sender_id matches logged-in user
              const isUserMessage = message.sender_id === publicUser?.id;
              // Admin messages: not from the logged-in user (either agent type or different sender)
              const isAdminMessage = !isUserMessage;
              
              const prevMessage = index > 0 ? messages[index - 1] : null;
              const timeDiff = prevMessage ? (new Date(message.created_at).getTime() - new Date(prevMessage.created_at).getTime()) : 300001;
              const showAvatar = isAdminMessage && (!prevMessage || prevMessage.sender_id !== message.sender_id || timeDiff > 300000);
              
              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${isUserMessage ? 'justify-end flex-row-reverse' : 'justify-start'}`}
                >
                  {/* Avatar for admin messages (LEFT side) */}
                  {isAdminMessage && (
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 ${showAvatar ? 'visible' : 'invisible'}`}>
                      <span className="text-white text-xs font-bold">
                        {(message.sender?.name || message.sender?.user_name || 'A')?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Message Bubble */}
                  <div className={`flex flex-col ${isUserMessage ? 'items-end' : 'items-start'} max-w-[75%]`}>
                    {/* Sender name for admin messages (only first message in group) */}
                    {isAdminMessage && showAvatar && message.sender && (
                      <p className="text-xs text-gray-300 mb-1 px-1">
                        {message.sender.name || message.sender.user_name || 'Admin'}
                      </p>
                    )}
                    
                    {/* Message bubble with tail */}
                    {/* User messages: RIGHT side with blue background */}
                    {/* Admin messages: LEFT side with different background */}
                    <div
                      className={`relative px-4 py-2 rounded-2xl ${
                        isUserMessage
                          ? 'bg-[#0084ff] text-white rounded-br-sm'
                          : 'bg-[#2a3942] text-white rounded-bl-sm border border-gray-600/30'
                      }`}
                      style={{
                        borderRadius: isUserMessage 
                          ? '18px 18px 4px 18px' 
                          : '18px 18px 18px 4px'
                      }}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                        {message.message}
                      </p>
                      
                      {/* Timestamp */}
                      <div className={`flex justify-end mt-1 ${isUserMessage ? 'text-white/70' : 'text-gray-400'}`}>
                        <span className="text-[10px]">
                          {formatTime(message.created_at)}
                        </span>
                        {isUserMessage && (
                          <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 16 15">
                            <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.175a.366.366 0 0 0-.063-.51z"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacer for alignment when no avatar (for user messages on right) */}
                  {isUserMessage && <div className="w-8 flex-shrink-0" />}
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage} className="p-3 pb-6 sm:pb-4 border-t border-gray-700/50 bg-[#1e2428] flex-shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                // Auto-resize textarea
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
              placeholder="Type a message..."
              rows={1}
              maxLength={2000}
              className="flex-1 bg-[#2a2f32] text-white rounded-lg px-4 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-600/50 overflow-y-auto placeholder-gray-400"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className="bg-[#0084ff] text-white p-3 rounded-lg hover:bg-[#0066cc] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0084ff] flex-shrink-0"
              aria-label="Send message"
            >
              {sending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <IoMdSend size={20} />
              )}
            </button>
          </div>
          {newMessage.length > 0 && (
            <p className="text-xs text-gray-500 mt-1 text-right px-1">
              {newMessage.length}/2000
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Chat;

