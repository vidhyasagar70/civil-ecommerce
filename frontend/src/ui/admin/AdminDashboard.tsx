import React, { useState } from 'react';
import { BarChart3, Package, Tag, Building2, ShoppingCart, Settings as SettingsIcon } from 'lucide-react';
import Dashboard from './Dashboard';
import Products from './products/Products';
import type { MenuItem } from '../../types';

const AdminDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'products', label: 'Products', icon: Package, path: '/products' },
    { id: 'categories', label: 'Categories', icon: Tag, path: '/categories' },
    { id: 'companies', label: 'Companies', icon: Building2, path: '/companies' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/orders' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/settings' }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your e-commerce platform and monitor performance.</p>
          </div>
        </div>

        <div className="px-6">
          <nav className="flex space-x-8">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeMenu === item.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
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

      <div className="px-6 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;