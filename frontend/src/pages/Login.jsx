/**
 * Login Page
 *
 * Modern split-screen login with glassmorphism styling.
 * Supports email/password and fingerprint authentication.
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiLogIn } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken, user } = response.data.data;
      login(accessToken, user);
      toast.success(`Welcome back, ${user.firstName}!`);
      navigate(from, { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      setErrors({ form: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Panel — Branding */}
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <FiShield size={48} />
            </div>
            <h1>Welcome Back</h1>
            <p>
              Sign in to your secure account and continue shopping
              with confidence. Your data is protected by enterprise-grade security.
            </p>
            <div className="auth-brand-features">
              <div className="auth-feature">
                <FiShield />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="auth-feature">
                <FiLock />
                <span>Biometric Authentication</span>
              </div>
              <div className="auth-feature">
                <FiShield />
                <span>PCI DSS Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            {errors.form && (
              <div className="auth-error-banner">{errors.form}</div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: '' })); }}
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className={`form-group ${errors.password ? 'error' : ''}`}>
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })); }}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <div className="form-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="auth-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-auth"
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loading">Signing in...</span>
                ) : (
                  <>
                    <FiLogIn /> Sign In
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button className="btn btn-outline btn-lg btn-biometric" disabled>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4" />
                <path d="M8 15s-2-2.9-2-4c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                <path d="M4 19s-2-4.4-2-8c0-5.5 4.5-10 10-10s10 4.5 10 10c0 1.8-.3 3.4-.8 4.8" />
              </svg>
              Login with Fingerprint
            </button>

            <p className="auth-footer-text">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="auth-link-bold">
                Create Account
              </Link>
            </p>

            <div className="auth-security-note">
              <FiShield />
              <span>Your connection is secured with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
