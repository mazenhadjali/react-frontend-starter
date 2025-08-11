import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, AUTH_STORAGE_KEY } from '../constants';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple authentication logic - in real app, this would be API call
    if (formData.email && formData.password) {
      // Store authentication state (in real app, use proper auth state management)
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      navigate(ROUTES.DASHBOARD);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-large w-full max-w-md border border-secondary-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-medium">
            <span className="text-2xl font-bold text-white">A</span>
          </div>
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-secondary-500">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-secondary-400"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-secondary-400"
              placeholder="Enter your password"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-600">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-medium hover:shadow-large transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-secondary-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
