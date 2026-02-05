import React, { useState, useCallback,type SyntheticEvent } from "react";
import { authService } from "../../services/api";
import { toast } from "react-toastify";
import { Mail, Lock, Loader2, UserPlus, ArrowRight, LockKeyhole, WalletCardsIcon } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 


const Signup: React.FC = ({ }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword,setConfirmPassword]=useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();

  // Validate form inputs with clear rules
  const validateForm = useCallback(() => {
  const newErrors: typeof errors = {};
  // Better email regex
  if (!email) newErrors.email = "Email is required";
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = "Enter a valid email";
  if (!password) newErrors.password = "Password is required";
  else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
  else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) newErrors.password = "Use uppercase, lowercase, and number";
  if (confirmPassword !== password) newErrors.confirmPassword = "Passwords don't match";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}, [email, password, confirmPassword]);


 const handleSignup = async (e: SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!validateForm()) return;
  setLoading(true);
  try {
    const { user } = await authService.signup(email, password);
    toast.success(`Welcome, ${user.email}! Account created.`);
    navigate('/login');
  } catch (error: any) {
    toast.error(error.response?.data?.message || error.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};

//signup navigate
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-white/50 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <WalletCardsIcon className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
          <div>
              <h1 className="text-3xl font-inter font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent tracking-tight">
              Sign up Now!
            </h1>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Form Input */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-inter font-medium text-gray-700 tracking-tight text-left">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="email"
                type="email"
                placeholder="hello@example.com"
                onBlur={validateForm}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                  errors.email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-200 hover:border-gray-300"
                } disabled:opacity-50`}
                disabled={loading}
                required
              />
            </div>
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="space-y-1">
             <label htmlFor="password" className="block text-sm font-inter font-medium text-gray-700 tracking-tight text-left">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                onBlur={validateForm}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                  errors.password
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-200 hover:border-gray-300"
                } disabled:opacity-50`}
                disabled={loading}
                required
              />
            </div>
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

            {/* Confirm Password Input */}
          <div className="space-y-1">
               <label htmlFor="confirmPassword" className="block text-sm font-inter font-medium text-gray-700 tracking-tight text-left">
                    Confirm Password
                </label>
                <div className="relative">
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                    id="confirmPassword"
                    onBlur={validateForm}
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                    }}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                        errors.confirmPassword
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-200 hover:border-gray-300"
                    } disabled:opacity-50`}
                    disabled={loading}
                    required
                    />
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>

          {/* Signup Button */}
          <button
            type="submit"
             disabled={loading || Object.keys(errors).length > 0} 
              className="w-full font-inter font-semibold tracking-tight text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating an account...</span>
              </>
            ) : (
              <>
                <ArrowRight className="w-5 h-5" />
                <span>Sign up</span>
              </>
            )}
          </button>
        </form>

        {/* Go back to login Button */}
        <div className="pt-4 border-t border-blue-100">
        <button
             type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full font-inter font-semibold tracking-tight text-sm text-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 py-3 px-4 rounded-xl hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50">
            <UserPlus className="w-5 h-5" />
            <span>Already have an account? Sign In</span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
