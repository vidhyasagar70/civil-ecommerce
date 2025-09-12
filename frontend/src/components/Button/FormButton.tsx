import React from 'react';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const FormButton: React.FC<FormButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "px-4 py-2 rounded font-semibold";
  const variantClasses = variant === 'primary'
    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
    : "bg-gray-100 border text-gray-900";
  return (
    <button {...props} className={`${baseClasses} ${variantClasses} ${props.className || ''}`}>
      {children}
    </button>
  );
};

export default FormButton;
