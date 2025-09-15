import { useState } from "react";
import { Chrome } from "lucide-react"; // Using Chrome icon as Google icon
import PasswordInput from "../../components/Input/SignupInput";
// import logo from "../../assets/logo.png";
import FormButton from "../../components/Button/FormButton";
import InputField from "../../components/Input/SignupInput";
import { signIn } from "../../api/auth";
import { saveAuth } from "../../ui/utils/auth";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Login handler
  async function handleLogin(email: string, password: string) {
    try {
      const res = await signIn(email, password);

      // Save everything in localStorage
      saveAuth({
        token: res.token,
        email: res.user.email,
        role: res.user.role,
        userId: res.user.id,
        fullName: res.user.fullName
      });

      alert("✅ Login successful!");
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      console.error("Login failed:", err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await handleLogin(email, password);
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="py-6 px-6 bg-gradient-to-r from-[#EFF6FF] to-[#F9F5FF] rounded-t-2xl flex flex-col items-center">
          <div className="bg-white p-3 rounded-2xl shadow-md">
            {/* <img src={logo} alt="Logo" className="h-12 w-12" /> */}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Welcome Back</h1>
          <p className="text-gray-800 mt-2 text-sm text-center">
            Sign in to access your software licenses and downloads
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Error Message */}
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          {/* Google Login Button */}
          <div className="space-y-4">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition duration-200"
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/google`;
              }}
            >
              <Chrome className="w-5 h-5" /> Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">Or continue with email</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
            />

            <FormButton
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {loading ? "Signing in..." : "Sign In to Your Account"}
            </FormButton>
          </form>

          {/* Signup Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}