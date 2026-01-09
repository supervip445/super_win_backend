import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { notificationService } from '../services/notificationService';
import { useNavigate } from 'react-router-dom';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Connect to notification server
    notificationService.connect('public');

    // Listen for notifications
    const unsubscribe = notificationService.onNotification((data) => {
      const notification = {
        id: Date.now(),
        title: data.title,
        body: data.body,
        route: data.notification_data?.route,
        type: data.notification_data?.type,
        data: data.notification_data,
        timestamp: new Date(),
        read: false,
      };

      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);

      // Play notification sound
      playNotificationSound();
    });

    // Cleanup: only disconnect on unmount, not on re-renders
    return () => {
      unsubscribe();
      // Don't disconnect on every re-render, only on unmount
      // The service will handle reconnection automatically
    };
  }, []);

  const playNotificationSound = () => {
    try {
      const audio = new Audio('/sounds/noti.wav');
      audio.volume = 0.5;
      audio.play().catch(error => {
        console.error('Error playing notification sound:', error);
      });
    } catch (error) {
      console.error('Error loading notification sound:', error);
    }
  };

  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  }, []);

  const handleNotificationClick = useCallback((notification) => {
    markAsRead(notification.id);
    if (notification.route) {
      navigate(notification.route);
    }
  }, [navigate, markAsRead]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    handleNotificationClick,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

