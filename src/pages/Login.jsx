import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Login = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login({
      username: formData.username,
      password: formData.password,
    });

    if (result.success) {
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <h1 className="text-xl font-bold text-gray-900">
            BUISINESS NAME | LOGO
          </h1>
          <form onSubmit={handleSubmit} className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            <h1 className="text-xl font-semibold">
              Welcome Back !
            </h1>
            {error && (
              <div className="w-full p-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                {error}
              </div>
            )}
            <Input
              name="username"
              type="text"
              placeholder="Username"
              className="text-sm"
              required
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="text-sm"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
