import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

// Types
interface Category {
  id: number;
  name: string;
  products: number;
  icon: string;
}

// Sample data
const sampleCategories: Category[] = [
  { id: 1, name: "CAD Software", products: 4, icon: "📐" },
  { id: 2, name: "BIM Software", products: 1, icon: "🏢" },
  { id: 3, name: "Design Software", products: 3, icon: "🎨" },
  { id: 4, name: "Rendering", products: 2, icon: "🖼️" },
  { id: 5, name: "Simulation", products: 2, icon: "⚙️" },
  { id: 6, name: "Structural Analysis", products: 1, icon: "🏗️" }
];

const Categories: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Categories</h2>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-yellow-600 font-medium">
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCategories.map((category) => (
          <div key={category.id} className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-green-400">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-white mb-2">{category.name}</h3>
            <p className="text-gray-400">{category.products} products</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;