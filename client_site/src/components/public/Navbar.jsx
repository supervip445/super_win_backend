import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MarqueeText from './MarqueeText';
import NotificationBell from './NotificationBell';
import { publicAuthService } from '../../services/publicAuthService';
import logoImage from '../../assets/logo.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [publicUser, setPublicUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = publicAuthService.getCurrentUser();
    setPublicUser(user);
  }, [location]);

  const handleLogout = () => {
    publicAuthService.logout();
    setPublicUser(null);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/posts', label: 'Posts', icon: '📝' },
    { to: '/pig-vaccines', label: 'Pig Vaccines', icon: '💉' },
    { to: '/layer-vaccines', label: 'Layer Vaccines', icon: '🐔' },
    { to: '/contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <>
      {/* Marquee Text - Using MarqueeText Component */}
      <MarqueeText />

      {/* Main Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img
                src={logoImage}
                alt="SUPERWINLIVESTOCKGROUP SUPERWINLIVESTOCKGROUP Logo"
                className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-full"
              />
              <div className="hidden sm:block">
                <span className="text-lg md:text-xl font-bold text-gray-800 block">SUPERWINLIVESTOCKGROUP</span>
                <span className="text-xs md:text-sm text-gray-600">SUPERWINLIVESTOCKGROUP</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(link.to)
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              <NotificationBell />
              {publicUser ? (
                <>
                  <div className="ml-4 px-4 py-2 text-gray-700 flex items-center space-x-2">
                    <span className="text-sm">👤 {publicUser.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="ml-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="ml-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    Login
                  </Link>
                </>
              )}
              <a
                href="https://drive.google.com/file/d/16IH01drYj_Gf9D-tcfz2fx2XzDfKjsbQ/view?usp=sharing"
                download
                className="ml-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center space-x-2"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>App</span>
              </a>
              <Link
                to="/admin/login"
                className="ml-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Admin
              </Link>
            </div>

            {/* Mobile Navigation - Notification Bell and Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <NotificationBell />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                aria-label="Toggle menu"
              >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200 mb-2">
                <span className="text-gray-700 font-semibold">Notifications</span>
                <NotificationBell />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition ${
                    isActive(link.to)
                      ? 'bg-amber-600 text-white'
                      : 'text-gray-700 hover:bg-amber-50'
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              {publicUser ? (
                <>
                  <div className="px-4 py-3 text-gray-700 border-b border-gray-200">
                    <span className="text-sm">👤 {publicUser.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    Login
                  </Link>
                </>
              )}
              <a
                href="https://goldencitycasino123.pro/assets/apk/app-release.apk"
                download
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center space-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Download App</span>
              </a>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Admin
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

