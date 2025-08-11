import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ROUTES } from '../constants';

const NotFound = () => {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 p-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold ">
            404
          </div>
        </div>

        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-secondary-600 mb-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for doesn't exist or has been moved to a different location.
        </p>

        <div className="space-y-4">
          <Button
            size='medium'
            variant='primary'
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            Go to Dashboard
          </Button>

          <div className="text-center">
            <p className="text-sm text-secondary-500">
              Or{' '}
              <button
                onClick={() => window.history.back()}
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                go back to previous page
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
