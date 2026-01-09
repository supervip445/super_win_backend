import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { to: '/', label: 'Home' },
      { to: '/posts', label: 'Posts' },
      { to: '/donations', label: 'Donations' },
    ],
    resources: [
      { to: '/posts', label: 'Latest Posts' },
      { to: '/donations', label: 'Support Us' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">ဓ</span>
              </div>
              <h3 className="text-xl font-bold">မဟာဝိဇိတာရာမတိုက်</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              A place of peace, wisdom, and compassion. We are dedicated to spreading the teachings of the Buddha and providing a peaceful environment for meditation and learning.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <span>📘</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <span>📺</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition"
                aria-label="Contact"
              >
                <span>📧</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-amber-400 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-amber-400 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} မဟာဝိဇိတာရာမတိုက် Dhamma Center Monastery. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Ashin Nandamala</span>
              <span className="hidden md:inline">•</span>
              <Link to="/admin/login" className="hover:text-amber-400 transition">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

