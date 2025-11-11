import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getRoleBadge = (role) => {
    const badgeStyles = {
      admin: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md',
      user: 'bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-md',
    };

    const roleLabels = {
      admin: 'Administrator',
      user: 'User',
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${badgeStyles[role]}`}>
        {roleLabels[role]}
      </span>
    );
  };

  const getRoleDescription = (role) => {
    const descriptions = {
      admin: 'Full system administrator with all privileges',
      user: 'Regular user with basic access rights',
    };
    return descriptions[role] || '';
  };

  const getPermissions = (role) => {
    if (role === 'admin') {
      return [
        { icon: '👥', text: 'Manage all users and accounts' },
        { icon: '⚙️', text: 'Full system configuration access' },
        { icon: '📊', text: 'View and manage all data' },
        { icon: '🔒', text: 'System administration privileges' },
        { icon: '👑', text: 'Complete system control' }
      ];
    } else {
      return [
        { icon: '🔍', text: 'Basic system access' },
        { icon: '👤', text: 'Personal profile management' },
        { icon: '📝', text: 'Standard user operations' },
        { icon: '📱', text: 'Access to user features' }
      ];
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  const permissions = getPermissions(user.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-darkgreen to-violet-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-darkgreen to-violet-600 bg-clip-text text-transparent">
            User Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Personal details and account information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-darkgreen to-violet-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Account Overview</h2>
                <p className="text-violet-100 text-sm">Complete profile information</p>
              </div>
              
              <div className="p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Full Name
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">{user.name}</dd>
                  </div>
                  
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Address
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">{user.email}</dd>
                  </div>
                  
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                      Role
                    </dt>
                    <dd className="flex items-center space-x-3">
                      {getRoleBadge(user.role)}
                      <span className="text-sm text-gray-500 hidden sm:block">
                        {getRoleDescription(user.role)}
                      </span>
                    </dd>
                  </div>
                  
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      User ID
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900 font-mono">{user.id}</dd>
                  </div>
                  
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Account Status
                    </dt>
                    <dd>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Active
                      </span>
                    </dd>
                  </div>
                </dl>
                
                {/* Logout Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Permissions</h2>
                <p className="text-violet-100 text-sm">Your access privileges</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {permissions.map((permission, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-lg flex-shrink-0">{permission.icon}</span>
                      <span className="text-sm text-gray-700 font-medium">{permission.text}</span>
                    </div>
                  ))}
                </div>
                
                {/* Additional Info */}
                <div className="mt-6 p-4 bg-gradient-to-r from-darkgreen/10 to-violet-500/10 rounded-xl border border-darkgreen/20">
                  <div className="flex items-center space-x-2 text-sm text-darkgreen">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Need more access?</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    Contact your system administrator to request additional permissions or role changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for dark green color */}
      <style jsx>{`
        .from-darkgreen {
          --tw-gradient-from: #065f46;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(6, 95, 70, 0));
        }
        .to-darkgreen {
          --tw-gradient-to: #065f46;
        }
        .bg-darkgreen {
          background-color: #065f46;
        }
        .text-darkgreen {
          color: #065f46;
        }
        .border-darkgreen {
          border-color: #065f46;
        }
      `}</style>
    </div>
  );
};

export default Profile;