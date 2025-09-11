import React from 'react';
import { headerConfig } from './HeaderConfig';

interface DesktopNavigationProps {
  onNavigate: (href: string) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ onNavigate }) => {
  return (
    <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 mr-4">
      {headerConfig.navigation.map((item) => (
        <button
          key={item.href}
          onClick={() => onNavigate(item.href)}
          className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 whitespace-nowrap"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default DesktopNavigation;