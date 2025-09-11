import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  options: Option[];
}

const FormSelect: React.FC<FormSelectProps> = ({ label, required, options, ...props }) => (
  <div>
    <label className="block font-medium mb-1">
      {label}{required && <span className="text-red-500">*</span>}
    </label>
    <select
      {...props}
      required={required}
      className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default FormSelect;
