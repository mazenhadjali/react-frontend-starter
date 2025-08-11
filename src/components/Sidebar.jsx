import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS, ROUTES } from '../constants';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-br from-primary-800 to-primary-900 shadow-large">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-8 tracking-wide">
          Admin Panel
        </h2>
        
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.path === ROUTES.DASHBOARD 
              ? location.pathname === ROUTES.DASHBOARD
              : location.pathname.startsWith(item.path);
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-white/20 text-white shadow-medium backdrop-blur-sm' 
                    : 'text-primary-200 hover:bg-white/10 hover:text-white hover:shadow-soft'
                }`}
              >
                <span className={`text-lg transition-transform duration-300 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
