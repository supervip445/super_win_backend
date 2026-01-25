import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const sidebarLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/posts', label: 'Posts', icon: '📝' },
    { to: '/pig-vaccines', label: 'Pig Vaccines', icon: '💉' },
    { to: '/layer-vaccines', label: 'Layer Vaccines', icon: '🐔' },
    { to: '/products', label: 'Products', icon: '💊' },
    { to: '/contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <>
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-40 md:hidden bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
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

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-2xl z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:z-auto md:top-0 md:h-screen w-64`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🐷</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">SUPERWINLIVESTOCKGROUP</h3>
                <p className="text-xs text-gray-500">Navigation</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {sidebarLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(link.to)
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700'
                    }`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Quick Info</h4>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Business Hours:</strong> Mon - Sat 8:00 AM - 6:00 PM
              </p>
              <p className="text-sm text-gray-600">
                <strong>Contact:</strong> Available for inquiries
              </p>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/admin/login"
              className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

