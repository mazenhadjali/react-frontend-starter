import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, AUTH_STORAGE_KEY } from '../constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="text-sm"
              required
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="text-sm"
              required
              onChange={handleChange}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
