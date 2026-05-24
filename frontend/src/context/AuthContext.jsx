/**
 * Authentication Context
 *
 * Provides global authentication state to the entire React app.
 * - Tracks whether the user is authenticated
 * - Stores user information (from JWT decode)
 * - Provides login/logout/register functions
 *
 * Components access auth state via useAuth() hook.
 * Full implementation in Phase 4 & 12.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        // Decode JWT payload (base64) to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));

        // Check if token is expired
        if (payload.exp * 1000 > Date.now()) {
          setUser({ id: payload.userId, email: payload.email, role: payload.role });
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('accessToken');
        }
      } catch {
        localStorage.removeItem('accessToken');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((accessToken, userData) => {
    localStorage.setItem('accessToken', accessToken);
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('csrfToken');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
