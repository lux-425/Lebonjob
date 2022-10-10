import axios from 'axios';

import { useState, useEffect, createContext } from 'react';

import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      retrieveUser();
    }
  }, [user]);

  // Login the user
  const login = async ({ username, password }) => {
    try {
      setLoading(true);
      // Send a post req to Next's backend which send that post req to Django's backend
      const res = await axios.post('/api/auth/login', {
        username,
        password,
      });

      if (res.data.success) {
        retrieveUser();
        setIsAuthenticated(true);
        setLoading(false);
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Register a user
  const register = async ({ firstName, lastName, email, password }) => {
    try {
      setLoading(true);
      // Send a post req directly to Django's backend because no need for cookies
      const res = await axios.post(`${process.env.API_URL}/api/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      if (res.data.message) {
        setLoading(false);
        router.push('/login');
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Retrieve the logged in user
  const retrieveUser = async () => {
    try {
      setLoading(true);

      const res = await axios.get('/api/auth/user');

      if (res.data.user) {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
      }
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Logout the user
  const logout = async () => {
    try {
      const res = await axios.post('/api/auth/logout');

      if (res.data.success) {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Clear all errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;