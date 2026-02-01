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
    <div className="card">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
