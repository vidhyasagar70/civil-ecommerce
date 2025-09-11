import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  showStrengthHint?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  label, 
  required, 
  showStrengthHint = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="block font-medium mb-1 text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          required={required}
          className={`w-full border-2 border-gray-300 p-3 pr-12 rounded-2xl focus:ring-2 focus:ring-blue-500/50  focus:border-2 focus:border-blue-500 placeholder-gray-400 transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none text-base font-medium shadow-sm hover:shadow-md focus:shadow-lg ${props.className || ''}`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1 rounded-md p-1 transition-colors duration-200"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {showStrengthHint && (
        <p className="text-xs text-gray-500 mt-1">
          Use at least 6 characters with a mix of letters, numbers and symbols
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
