import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
}) => {
  const commonInputClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={commonInputClasses}
      />
    </div>
  );
};

export default InputField;
