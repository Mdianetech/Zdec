import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
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
              <img src="/image.png" alt="ZDEC" className="h-10 sm:h-12 lg:h-14 transition-all duration-300 hover:scale-105" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-sm lg:text-base font-semibold transition-all duration-300 hover:text-primary-600 relative py-2 px-2",
                  isActive 
                    ? "text-primary-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-600" 
                    : isScrolled ? "text-gray-700 hover:text-primary-600" : "text-white hover:text-primary-300"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden xl:flex items-center gap-4">
            <a 
              href="tel:+33622802645"
              className="btn btn-outline text-sm px-4 py-2 flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden 2xl:inline">06 22 80 26 45</span>
            </a>
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
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile menu panel */}
          <motion.div 
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link 
                to="/" 
                className="flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src="/image.png" alt="ZDEC" className="h-8" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 min-h-[44px] min-w-[44px]"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Fermer le menu</span>
              </button>
            </div>
            
            <div className="px-4 py-6 space-y-2 overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-colors min-h-[44px] flex items-center",
                    isActive 
                      ? "text-primary-600 bg-primary-50" 
                      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-6 mt-6 border-t border-gray-200">
                <a 
                  href="tel:+33622802645"
                  className="btn btn-primary w-full justify-center text-base py-3 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone className="h-5 w-5" />
                  06 22 80 26 45
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </header>
  );
};

export default Navbar;
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