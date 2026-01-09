import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Posts from './pages/admin/Posts';
import Categories from './pages/admin/Categories';
import Contacts from './pages/admin/Contacts';
import Banners from './pages/admin/Banners';
import BannerTexts from './pages/admin/BannerTexts';
import Profile from './pages/admin/Profile';
import Chat from './pages/admin/Chat';
import Home from './pages/public/Home';
import PostDetail from './pages/public/PostDetail';
import Register from './pages/public/Register';
import PublicLogin from './pages/public/PublicLogin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NotificationProvider>
          <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Posts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Categories />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Contacts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banners"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Banners />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banner-texts"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <BannerTexts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Profile />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chat"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Chat />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<PublicLogin />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          
          {/* Default redirect for unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NotificationProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
