import React from 'react';
import { headerConfig } from './HeaderConfig';
import { useAdminTheme } from '../../contexts/AdminThemeContext';

interface DesktopNavigationProps {
  onNavigate: (href: string) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ onNavigate }) => {
  const { colors } = useAdminTheme();

  return (
    <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 mr-4">
      {headerConfig.navigation.map((item) => (
        <button
          key={item.href}
          onClick={() => onNavigate(item.href)}
          className="font-medium transition-all duration-200 whitespace-nowrap hover:opacity-80"
          style={{ color: colors.text.secondary }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = colors.interactive.primary;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = colors.text.secondary;
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default DesktopNavigation;