import React, { useState } from 'react';
import PasswordInput from '../../components/Input/SignupInput';
// import logo from '../../assets/logo.png';
import FormButton from '../../components/Button/FormButton';
import InputField from '../../components/Input/SignupInput';
import { signUp } from '../../api/auth';
import { saveAuth } from '../../ui/utils/auth';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const res = await signUp(
        formData.email,
        formData.password,
        formData.fullName,
        formData.phoneNumber
      );

      // Save everything in localStorage
      saveAuth({
        token: res.token,
        email: res.user.email,
        role: res.user.role,
        userId: res.user.id,
        fullName: res.user.fullName
      });

      alert('✅ Registration successful!');
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
      console.error('Registration failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
            {/* <img src={logo} alt="Logo" className="h-8 w-8" />q */}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Join thousands of engineers who trust our software solutions
          </p>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />

          <InputField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            showPassword={showPassword}
            toggleShow={() => setShowPassword(!showPassword)}
            placeholder="At least 6 characters"
            required
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            showPassword={showConfirmPassword}
            toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            placeholder="Confirm your password"
            required
          />

          <FormButton
            type="submit"
            disabled={loading}
            variant="primary"
            size="lg"
            className="w-full mt-4"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </FormButton>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}