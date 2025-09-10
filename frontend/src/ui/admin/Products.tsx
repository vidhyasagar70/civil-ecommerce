import React, { useState } from 'react';
import { Search, List, Grid3X3, Plus, Eye, Edit, Trash2 } from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  version: string;
  company: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

// Sample data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "3ds Max 2024",
    version: "2024.1",
    company: "Autodesk",
    category: "Rendering",
    price: 2399,
    rating: 4.5,
    reviews: 278,
    image: "🎨"
  },
  {
    id: 2,
    name: "Adobe Creative Suite 2024",
    version: "2024",
    company: "Adobe",
    category: "Design Software",
    price: 2399,
    rating: 4.6,
    reviews: 445,
    image: "🎭"
  },
  {
    id: 3,
    name: "ANSYS Workbench",
    version: "2024 R1",
    company: "ANSYS",
    category: "Simulation",
    price: 4999,
    rating: 4.8,
    reviews: 89,
    image: "⚙️"
  },
  {
    id: 4,
    name: "AutoCAD 2024",
    version: "2024.1",
    company: "Autodesk",
    category: "CAD Software",
    price: 1999,
    rating: 4.8,
    reviews: 324,
    image: "📐"
  },
  {
    id: 5,
    name: "ETABS",
    version: "21.0.0",
    company: "Computers and Structures",
    category: "Structural Analysis",
    price: 2999,
    rating: 4.7,
    reviews: 98,
    image: "🏗️"
  }
];

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

const Products: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            {sampleCategories.map((cat) => (
              <option key={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
            <option>All Companies</option>
            {sampleCompanies.map((comp) => (
              <option key={comp.id}>{comp.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Price (1-year)</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{product.image}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.version}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{product.company}</td>
                  <td className="py-4 px-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium">₹{product.price.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-gray-500">({product.reviews})</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;