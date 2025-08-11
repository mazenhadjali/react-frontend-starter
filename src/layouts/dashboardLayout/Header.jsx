import { useNavigate } from 'react-router-dom';
import { ROUTES, AUTH_STORAGE_KEY } from '../../constants';
import Button from '../../components/Button';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="bg-white shadow-soft border-b border-secondary-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-secondary-800">
            Dashboard
          </h1>
          <p className="text-sm text-secondary-500 mt-1">Welcome back to your admin panel</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 px-4 py-2 rounded-xl border border-secondary-200">
            <div className="w-8 h-8 rounded-full flex items-center bg-gray-400 justify-center text-white font-semibold text-sm shadow-medium">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-secondary-700">[ User Name ]</span>
              <span className="text-xs text-secondary-500">[ Role ]</span>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            size='medium'
            variant='danger'
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
