import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Nos services', path: '/services' },
    { name: 'IRVE', path: '/irve' },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100" 
        : "bg-transparent"
    )}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/image.png" alt="ZDEC" className="h-14 transition-all duration-300 hover:scale-105" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-sm font-semibold transition-all duration-300 hover:text-primary-600 relative py-2",
                  isActive 
                    ? "text-primary-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-600" 
                    : isScrolled ? "text-gray-700 hover:text-primary-600" : "text-white hover:text-primary-300"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "flex items-center justify-center p-2 rounded-lg transition-colors",
                isScrolled 
                  ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" 
                  : "text-white hover:text-gray-200 hover:bg-white/10"
              )}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Ouvrir le menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 z-50 bg-white"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-4">
            <Link 
              to="/" 
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src="/image.png" alt="ZDEC" className="h-10" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Fermer le menu</span>
            </button>
          </div>
          <div className="px-4 py-6 space-y-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "block text-base font-medium",
                  isActive ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;