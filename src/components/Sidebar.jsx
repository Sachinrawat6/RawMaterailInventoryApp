import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaBoxOpen,
  FaShippingFast,
  FaUpload,
  FaThList,
  FaWarehouse,
  FaExclamationTriangle,
  FaCubes,
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebar = ({ isAuthenticated, user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const BASE_URL = "https://raw-material-backend.onrender.com"

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );

      // Clear local storage and context
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);

      toast.success('Logout successful!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
      });

      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      toast.error(err.response?.data?.message || 'Logout failed!', {
        position: 'top-center',
      });
    }
  };

  if (!isAuthenticated) return null;

  // Sidebar links
  const links = [
    { name: 'Store1', icon: <FaThList />, path: '/', category: 'Overview' },
    { name: 'Store2', icon: <FaThList />, path: '/stock2', category: 'Overview' },
    { name: 'Accessory', icon: <FaThList />, path: '/accessory-stock', category: 'Overview' },
    { name: 'Style Management', icon: <FaCubes />, path: '/style-number', category: 'Inventory' },
    { name: 'Fabric Relations', icon: <FaCubes />, path: '/meter-and-kg', category: 'Relations' },
    { name: 'Low Stock Alert', icon: <FaExclamationTriangle />, path: '/low-stock', category: 'Monitoring' },
    { name: 'Doc', icon: <FaExclamationTriangle />, path: 'https://github.com/sachin-dev-at-qurvii/docs/blob/main/doc.md', category: 'Docs' },
  ];

  const protectedLinks = [
    { name: 'Store1', icon: <FaThList />, path: '/', category: 'Overview' },
    { name: 'Store2', icon: <FaThList />, path: '/stock2', category: 'Overview' },
    { name: 'Accessory', icon: <FaThList />, path: '/accessory-stock', category: 'Overview' },
    { name: 'Latest Purchase', icon: <FaThList />, path: '/latest-purchase', category: 'Overview' },
    { name: 'Purchase History', icon: <FaThList />, path: '/fabric-purchase-history', category: 'Overview' },
    { name: 'Averages', icon: <FaThList />, path: '/fabric-average', category: 'Overview' },
    { name: 'Style Management', icon: <FaCubes />, path: '/style-number', category: 'Inventory' },
    { name: 'Fabric Relations', icon: <FaCubes />, path: '/meter-and-kg', category: 'Relations' },
    { name: 'Add/Ship', icon: <FaBoxOpen />, path: '/add-ship', category: 'Operations' },
    { name: 'Accessory Update', icon: <FaBoxOpen />, path: '/accessory-update', category: 'Operations' },
    { name: 'Upload Stock', icon: <FaUpload />, path: '/upload-stock', category: 'Bulk Operations' },
    { name: 'Upload Averages', icon: <FaUpload />, path: '/upload-fabric-average', category: 'Bulk Operations' },
    { name: 'Upload Fabric', icon: <FaUpload />, path: '/upload-fabric', category: 'Bulk Operations' },
    { name: 'Upload Relations', icon: <FaUpload />, path: '/upload-mtr-kg', category: 'Bulk Operations' },
    { name: 'Upload Accessory', icon: <FaUpload />, path: '/accessory-upload', category: 'Bulk Operations' },
    { name: 'Low Stock Alert', icon: <FaExclamationTriangle />, path: '/low-stock', category: 'Monitoring' },
    { name: 'Doc', icon: <FaExclamationTriangle />, path: 'https://github.com/sachin-dev-at-qurvii/docs/blob/main/doc.md', category: 'Docs' },

  ];


  const superAdmingLinks = [
    { name: 'Store1', icon: <FaThList />, path: '/', category: 'Overview' },
    { name: 'Store2', icon: <FaThList />, path: '/stock2', category: 'Overview' },
    { name: 'Accessory', icon: <FaThList />, path: '/accessory-stock', category: 'Overview' },
    { name: 'Latest Purchase', icon: <FaThList />, path: '/latest-purchase', category: 'Overview' },
    { name: 'Purchase History', icon: <FaThList />, path: '/fabric-purchase-history', category: 'Overview' },
    { name: 'Averages', icon: <FaThList />, path: '/fabric-average', category: 'Overview' },
    { name: 'Style Management', icon: <FaCubes />, path: '/style-number', category: 'Inventory' },
    { name: 'Fabric Relations', icon: <FaCubes />, path: '/meter-and-kg', category: 'Relations' },
    { name: 'Add/Ship', icon: <FaBoxOpen />, path: '/add-ship', category: 'Operations' },
    { name: 'Accessory Update', icon: <FaBoxOpen />, path: '/accessory-update', category: 'Operations' },
    { name: 'Upload Stock', icon: <FaUpload />, path: '/upload-stock', category: 'Bulk Operations' },
    { name: 'Upload Averages', icon: <FaUpload />, path: '/upload-fabric-average', category: 'Bulk Operations' },
    { name: 'Upload Fabric', icon: <FaUpload />, path: '/upload-fabric', category: 'Bulk Operations' },
    { name: 'Upload Relations', icon: <FaUpload />, path: '/upload-mtr-kg', category: 'Bulk Operations' },
    { name: 'Upload Accessory', icon: <FaUpload />, path: '/accessory-upload', category: 'Bulk Operations' },
    { name: 'Low Stock Alert', icon: <FaExclamationTriangle />, path: '/low-stock', category: 'Monitoring' },
    { name: 'Users', icon: <FaUser />, path: '/users-list', category: 'Monitoring' },
    { name: 'Doc', icon: <FaExclamationTriangle />, path: 'https://github.com/sachin-dev-at-qurvii/docs/blob/main/doc.md', category: 'Docs' },
  ];



  const rollBaseLinks = user?.role === "admin" ? protectedLinks : user?.role === "super-admin" ? superAdmingLinks : links;
  // Group links by category
  const groupedLinks = rollBaseLinks.reduce((acc, link) => {
    if (!acc[link.category]) acc[link.category] = [];
    acc[link.category].push(link);
    return acc;
  }, {});

  return (
    <div className="w-64 h-screen fixed bg-gradient-to-b from-gray-950 to-gray-900 text-white shadow-2xl flex flex-col border-r border-gray-800">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <FaWarehouse className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">FabricPro</h2>
            <p className="text-gray-400 text-sm">Inventory System</p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between mt-6 bg-gray-800 px-3 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

            <span className="text-gray-400 text-xs ml-1 truncate">({user?.role})</span>
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow">
            <FaUser className="text-sm text-white" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 space-y-6">
        {Object.entries(groupedLinks).map(([category, categoryLinks]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
              {category}
            </h3>
            <div className="space-y-1">
              {categoryLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 truncate px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-[1.02]'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <div className="text-lg">{link.icon}</div>
                  <span className="font-medium flex-1">{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-medium">Logout</span>
        </button>
        <div className="text-center mt-6">
          <span className="text-sm text-gray-300">{user?.emailid || 'User'}</span>
          <p className="text-sm text-gray-300">{user?.username || 'User'}</p>
          <p className="text-gray-500 text-xs">FabricPro v2.1</p>
          <p className="text-gray-600 text-xs mt-1">© 2024 Inventory System</p>
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
