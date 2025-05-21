import React from 'react';
import { Bell, Search } from 'lucide-react';

interface DashboardHeaderProps {
  children?: React.ReactNode;
}

const DashboardHeader = ({ children }: DashboardHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {children}
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-900">Espace Client</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="input pl-10 py-2 h-9"
                />
              </div>
            </div>
            <button
              type="button"
              className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary-500" />
              <Bell className="h-6 w-6" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold text-sm">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;