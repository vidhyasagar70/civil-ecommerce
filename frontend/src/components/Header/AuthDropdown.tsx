import React from 'react';
import { UserCheck, Shield } from 'lucide-react';
import { headerConfig } from './HeaderConfig';

interface AuthDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

const AuthDropdown: React.FC<AuthDropdownProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
      <button
        onClick={() => onNavigate(headerConfig.auth.customer.href)}
        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
      >
        <UserCheck className="w-4 h-4" />
        <span>{headerConfig.auth.customer.label}</span>
      </button>
      <button
        onClick={() => onNavigate(headerConfig.auth.admin.href)}
        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
      >
        <Shield className="w-4 h-4" />
        <span>{headerConfig.auth.admin.label}</span>
      </button>
    </div>
  );
};

export default AuthDropdown;