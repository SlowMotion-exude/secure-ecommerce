/**
 * Authentication Context
 *
 * Provides global authentication state to the entire React app.
 * - Tracks whether the user is authenticated
 * - Stores user information (from JWT decode)
 * - Provides login/logout functions
 *
 * Components access auth state via useAuth() hook.
 */

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { fetchCsrfToken } from '../services/api';

const AuthContext = createContext(null);

function getInitialAuthState() {
  const token = localStorage.getItem('accessToken');
  if (!token) return { user: null, isAuthenticated: false };

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 > Date.now()) {
      return {
        user: { id: payload.userId, email: payload.email, role: payload.role },
        isAuthenticated: true,
      };
    }
  } catch {
    // Invalid token
  }

  localStorage.removeItem('accessToken');
  return { user: null, isAuthenticated: false };
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(getInitialAuthState);

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const login = useCallback((accessToken, userData) => {
    localStorage.setItem('accessToken', accessToken);
    setAuthState({ user: userData, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('csrfToken');
    setAuthState({ user: null, isAuthenticated: false });
  }, []);

  const value = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    loading: false,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
