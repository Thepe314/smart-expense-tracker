import { useState } from "react";
import { authService } from "../../services/api";
import { toast } from "react-toastify";


interface Props {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<Props> = ({ setIsLoggedIn }) => {
    const [email,setEmail] =useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

const handleLogin = async (e:React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try{
        const {user} = await authService.login(email,password);
        toast.success('Welcome back, ${user.email} !');
        setIsLoggedIn(true);

    }catch(error:any){
        toast.error(error.response?.data?.message || 'login failed');
    }finally{
        setLoading(false);

    }
};
    
 return (
  <div className="bg-gradient-to-br from-slate-50 via-teal-50 to-indigo-50 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-12 lg:px-32">
    <div className="bg-emerald-500/10 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-10 w-full max-w-sm md:max-w-md lg:max-w-2xl">

      {/* 1. HERO HEADER */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-300 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl animate-float">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="12" rx="2" ry="2" />
            <path d="M2 7h20v4H2z" />
          </svg>
        </div>

        <h1 className="text-4xl bg-gradient-to-r from-gray-900 via-gray-700 to-teal-900 bg-clip-text text-transparent font-black mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-600 text-lg">Sign in securely to continue</p>
      </div>

      {/* 2. FORM */}
      <form onSubmit={handleLogin} className="space-y-8">

        {/* EMAIL INPUT */}
        <div className="relative group">
          <label className="absolute -top-8 left-3 px-2 text-xl text-gray-500 bg-white/90 backdrop-blur-sm rounded-full transition-all group-focus-within:text-blue-600">
            Email Address
          </label>
          <input
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 pl-12 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100/50 transition-all duration-300 hover:border-gray-300 group-hover:shadow-md disabled:opacity-50"
            required
            disabled={loading}
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-4 top-5 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </div>

        {/* PASSWORD INPUT */}
        <div className="relative group">
          <label className="absolute -top-8 left-3 px-2 text-xl text-gray-500 bg-white/90 backdrop-blur-sm rounded-full transition-all group-focus-within:text-blue-600">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 pl-12 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100/50 transition-all duration-300 hover:border-gray-300 group-hover:shadow-md disabled:opacity-50"
            required
            disabled={loading}
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-4 top-5 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full text-white bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 hover:from-blue-700 hover:via-indigo-400 hover:to-blue-700 p-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 group-hover:rotate-12 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path />
                </svg>
                Sign In
              </>
            )}
          </span>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>

      </form>
    </div>
  </div>
);
}
export default Login;
