import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Zap, X, Menu } from 'lucide-react';
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
      "sticky top-0 z-30 w-full transition-all duration-300",
      isScrolled 
        ? "bg-white shadow-elevation-2" 
        : "bg-transparent"
    )}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-gray-900">Zdec</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors hover:text-primary-600",
                  isActive ? "text-primary-600" : "text-gray-700"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/login"
              className="btn btn-outline"
            >
              Connexion
            </Link>
            <Link 
              to="/register"
              className="btn btn-primary"
            >
              Inscription
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
              <Zap className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-gray-900">Zdec</span>
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
            <div className="pt-6 flex flex-col space-y-4">
              <Link 
                to="/login"
                className="btn btn-outline w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link 
                to="/register"
                className="btn btn-primary w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inscription
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;