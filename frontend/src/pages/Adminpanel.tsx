import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Tag, 
  Building2, 
  ShoppingCart, 
  Settings as settingsicon
} from 'lucide-react';

// Import components
import Dashboard from '../ui/admin/Dashboard';
import Products from '../ui/admin/Products';
import Categories from '../ui/admin/Categories';
import Companies from '../ui/admin/Companies';
import Orders from '../ui/admin//Orders';
import Settings from '../ui/admin/Settings';

type MenuType = 'dashboard' | 'products' | 'categories' | 'companies' | 'orders' | 'settings';

const AdminDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'products', label: 'Products', icon: Package, path: '/products' },
    { id: 'categories', label: 'Categories', icon: Tag, path: '/categories' },
    { id: 'companies', label: 'Companies', icon: Building2, path: '/companies' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/orders' },
    { id: 'settings', label: 'Settings', icon: settingsicon, path: '/settings' }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'categories':
        return <Categories />;
      case 'companies':
        return <Companies />;
      case 'orders':
        return <Orders />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your e-commerce platform and monitor performance.</p>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id as MenuType)}
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

      {/* Main Content */}
      <div className="px-6 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;