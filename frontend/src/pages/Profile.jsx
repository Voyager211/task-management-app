import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize form data with user info
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      return;
    }

    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.put('/auth/profile', formData);
      
      // Update context with new user data
      updateUser(data);
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    setFormData({
      name: user.name || '',
      email: user.email || ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Header with Edit Button */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>

          {/* Success Message */}
          {success && (
            <div className="mx-6 mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Profile Content */}
          <div className="p-6">
            {isEditing ? (
              // Edit Mode
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="John Doe"
                      disabled={loading}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="john@example.com"
                      disabled={loading}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              // View Mode
              <div className="space-y-6">
                {/* Name Display */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </label>
                  <p className="text-lg text-gray-900 font-medium">{user?.name}</p>
                </div>

                {/* Email Display */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
                  <p className="text-lg text-gray-900 font-medium">{user?.email}</p>
                </div>

                {/* Role Display */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Role
                  </label>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    {user?.role || 'User'}
                  </span>
                </div>

                {/* Account Info */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Account Information</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Your account is active</p>
                    <p>• All changes are saved automatically</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-blue-900 font-semibold mb-1">Profile Settings</h3>
              <p className="text-blue-800 text-sm">
                Keep your profile information up to date. Changes to your email may require verification in production environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
