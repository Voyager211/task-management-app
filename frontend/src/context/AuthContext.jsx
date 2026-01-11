import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          // Ensure proper structure
          if (parsed.user && parsed.accessToken) {
            setUser(parsed);
          } else if (parsed.accessToken) {
            // Flat structure - wrap it
            setUser({
              user: {
                id: parsed._id || parsed.id,
                name: parsed.name,
                email: parsed.email,
                role: parsed.role
              },
              accessToken: parsed.accessToken
            });
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/register',
        { name, email, password },
        { withCredentials: true }
      );

      console.log('Backend response:', data);

      // Structure the data properly
      const userData = {
        user: data.user || {
          id: data._id || data.id,
          name: data.name,
          email: data.email,
          role: data.role
        },
        accessToken: data.accessToken
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true, data: userData };
    } catch (error) {
      console.error('Register error:', error.response?.data);
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      console.log('Login response:', data);

      // Structure the data properly
      const userData = {
        user: data.user || {
          id: data._id || data.id,
          name: data.name,
          email: data.email,
          role: data.role
        },
        accessToken: data.accessToken
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true, data: userData };
    } catch (error) {
      console.error('Login error:', error.response?.data);
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/auth/logout',
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const updateUser = (updatedData) => {
    const updatedUser = {
      ...user,
      user: { ...user.user, ...updatedData }
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user: user?.user || null,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
