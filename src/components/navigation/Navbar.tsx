import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'IRVE', path: '/irve' },
    { name: 'Réalisations', path: '/projects' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/image.png" 
                alt="Zdec Logo" 
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
              <span className={`text-xl lg:text-2xl font-bold transition-colors ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Zdec
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-colors hover:text-primary-600 ${
                    location.pathname === item.path
                      ? 'text-primary-600'
                      : scrolled
                      ? 'text-gray-700'
                      : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="tel:+33622802645"
                className={`flex items-center space-x-2 text-sm transition-colors ${
                  scrolled ? 'text-gray-600 hover:text-primary-600' : 'text-white/80 hover:text-white'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>06 22 80 26 45</span>
              </a>
              <Link
                to="/contact"
                className="btn btn-primary text-sm px-4 py-2"
              >
                Devis gratuit
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`font-medium py-2 transition-colors ${
                        location.pathname === item.path
                          ? 'text-primary-600'
                          : 'text-gray-700 hover:text-primary-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-gray-200">
                    <a
                      href="tel:+33622802645"
                      className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-3"
                    >
                      <Phone className="h-4 w-4" />
                      <span>06 22 80 26 45</span>
                    </a>
                    <Link
                      to="/contact"
                      className="btn btn-primary w-full text-center"
                    >
                      Devis gratuit
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;