import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { publicAuthService } from '../services/publicAuthService';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Check if user is authenticated as admin
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check if user is admin (super_admin type)
  if (user.type !== 'super_admin') {
    // If user is a public user, redirect to home
    const publicUser = publicAuthService.getCurrentUser();
    if (publicUser) {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

