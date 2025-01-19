import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wind } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Wind className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Transformer.energy
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/assessment"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/assessment')
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Assessment
            </Link>
            <Link
              to="/map"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/map')
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Project Map
            </Link>
            <Link
              to="/network"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/network')
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Network
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;