import React from 'react';
import { Eye, Edit } from 'lucide-react';

// Types
interface Order {
  id: number;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

// Sample data
const sampleOrders: Order[] = [
  { id: 1001, customer: "John Doe", product: "AutoCAD 2024", amount: 1999, status: "completed", date: "2024-09-10" },
  { id: 1002, customer: "Jane Smith", product: "3ds Max 2024", amount: 2399, status: "pending", date: "2024-09-09" },
  { id: 1003, customer: "Mike Johnson", product: "ANSYS Workbench", amount: 4999, status: "completed", date: "2024-09-08" },
  { id: 1004, customer: "Sarah Wilson", product: "Adobe Creative Suite", amount: 2399, status: "cancelled", date: "2024-09-07" },
  { id: 1005, customer: "Tom Brown", product: "ETABS", amount: 2999, status: "pending", date: "2024-09-06" },
  { id: 1006, customer: "Emily Davis", product: "Revit 2024", amount: 3499, status: "completed", date: "2024-09-05" },
  { id: 1007, customer: "Robert Chen", product: "SolidWorks Premium", amount: 5299, status: "pending", date: "2024-09-04" },
  { id: 1008, customer: "Lisa Anderson", product: "Maya 2024", amount: 2799, status: "cancelled", date: "2024-09-03" },
  { id: 1009, customer: "David Kumar", product: "SketchUp Pro", amount: 1899, status: "completed", date: "2024-09-02" },
  { id: 1010, customer: "Maria Garcia", product: "Blender Studio", amount: 999, status: "pending", date: "2024-09-01" }
];

const Orders: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <div className="flex items-center space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Export Orders
          </button>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">
              {sampleOrders.filter(order => order.status === 'completed').length}
            </h3>
            <p className="text-gray-600">Completed Orders</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-600">
              {sampleOrders.filter(order => order.status === 'pending').length}
            </h3>
            <p className="text-gray-600">Pending Orders</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-600">
              {sampleOrders.filter(order => order.status === 'cancelled').length}
            </h3>
            <p className="text-gray-600">Cancelled Orders</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-blue-600">#{order.id}</td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{order.customer}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{order.product}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">₹{order.amount.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        order.status === 'completed' ? 'bg-green-500' :
                        order.status === 'pending' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></span>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {new Date(order.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Order"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Order"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing 1 to {sampleOrders.length} of {sampleOrders.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;