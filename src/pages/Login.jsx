import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, AUTH_STORAGE_KEY } from '../constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/api/services/auth/auth.query';

const Login = () => {

  const login = useLogin();


  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate({
      username: formData.username,
      password: formData.password,
    }, {
      onSuccess: () => {
        navigate(ROUTES.DASHBOARD);
      }
    });
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
              name="username"
              type="text"
              placeholder="Username"
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
