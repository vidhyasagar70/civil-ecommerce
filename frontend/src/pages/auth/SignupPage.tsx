import { useState } from "react";
import { Chrome } from "lucide-react";
import PasswordInput from "../../components/Input/SignupInput";
import FormButton from "../../components/Button/FormButton";
import InputField from "../../components/Input/SignupInput";
import { useNavigate, Link } from "react-router-dom";
import { useSignUp, useUserInvalidate } from "../../api/userQueries";
import { saveAuth } from "../../ui/utils/auth";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const invalidateUser = useUserInvalidate();
  
  // Use the new TanStack Query mutation
  const signUpMutation = useSignUp();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const { confirmPassword, ...signUpData } = formData;
    
    signUpMutation.mutate(
      signUpData,
      {
        onSuccess: (data) => {
          // Save everything in localStorage
          saveAuth({
            token: data.token,
            email: data.user.email,
            role: data.user.role,
            userId: data.user.id,
            fullName: data.user.fullName
          });
          invalidateUser();
          
          alert("✅ Signup successful! Welcome to our platform.");
          navigate("/");
        },
        onError: (err: any) => {
          setError(err.response?.data?.message || "Something went wrong during signup");
          console.error("Signup failed:", err);
        }
      }
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="py-6 px-6 bg-gradient-to-r from-[#EFF6FF] to-[#F9F5FF] rounded-t-2xl flex flex-col items-center">
          <div className="bg-white p-3 rounded-2xl shadow-md">
            {/* <img src={logo} alt="Logo" className="h-12 w-12" /> */}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Create Account</h1>
          <p className="text-gray-800 mt-2 text-sm text-center">
            Join us to access software licenses and downloads
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          {/* Google Signup Button */}
          <div className="space-y-4">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition duration-200"
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/google`;
              }}
            >
              <Chrome className="w-5 h-5" /> Sign up with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">Or sign up with email</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              autoComplete="name"
            />

            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

            <InputField
              label="Phone Number (Optional)"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              autoComplete="tel"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                showPassword={showPassword}
                toggleShow={() => setShowPassword(!showPassword)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <PasswordInput
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                showPassword={showConfirmPassword}
                toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <FormButton
              type="submit"
              disabled={signUpMutation.isPending}
              variant="primary"
              size="lg"
              className="w-full mt-2"
            >
              {signUpMutation.isPending ? "Creating Account..." : "Create Account"}
            </FormButton>
          </form>

          {/* Terms and Signin Link */}
          <div className="mt-6 space-y-4">
            <p className="text-xs text-gray-500 text-center">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                Privacy Policy
              </Link>
            </p>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}