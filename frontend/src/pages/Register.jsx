/**
 * Register Page
 *
 * Modern split-screen registration with password strength indicator,
 * terms acceptance, and optional biometric enrollment.
 */

import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield, FiUserPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 2) return { level: 'weak', label: 'Weak', color: '#ef4444', width: '25%' };
  if (score <= 3) return { level: 'fair', label: 'Fair', color: '#f59e0b', width: '50%' };
  if (score <= 4) return { level: 'good', label: 'Good', color: '#3b82f6', width: '75%' };
  return { level: 'strong', label: 'Strong', color: '#10b981', width: '100%' };
}

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'At least 8 characters';
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Include an uppercase letter';
    else if (!/[a-z]/.test(formData.password)) newErrors.password = 'Include a lowercase letter';
    else if (!/\d/.test(formData.password)) newErrors.password = 'Include a number';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) newErrors.password = 'Include a special character';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await api.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      const { accessToken, user } = response.data.data;
      login(accessToken, user);
      toast.success('Account created successfully!');
      navigate('/', { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
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
        <div className="auth-brand-panel register-brand">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <FiShield size={48} />
            </div>
            <h1>Join SecureShop</h1>
            <p>
              Create your account and start shopping with the most
              secure e-commerce platform. Your privacy is our priority.
            </p>
            <div className="auth-brand-features">
              <div className="auth-feature">
                <FiShield />
                <span>Biometric Protection</span>
              </div>
              <div className="auth-feature">
                <FiLock />
                <span>Encrypted Transactions</span>
              </div>
              <div className="auth-feature">
                <FiUser />
                <span>Privacy First</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2>Create Account</h2>
              <p>Fill in your details to get started</p>
            </div>

            {errors.form && (
              <div className="auth-error-banner">{errors.form}</div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className="form-row-grid">
                <div className={`form-group ${errors.firstName ? 'error' : ''}`}>
                  <label htmlFor="firstName">First Name</label>
                  <div className="input-wrapper">
                    <FiUser className="input-icon" />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange('firstName')}
                      disabled={loading}
                    />
                  </div>
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>

                <div className={`form-group ${errors.lastName ? 'error' : ''}`}>
                  <label htmlFor="lastName">Last Name</label>
                  <div className="input-wrapper">
                    <FiUser className="input-icon" />
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange('lastName')}
                      disabled={loading}
                    />
                  </div>
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <label htmlFor="reg-email">Email Address</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className={`form-group ${errors.password ? 'error' : ''}`}>
                <label htmlFor="reg-password">Password</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange('password')}
                    autoComplete="new-password"
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
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }}
                      />
                    </div>
                    <span className="strength-label" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>

              <div className={`form-group ${errors.acceptTerms ? 'error' : ''}`}>
                <label className="checkbox-label terms-label">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange('acceptTerms')}
                  />
                  <span>
                    I agree to the{' '}
                    <Link to="/privacy-policy" className="auth-link" target="_blank">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="auth-link" target="_blank">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.acceptTerms && <span className="field-error">{errors.acceptTerms}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-auth"
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loading">Creating account...</span>
                ) : (
                  <>
                    <FiUserPlus /> Create Account
                  </>
                )}
              </button>
            </form>

            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-link-bold">
                Sign In
              </Link>
            </p>

            <div className="auth-security-note">
              <FiShield />
              <span>Your data is protected with end-to-end encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
