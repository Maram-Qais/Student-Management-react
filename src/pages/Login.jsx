import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import users from '../data/users.json';
import { LogIn, UserCog, UserCheck, User, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import Lottie from 'lottie-react'; 
import loginAnimation from '../assets/lottie/Login.json';  
import darkLoginAnimation from '../assets/lottie/darkmodelog.json'; 

export default function Login() {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      login(user);
      setError('');
      navigate(`/${user.role.toLowerCase()}`, { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  const handleDemoClick = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 font-[Merriweather] ${theme === 'light' ? 'bg-purple-50' : 'bg-gray-900'}`}>
      <div className={`flex flex-col sm:flex-row rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>

        {/* Top theme toggle */}
        <div className="absolute top-5 right-5 cursor-pointer" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={24} className="text-gray-800" /> : <Sun size={24} className="text-yellow-400" />}
        </div>

        {/* Left: Login form */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center items-center">
          <h1 className={`text-3xl font-bold mb-2 text-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Welcome to School Manager
          </h1>
          <p className={`mb-8 text-center ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>Login to continue</p>

          <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-6 py-3 rounded-lg border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 ${theme === 'light' ? 'bg-gray-100 border-gray-200 text-gray-800 focus:bg-white' : 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600'}`}
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-6 py-3 pr-12 rounded-lg border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 ${theme === 'light' ? 'bg-gray-100 border-gray-200 text-gray-800 focus:bg-white' : 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600'}`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="h-5 text-center">
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <button
              type="submit"
              className="tracking-wide font-semibold bg-gradient-to-r from-purple-700 to-blue-600 text-white w-full py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center focus:outline-none"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </button>
          </form>
           {/* demo ! */}
          <p className={`mt-8 text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>Try demo accounts!</p>
          <div className="mt-3 flex gap-4 justify-center">
            <button
              onClick={() => handleDemoClick("admin@school.test", "Admin@123")}
              className="flex flex-col items-center text-gray-600 hover:text-purple-700 text-xs transition"
            >
              <UserCog size={26} />
              <span className="mt-1">Admin</span>
            </button>
            <button
              onClick={() => handleDemoClick("teacher@school.test", "Teacher@123")}
              className="flex flex-col items-center text-gray-600 hover:text-purple-700 text-xs transition"
            >
              <UserCheck size={26} />
              <span className="mt-1">Teacher</span>
            </button>
            <button
              onClick={() => handleDemoClick("student@school.test", "Student@123")}
              className="flex flex-col items-center text-gray-600 hover:text-purple-700 text-xs transition"
            >
              <User size={26} />
              <span className="mt-1">Student</span>
            </button>
          </div>
        </div>

        {/* Right: Lottie animation (hidden only on extra-small screens) */}
        <div
          className={`hidden sm:flex w-1/2 items-center justify-center`}
        >
          <div className="w-4/5 max-w-md transform scale-110">
            <Lottie
              animationData={theme === 'light' ? loginAnimation : darkLoginAnimation}
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </div>
  );
}
