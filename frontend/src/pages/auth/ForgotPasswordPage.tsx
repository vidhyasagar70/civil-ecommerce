import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import FormButton from "../../components/Button/FormButton";
import FormInput from "../../components/Input/FormInput";
import logo from "../../assets/logo.png";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Replace this with your actual API call
      // const response = await forgotPasswordAPI({ email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsEmailSent(true);
      
      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: "Please check your email for password reset instructions.",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to send reset email. Please try again.";
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

  const handleResendEmail = () => {
    setIsEmailSent(false);
    setEmail("");
  };

  if (isEmailSent) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="py-8 px-6 bg-gradient-to-r from-[#EFF6FF] to-[#F9F5FF] rounded-t-2xl flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Check Your Email</h1>
            <p className="text-gray-700 mt-2 text-sm text-center">
              We've sent password reset instructions to
            </p>
            <p className="text-indigo-600 font-medium text-sm mt-1">{email}</p>
          </div>

          {/* Body */}
          <div className="p-8 text-center space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Mail className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-blue-800">
                Please check your email inbox (and spam folder) for the password reset link.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the email?
              </p>
              
              <FormButton
                type="button"
                onClick={handleResendEmail}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Resend Email
              </FormButton>
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

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="py-6 px-6 bg-gradient-to-r from-[#EFF6FF] to-[#F9F5FF] rounded-t-2xl flex flex-col items-center">
          <div className="bg-white p-3 rounded-2xl shadow-md">
            <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Forgot Password?</h1>
          <p className="text-gray-800 mt-2 text-sm text-center">
            No worries! Enter your email and we'll send you reset instructions
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
            <FormInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />

            <FormButton 
              type="submit" 
              disabled={isLoading || !email.trim()} 
              className="w-full"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Send Reset Instructions
                </span>
              )}
            </FormButton>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• We'll send a secure link to your email</li>
              <li>• Click the link to create a new password</li>
              <li>• The link expires in 10mintues for security</li>
            </ul>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}