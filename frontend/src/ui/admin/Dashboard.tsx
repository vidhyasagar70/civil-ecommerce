import React from 'react';
import { TrendingUp, Users, Package2, BarChart3 } from 'lucide-react';
import type { Category, Company } from '../../types';

const Dashboard: React.FC = () => {
  const sampleCategories: Category[] = [
    { id: 1, name: "CAD Software", products: 4, icon: "📐" },
    { id: 2, name: "BIM Software", products: 1, icon: "🏢" },
    { id: 3, name: "Design Software", products: 3, icon: "🎨" },
    { id: 4, name: "Rendering", products: 2, icon: "🖼️" },
    { id: 5, name: "Simulation", products: 2, icon: "⚙️" },
    { id: 6, name: "Structural Analysis", products: 1, icon: "🏗️" }
  ];

  const sampleCompanies: Company[] = [
    { id: 1, name: "Autodesk", products: 4 },
    { id: 2, name: "Microsoft", products: 3 },
    { id: 3, name: "Trimble", products: 2 },
    { id: 4, name: "Adobe", products: 2 },
    { id: 5, name: "ANSYS", products: 1 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white">₹12,54,300</p>
              <p className="text-sm text-green-400 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-white">15</p>
              <p className="text-sm text-yellow-400">10 Categories</p>
            </div>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <Package2 className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Registered Users</p>
              <p className="text-2xl font-bold text-white">347</p>
              <p className="text-sm text-green-400">Active Today: 89</p>
            </div>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-white">1,286</p>
              <p className="text-sm text-green-400">Today: 23 orders</p>
            </div>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Product Categories</h3>
          <div className="space-y-3">
            {sampleCategories.slice(0, 2).map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-white">{category.name}</span>
                </div>
                <span className="text-sm text-gray-400">{category.products} products</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Top Companies</h3>
          <div className="space-y-3">
            {sampleCompanies.slice(0, 3).map((company) => (
              <div key={company.id} className="flex items-center justify-between">
                <span className="font-medium text-white">{company.name}</span>
                <span className="text-sm text-gray-400">{company.products} products</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;