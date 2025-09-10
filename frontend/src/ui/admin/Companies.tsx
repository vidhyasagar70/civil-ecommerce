import React from 'react';
import { Plus, Eye, Edit, Trash2, Building2 } from 'lucide-react';

// Types
interface Company {
  id: number;
  name: string;
  products: number;
}

// Sample data
const sampleCompanies: Company[] = [
  { id: 1, name: "Autodesk", products: 4 },
  { id: 2, name: "Microsoft", products: 3 },
  { id: 3, name: "Trimble", products: 2 },
  { id: 4, name: "Adobe", products: 2 },
  { id: 5, name: "ANSYS", products: 1 }
];

const Companies: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Companies</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600">
          <Plus className="w-4 h-4" />
          <span>Add Company</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Company Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Products</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="font-medium text-gray-900">{company.name}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-900">{company.products}</td>
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
  );
};

export default Companies;