const HomeDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: '👥',
      gradient: 'from-primary-500 to-primary-600',
      textColor: 'text-primary-700',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Roles',
      value: '12',
      icon: '🔐',
      gradient: 'from-accent-500 to-accent-600',
      textColor: 'text-accent-700',
      change: '+3',
      changeType: 'positive'
    },
    {
      title: 'Online Users',
      value: '456',
      icon: '🟢',
      gradient: 'from-success-500 to-success-600',
      textColor: 'text-success-700',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'System Health',
      value: '99.9%',
      icon: '📊',
      gradient: 'from-info-500 to-info-600',
      textColor: 'text-info-700',
      change: '0.1%',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 -mx-6 -mt-6 px-6 pt-6 pb-4 rounded-b-2xl">
        <h1 className="text-3xl font-bold text-secondary-900">
          Welcome to Dashboard
        </h1>
        <p className="text-secondary-600 mt-2">
          Here's an overview of your system performance and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-6 border border-secondary-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center text-white text-2xl shadow-medium`}>
                {stat.icon}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                stat.changeType === 'positive' 
                  ? 'bg-success-100 text-success-700' 
                  : stat.changeType === 'negative'
                  ? 'bg-error-100 text-error-700'
                  : 'bg-secondary-100 text-secondary-700'
              }`}>
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-600 mb-1">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100">
          <div className="p-6 border-b border-secondary-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary-900">Recent Activity</h2>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-secondary-50 transition-colors duration-200">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-medium">
                  U
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary-900">New user registered</p>
                  <p className="text-xs text-secondary-500">John Doe joined the platform</p>
                </div>
                <span className="text-xs text-secondary-400">2m ago</span>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-secondary-50 transition-colors duration-200">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-medium">
                  R
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary-900">Role permissions updated</p>
                  <p className="text-xs text-secondary-500">Admin role modified by system</p>
                </div>
                <span className="text-xs text-secondary-400">5m ago</span>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-secondary-50 transition-colors duration-200">
                <div className="w-10 h-10 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-medium">
                  S
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary-900">System backup completed</p>
                  <p className="text-xs text-secondary-500">Database backup successful</p>
                </div>
                <span className="text-xs text-secondary-400">1h ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100">
          <div className="p-6 border-b border-secondary-100">
            <h2 className="text-lg font-semibold text-secondary-900">System Overview</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">CPU Usage</span>
              <span className="text-sm font-medium text-secondary-900">45%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Memory Usage</span>
              <span className="text-sm font-medium text-secondary-900">62%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full" style={{ width: '62%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Storage Usage</span>
              <span className="text-sm font-medium text-secondary-900">78%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-warning-500 to-warning-600 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
