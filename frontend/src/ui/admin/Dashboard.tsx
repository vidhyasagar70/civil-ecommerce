import React from 'react';
import { TrendingUp, Users, Package2, BarChart3 } from 'lucide-react';

// Sample data for categories and companies
const sampleCategories = [
  { id: 1, name: "CAD Software", products: 4, icon: "📐" },
  { id: 2, name: "BIM Software", products: 1, icon: "🏢" },
  { id: 3, name: "Design Software", products: 3, icon: "🎨" },
  { id: 4, name: "Rendering", products: 2, icon: "🖼️" },
  { id: 5, name: "Simulation", products: 2, icon: "⚙️" },
  { id: 6, name: "Structural Analysis", products: 1, icon: "🏗️" }
];

const sampleCompanies = [
  { id: 1, name: "Autodesk", products: 4 },
  { id: 2, name: "Microsoft", products: 3 },
  { id: 3, name: "Trimble", products: 2 },
  { id: 4, name: "Adobe", products: 2 },
  { id: 5, name: "ANSYS", products: 1 }
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹12,54,300</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-blue-600">10 Categories</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Registered Users</p>
              <p className="text-2xl font-bold text-gray-900">347</p>
              <p className="text-sm text-green-600">Active Today: 89</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">1,286</p>
              <p className="text-sm text-green-600">Today: 23 orders</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories and Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h3>
          <div className="space-y-3">
            {sampleCategories.slice(0, 2).map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <span className="text-sm text-gray-500">{category.products} products</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Companies</h3>
          <div className="space-y-3">
            {sampleCompanies.slice(0, 3).map((company) => (
              <div key={company.id} className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{company.name}</span>
                <span className="text-sm text-gray-500">{company.products} products</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;