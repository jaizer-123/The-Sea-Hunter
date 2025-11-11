import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user', // Default to 'user'
  });
  const [loading, setLoading] = useState(false);
  const { register, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Check if admin already exists
  const [adminExists, setAdminExists] = useState(false);

  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        // You might want to create an API endpoint to check if admin exists
        // For now, we'll check localStorage or make a simple API call
        const token = localStorage.getItem('auth_token');
        if (token) {
          // If user is logged in and is admin, set adminExists to true
          if (isAdmin()) {
            setAdminExists(true);
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };
    
    checkAdminExists();
  }, [isAdmin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirmation) {
      alert('Passwords do not match');
      return;
    }

    // Prevent admin registration if admin already exists and current user is not admin
    if (formData.role === 'admin' && adminExists && !isAdmin()) {
      alert('Administrator account already exists. Please contact system administrator.');
      return;
    }

    setLoading(true);

    const result = await register(formData);
    
    if (!result.success) {
      alert(result.error);
    } else {
      alert('Registration successful! Please login with your credentials.');
      navigate('/login');
    }

    setLoading(false);
  };

  const getRoleLabel = (role) => {
    const roleLabels = {
      admin: 'Administrator',
      user: 'User'
    };
    return roleLabels[role] || role;
  };

  const getRoleDescription = (role) => {
    const descriptions = {
      admin: 'Full system access with administrative privileges',
      user: 'Basic system access for regular operations'
    };
    return descriptions[role] || '';
  };

  // Determine if admin option should be available
  const canRegisterAsAdmin = () => {
    // Allow admin registration only if no admin exists OR current user is admin
    return !adminExists || isAdmin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                {canRegisterAsAdmin() && (
                  <option value="admin">Administrator</option>
                )}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                {getRoleLabel(formData.role)} - {getRoleDescription(formData.role)}
                {formData.role === 'admin' && adminExists && (
                  <span className="block text-orange-600 font-medium mt-1">
                    Note: An administrator already exists in the system.
                  </span>
                )}
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength="8"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password (min. 8 characters)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                minLength="8"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm your password"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          {adminExists && !isAdmin() && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Need administrator access?{' '}
                <span className="text-orange-600 font-medium">
                  Please contact the system administrator.
                </span>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;