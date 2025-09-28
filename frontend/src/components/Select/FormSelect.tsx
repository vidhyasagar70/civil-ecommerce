import React from 'react';
import { useAdminTheme } from '../../contexts/AdminThemeContext';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  options: Option[];
}

const FormSelect: React.FC<FormSelectProps> = ({ label, required, options, ...props }) => {
  const { colors } = useAdminTheme();

  return (
    <div>
      {label && (
        <label
          className="block font-medium mb-1"
          style={{ color: colors.text.secondary }}
        >
          {label}{required && <span style={{ color: colors.status.error }}>*</span>}
        </label>
      )}
      <select
        {...props}
        required={required}
        className="w-full border p-2 rounded focus:ring-2 transition-colors duration-200"
        style={{
          backgroundColor: colors.background.primary,
          borderColor: colors.border.primary,
          color: colors.text.primary
        }}
        onFocus={(e) => {
          e.target.style.borderColor = colors.interactive.primary;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = colors.border.primary;
        }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{
              backgroundColor: colors.background.primary,
              color: colors.text.primary
            }}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
