import React from 'react';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const FormButton: React.FC<FormButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "px-4 py-2 rounded font-semibold transition-colors";
  const variantClasses = variant === 'primary'
    ? "bg-yellow-500 text-black hover:bg-yellow-400"
    : "bg-gray-700 border border-gray-600 text-white hover:bg-gray-600";
  return (
    <button {...props} className={`${baseClasses} ${variantClasses} ${props.className || ''}`}>
      {children}
    </button>
  );
};

export default FormButton;
