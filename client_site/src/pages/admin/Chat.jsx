import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { IoMdSend, IoMdClose } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import livechatSound from '../../assets/sounds/livechat.mp3';
import notiSound from '../../assets/sounds/noti.wav';

const AdminChat = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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

  // Play sound when new message arrives (only if it's from user, not from admin)
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

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch users assigned to admin
  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/chat/users');
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    }
  };

  // Fetch messages for selected user
  const fetchMessages = async (userId, page = 1, append = false) => {
    if (!userId) return;

    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const response = await api.get(`/admin/chat/users/${userId}/messages?per_page=20&page=${page}`);

      const data = response.data;

      if (data && data.data) {
        const fetchedMessages = data.data;
        const pagination = data.meta || {};
        const reversedMessages = fetchedMessages.reverse();
        const previousCount = previousMessagesCountRef.current;

        if (append) {
          setMessages(prev => [...reversedMessages, ...prev]);
        } else {
          // Check for new messages from user when not appending (polling scenario)
          if (previousCount > 0 && reversedMessages.length > previousCount) {
            // Get only the newly added messages
            const newMessages = reversedMessages.slice(previousCount);
            // Check if any new message is from user (sender_type === 'player')
            const hasNewMessageFromUser = newMessages.some(msg => 
              msg.sender_type === 'player'
            );
            
            if (hasNewMessageFromUser) {
              playChatSound();
            }
          }
          
          setMessages(reversedMessages);
          previousMessagesCountRef.current = reversedMessages.length;
          setTimeout(scrollToBottom, 100);
        }

        setHasMore(pagination.current_page < pagination.last_page);
        setCurrentPage(page);
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

    if (!newMessage.trim() || sending || !selectedUser) return;

    const messageText = newMessage.trim();
    if (messageText.length > 2000) {
      toast.error('Message is too long (max 2000 characters)');
      return;
    }

    setSending(true);
    setNewMessage('');

    try {
      const response = await api.post(`/admin/chat/users/${selectedUser.id}/messages`, {
        message: messageText,
      });

      if (response.data && response.data.data) {
        setMessages(prev => [...prev, response.data.data]);
        setTimeout(scrollToBottom, 100);
        // Refresh users list to update unread counts and last message
        fetchUsers();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(error.response?.data?.message || 'Failed to send message');
      setNewMessage(messageText); // Restore message on error
    } finally {
      setSending(false);
    }
  };

  // Select user and load messages
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
    setCurrentPage(1);
    previousMessagesCountRef.current = 0; // Reset count when selecting new user
    fetchMessages(user.id, 1, false);
  };

  // Load more messages
  const loadMoreMessages = () => {
    if (hasMore && !isLoadingMore && selectedUser) {
      fetchMessages(selectedUser.id, currentPage + 1, true);
    }
  };

  // Handle scroll for loading more
  const handleScroll = (e) => {
    const container = e.target;
    if (container.scrollTop === 0 && hasMore && !isLoadingMore) {
      const previousScrollHeight = container.scrollHeight;
      loadMoreMessages();
      setTimeout(() => {
        container.scrollTop = container.scrollHeight - previousScrollHeight;
      }, 100);
    }
  };

  // Initial fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  // Refresh users periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchUsers();
      if (selectedUser) {
        fetchMessages(selectedUser.id, 1, false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Chat Management</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="flex h-full">
          {/* Users List Sidebar */}
          <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-semibold text-gray-800">Users</h2>
              <p className="text-sm text-gray-500">{users.length} users assigned</p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {users.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <FaUser className="mx-auto mb-2 text-4xl text-gray-300" />
                  <p>No users assigned</p>
                </div>
              ) : (
                users.map((userItem) => (
                  <button
                    key={userItem.id}
                    onClick={() => handleSelectUser(userItem)}
                    className={`w-full p-4 text-left border-b border-gray-200 hover:bg-gray-100 transition ${
                      selectedUser?.id === userItem.id ? 'bg-amber-50 border-l-4 border-l-amber-600' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0">
                            <FaUser className="text-white text-sm" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 truncate">{userItem.name}</p>
                            <p className="text-xs text-gray-500 truncate">@{userItem.user_name}</p>
                          </div>
                        </div>
                        {userItem.last_message && (
                          <p className="text-sm text-gray-600 mt-2 truncate">
                            {userItem.last_message.message}
                          </p>
                        )}
                        {userItem.last_message && (
                          <p className="text-xs text-gray-400 mt-1">
                            {formatTime(userItem.last_message.created_at)}
                          </p>
                        )}
                      </div>
                      {userItem.unread_count > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          {userItem.unread_count > 9 ? '9+' : userItem.unread_count}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedUser.name}</h3>
                      <p className="text-xs text-gray-500">@{selectedUser.user_name} • {selectedUser.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Messages Container */}
                <div
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {isLoadingMore && (
                    <div className="text-center text-amber-600 text-sm py-2">
                      Loading older messages...
                    </div>
                  )}

                  {loading && messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mx-auto mb-3"></div>
                        <p className="text-gray-400">Loading messages...</p>
                      </div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                          <FaUser className="text-amber-600 text-2xl" />
                        </div>
                        <p className="text-gray-400">No messages yet</p>
                        <p className="text-gray-500 text-sm mt-1">Start a conversation with {selectedUser.name}!</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => {
                      const isOwnMessage = message.sender_id === user?.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                              isOwnMessage
                                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black'
                                : 'bg-white text-gray-800 border border-gray-200'
                            }`}
                          >
                            {!isOwnMessage && message.sender && (
                              <p className="text-xs font-semibold mb-1 opacity-80">
                                {message.sender.name || message.sender.user_name}
                              </p>
                            )}
                            <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                            <p className={`text-xs mt-1 ${isOwnMessage ? 'text-black/60' : 'text-gray-400'}`}>
                              {formatTime(message.created_at)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-end gap-2">
                    <textarea
                      value={newMessage}
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage(e);
                        }
                      }}
                      placeholder="Type your message..."
                      rows={1}
                      maxLength={2000}
                      className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || sending}
                      className="bg-gradient-to-r from-amber-400 to-orange-400 text-black p-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      {sending ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                      ) : (
                        <IoMdSend size={20} />
                      )}
                    </button>
                  </div>
                  {newMessage.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {newMessage.length}/2000
                    </p>
                  )}
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                    <FaUser className="text-gray-400 text-3xl" />
                  </div>
                  <p className="text-gray-500 text-lg">Select a user to start chatting</p>
                  <p className="text-gray-400 text-sm mt-2">Choose a user from the list to view and send messages</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;

