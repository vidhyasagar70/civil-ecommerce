import React, { useState } from 'react';
import { User, Phone } from 'lucide-react';
import SignupInput from '../Input/SignupInput';
import PasswordInput from './PasswordInput';

interface SignupFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="flex items-center gap-2 font-medium mb-1 text-gray-700">
          <User className="text-gray-400 w-5 h-5" />
          Full Name
        </label>
        <SignupInput
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleInputChange}
          required
          placeholder="Rajesh Kumar"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="flex items-center gap-2 font-medium mb-1 text-gray-700">
          <Phone className="text-gray-400 w-5 h-5" />
          Phone Number
        </label>
        <SignupInput
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
          placeholder="+91 98765 43210"
        />
      </div>

      {/* Email Address */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Email Address
        </label>
        <SignupInput
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="rajesh.kumar@email.com"
        />
      </div>

      {/* Password */}
      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
        showStrengthHint
        placeholder="Create a strong password (min 6 chars)"
      />

      {/* Confirm Password */}
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        required
        placeholder="Confirm your password"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-white hover:from-blue-700 hover:to-purple-700 px-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 h-12 sm:h-14 text-base font-semibold rounded-xl"
      >
        Create Your Account
      </button>
    </form>
  );
};

export default SignupForm;
