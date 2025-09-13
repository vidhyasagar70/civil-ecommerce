import React from 'react';
import { Search, Phone, UserCheck, Shield, X } from 'lucide-react';
import { headerConfig } from './HeaderConfig';

interface MobileMenuProps {
  isOpen: boolean;
  searchQuery: string;
  onClose: () => void;
  onSearch: () => void;
  onSearchChange: (query: string) => void;
  onSearchKeyPress: (e: React.KeyboardEvent) => void;
  onNavigate: (href: string) => void;
  categoryOptions: { value: string; label: string }[];
  companyOptions: { value: string; label: string }[];
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCompanyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  searchQuery,
  onClose,
  onSearch,
  onSearchChange,
  onSearchKeyPress,
  onNavigate
}) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="px-2 sm:px-4 py-2 sm:py-4 space-y-1">
        {/* Mobile search */}
        <div className="relative mb-3 sm:mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={onSearchKeyPress}
            placeholder={headerConfig.search.placeholder}
            className="w-full pl-4 pr-12 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={onSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile navigation */}
        <div className="space-y-1">
          {headerConfig.navigation.map((item) => (
            <button
              key={item.href}
              onClick={() => onNavigate(item.href)}
              className="block w-full text-left px-3 py-2 sm:py-3 text-base text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Auth Options */}
        <div className="pt-2 border-t border-gray-200">
          <div className="space-y-2">
            <button
              onClick={() => onNavigate(headerConfig.auth.customer.href)}
              className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <UserCheck className="w-5 h-5" />
              <span>{headerConfig.auth.customer.label}</span>
            </button>
            <button
              onClick={() => onNavigate(headerConfig.auth.admin.href)}
              className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <Shield className="w-5 h-5" />
              <span>{headerConfig.auth.admin.label}</span>
            </button>
          </div>
        </div>

        {/* Mobile contact */}
        <div className="px-3 py-2 sm:py-3 border-t border-gray-200 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 text-gray-700">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Need help?</span>
            </div>
            <a
              href={headerConfig.contact.phoneHref}
              className="font-semibold text-blue-600 hover:text-blue-800 text-sm sm:text-base"
            >
              {headerConfig.contact.phone}
            </a>
          </div>
        </div>

        {/* Mobile legal links */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex flex-col space-y-2 sm:flex-row sm:flex-wrap sm:space-y-0 sm:space-x-4">
            {headerConfig.legal.map((link) => (
              <button
                key={link.href}
                onClick={() => onNavigate(link.href)}
                className="text-left px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;