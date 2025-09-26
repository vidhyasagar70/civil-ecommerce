import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="E-commerce Platform"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="admin@platform.com"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Currency
              </label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Email Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-yellow-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Order Alerts</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-yellow-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Low Stock Alerts</span>
              <input type="checkbox" className="w-4 h-4 accent-yellow-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">User Registration</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
          <div className="space-y-4">
            <button className="w-full bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-400 font-medium">
              Change Password
            </button>
            <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500">
              Two-Factor Authentication
            </button>
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400">
              Clear Cache
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">System Info</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Version:</span>
              <span className="text-white">v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Update:</span>
              <span className="text-white">Sept 10, 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Database:</span>
              <span className="text-green-400">Connected</span>
            </div>
            <div className="flex justify-between">
              <span>Storage:</span>
              <span className="text-white">2.4GB / 10GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;