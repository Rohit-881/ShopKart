import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import axiosInstance from '../axiosCalls/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '',
    terms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.repeatPassword) {
      return setError("Passwords do not match.");
    }
    if (!formData.terms) {
      return setError("You must agree to the Terms of Service.");
    }

    setLoading(true);

    try {
      await axiosInstance.post('/customers/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image & Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/register-bg.jpg")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-violet-900/95"></div>
      </div>

      <div className="max-w-md w-full relative z-10 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            CREATE ACCOUNT
          </h2>
        </div>
        
        <form className="space-y-5" autoComplete="off" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                required
                autoComplete="new-password"
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
                autoComplete="new-password"
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                autoComplete="new-password"
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                minLength={6}
                autoComplete="new-password"
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
                value={formData.password}
                onChange={handleChange}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="relative">
              <input
                id="repeatPassword"
                name="repeatPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Repeat your password"
                required
                minLength={6}
                autoComplete="new-password"
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
                value={formData.repeatPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-teal-500 focus:ring-teal-400 border-gray-300 rounded"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="ml-2 block text-xs text-gray-500">
              I agree all statements in <a href="#" className="underline hover:text-gray-800">Terms of service</a>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-bold text-white bg-gradient-to-r from-indigo-300 to-teal-300 hover:from-indigo-400 hover:to-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'PROCESSING...' : 'SIGN UP'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-xs font-medium text-gray-600">
            Have already an account ?{' '}
            <Link to="/login" className="font-bold text-gray-900 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
