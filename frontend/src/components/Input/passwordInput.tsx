import React from "react";
import EyeIcon from "../../assets/icons/EyeIcon";




interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShow: () => void;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  showPassword,
  toggleShow,
  placeholder = "Enter your password",
}) => {
  const commonInputClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          required
          autoComplete="current-password"
          className={commonInputClasses}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          <EyeIcon open={showPassword} />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
