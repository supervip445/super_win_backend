import { io } from 'socket.io-client';

class NotificationService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = [];
    this.userId = null;
  }

  connect(userId = 'public') {
    // Don't reconnect if already connected
    if (this.socket && this.isConnected) {
      return;
    }

    // Disconnect existing socket if it exists but not connected
    if (this.socket && !this.isConnected) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }

    // Generate a unique user ID for public users (using sessionStorage)
    if (!userId || userId === 'public') {
      userId = this.getOrCreatePublicUserId();
    }

    this.userId = userId;

    const serverUrl = import.meta.env.VITE_NOTIFICATION_SERVER_URL || 'https://maxwin688.site';
    
    // Try polling first, then upgrade to websocket if available
    this.socket = io(serverUrl, {
      transports: ['polling', 'websocket'], // Try polling first for better compatibility
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity, // Keep trying to reconnect
      timeout: 20000,
      forceNew: true, // Force a new connection
    });

    this.socket.on('connect', () => {
      console.log('🔌 Connected to notification server');
      this.isConnected = true;
      
      // Register as public user
      this.socket.emit('register', userId);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from notification server:', reason);
      this.isConnected = false;
      
      // Only try to reconnect if it wasn't a manual disconnect
      if (reason === 'io server disconnect') {
        // Server disconnected, reconnect manually
        this.socket.connect();
      }
    });

    this.socket.on('receive_noti', (data) => {
      console.log('📨 Received notification:', data);
      // Handle public broadcasts - if to_user_id is 'public' or matches our user_id
      if (data.to_user_id === 'public' || data.to_user_id === userId || data.to_user_id === 'all') {
        // Notify all listeners
        this.listeners.forEach(listener => {
          if (typeof listener === 'function') {
            listener(data);
          }
        });
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.isConnected = false;
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Reconnected to notification server after', attemptNumber, 'attempts');
      this.isConnected = true;
      // Re-register after reconnection
      if (this.userId) {
        this.socket.emit('register', this.userId);
      }
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('🔄 Reconnection attempt', attemptNumber);
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('🔄 Reconnection error:', error);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('🔄 Reconnection failed after all attempts');
    });
  }

  getOrCreatePublicUserId() {
    // Use sessionStorage to maintain the same user ID during the session
    let userId = sessionStorage.getItem('public_user_id');
    if (!userId) {
      // Generate a unique ID for this public user session
      userId = 'public_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('public_user_id', userId);
    }
    return userId;
  }

  disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  onNotification(callback) {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }
}

// Export singleton instance
export const notificationService = new NotificationService();

