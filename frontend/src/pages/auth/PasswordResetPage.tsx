import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Lock, ArrowLeft, CheckCircle, Eye, EyeOff, Mail } from "lucide-react";
import Swal from "sweetalert2";
import FormButton from "../../components/Button/FormButton";
import FormInput from "../../components/Input/FormInput";
import { validateResetTokenAPI, resetPasswordAPI } from "../../services/api";
import logo from "../../assets/logo.png";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [error, setError] = useState("");
  const [isValidToken, setIsValidToken] = useState(true);
  const [tokenValidating, setTokenValidating] = useState(true);

  const { token } = useParams();
  const navigate = useNavigate();

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false);
        setTokenValidating(false);
        return;
      }

      try {
        await validateResetTokenAPI(token);
        setIsValidToken(true);
      } catch (err) {
        console.error('Token validation failed:', err);
        setIsValidToken(false);
      } finally {
        setTokenValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (pwd: string) => {
    const minLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    // Validate email
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    const validation = validatePassword(password);
    if (!validation.isValid) {
      setError("Password does not meet security requirements");
      return;
    }

    setIsLoading(true);

    try {
      await resetPasswordAPI({ token, email, password });
      
      setIsPasswordReset(true);
      
      Swal.fire({
        icon: "success",
        title: "Password Reset Successfully!",
        text: "Your password has been updated. You can now sign in with your new password.",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 3000);

    } catch (err: any) {
      const errorMessage = err.message || "Failed to reset password. Please try again.";
      setError(errorMessage);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Token validation loading state
  if (tokenValidating) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <div className="animate-spin mx-auto h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-600">Validating reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!isValidToken) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="py-8 px-6 bg-gradient-to-r from-red-50 to-red-100 rounded-t-2xl flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <Lock className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Invalid Reset Link</h1>
            <p className="text-gray-700 mt-2 text-sm text-center">
              This password reset link is invalid or has expired
            </p>
          </div>

          {/* Body */}
          <div className="p-8 text-center space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                The link may have expired or been used already. Please request a new password reset.
              </p>
            </div>

            <div className="space-y-4">
              <Link to="/forgot-password">
                <FormButton className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Request New Reset Link
                </FormButton>
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/signin"
                className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isPasswordReset) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="py-8 px-6 bg-gradient-to-r from-green-50 to-green-100 rounded-t-2xl flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Password Reset Complete</h1>
            <p className="text-gray-700 mt-2 text-sm text-center">
              Your password has been successfully updated
            </p>
          </div>

          {/* Body */}
          <div className="p-8 text-center space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                You can now sign in with your new password. You'll be redirected to the sign in page shortly.
              </p>
            </div>

            <Link to="/signin">
              <FormButton className="w-full bg-indigo-600 hover:bg-indigo-700">
                Continue to Sign In
              </FormButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const passwordValidation = validatePassword(password);
  const isEmailValid = validateEmail(email);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="py-6 px-6 bg-gradient-to-r from-[#EFF6FF] to-[#F9F5FF] rounded-t-2xl flex flex-col items-center">
          <div className="bg-white p-3 rounded-2xl shadow-md">
            <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Reset Your Password</h1>
          <p className="text-gray-800 mt-2 text-sm text-center">
            Verify your email and create a strong, secure password for your account
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Back to Sign In Link */}
          <div className="mb-6">
            <Link
              to="/signin"
              className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign In
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="relative">
              <FormInput
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className={`pl-10 ${
                  email && !isEmailValid 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : email && isEmailValid 
                    ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                    : ''
                }`}
              />
              <div className="absolute left-3 top-9 pointer-events-none">
                <Mail className={`h-5 w-5 ${
                  email && !isEmailValid 
                    ? 'text-red-400' 
                    : email && isEmailValid 
                    ? 'text-green-400'
                    : 'text-gray-400'
                }`} />
              </div>
              {email && (
                <div className="absolute right-3 top-9 pointer-events-none">
                  {isEmailValid ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-red-400"></div>
                  )}
                </div>
              )}
            </div>

            {/* Email validation message */}
            {email && !isEmailValid && (
              <div className="text-sm text-red-600 -mt-4">
                Please enter a valid email address
              </div>
            )}

            {/* Password Input */}
            <div className="relative">
              <FormInput
                label="New Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <FormInput
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
                className={`pr-10 ${
                  confirmPassword && password !== confirmPassword 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : confirmPassword && password === confirmPassword && password
                    ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                    : ''
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors z-10"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Password Requirements:</h4>
                <div className="space-y-2">
                  <div className={`flex items-center text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                    <CheckCircle className={`h-3 w-3 mr-2 ${passwordValidation.minLength ? 'text-green-500' : 'text-gray-400'}`} />
                    At least 8 characters
                  </div>
                  <div className={`flex items-center text-xs ${passwordValidation.hasUpper ? 'text-green-600' : 'text-gray-500'}`}>
                    <CheckCircle className={`h-3 w-3 mr-2 ${passwordValidation.hasUpper ? 'text-green-500' : 'text-gray-400'}`} />
                    One uppercase letter
                  </div>
                  <div className={`flex items-center text-xs ${passwordValidation.hasLower ? 'text-green-600' : 'text-gray-500'}`}>
                    <CheckCircle className={`h-3 w-3 mr-2 ${passwordValidation.hasLower ? 'text-green-500' : 'text-gray-400'}`} />
                    One lowercase letter
                  </div>
                  <div className={`flex items-center text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                    <CheckCircle className={`h-3 w-3 mr-2 ${passwordValidation.hasNumber ? 'text-green-500' : 'text-gray-400'}`} />
                    One number
                  </div>
                  <div className={`flex items-center text-xs ${passwordValidation.hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                    <CheckCircle className={`h-3 w-3 mr-2 ${passwordValidation.hasSpecial ? 'text-green-500' : 'text-gray-400'}`} />
                    One special character
                  </div>
                </div>
              </div>
            )}

            {/* Password Match Indicator */}
            {confirmPassword && (
              <div className={`text-sm flex items-center ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                <CheckCircle className={`h-4 w-4 mr-2 ${password === confirmPassword ? 'text-green-500' : 'text-red-500'}`} />
                {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </div>
            )}

            <FormButton 
              type="submit" 
              disabled={
                isLoading || 
                !email.trim() || 
                !isEmailValid ||
                !password.trim() || 
                !confirmPassword.trim() || 
                password !== confirmPassword || 
                !passwordValidation.isValid
              } 
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting Password...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Reset Password
                </span>
              )}
            </FormButton>
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Security Tips:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use a unique password you haven't used before</li>
              <li>• Consider using a password manager</li>
              <li>• Don't share your password with anyone</li>
              <li>• Make sure the email matches your account email</li>
            </ul>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Need help?{" "}
            <Link to="/contact" className="font-medium text-indigo-600 hover:text-indigo-500">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}