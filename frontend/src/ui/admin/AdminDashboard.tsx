// ui/admin/AdminDashboard.tsx
import React, { useState } from 'react';
import {
  BarChart3,
  Package,
  Tag,
  Building2,
  ShoppingCart,
  Settings as SettingsIcon,
  Users,Image 
} from 'lucide-react';
import Dashboard from './Dashboard';
import Products from './products/Products';
import Categories from './Categories';
import Companies from './Companies';
import Orders from './Orders';
import Settings from './Settings';
import UserManagement from './users/UserManagement';
import Banner from './Banner';
type MenuType = 'dashboard'|'users' | 'products' | 'categories' | 'companies' | 'orders' | 'settings' | 'banner';

const AdminDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'banner', label: 'Banner', icon: Image },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'products':
        return <Products />;
      case 'categories':
        return <Categories />;
      case 'companies':
        return <Companies />;
      case 'orders':
        return <Orders />;
        case 'banner': 
        return <Banner />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-xl border-b border-gray-700">
        <div className="px-6 py-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your e-commerce platform</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="px-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id as MenuType)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${activeMenu === item.id
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;