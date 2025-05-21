import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-600 font-semibold">
          <Zap className="h-5 w-5" />
          <span>Zedek</span>
        </Link>
      </div>
      <motion.div 
        className="flex-grow flex items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card w-full max-w-md p-6 sm:p-8">
          <Outlet />
        </div>
      </motion.div>
      <div className="p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Zedek. Tous droits réservés.
      </div>
    </div>
  );
};

export default AuthLayout;