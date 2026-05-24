/**
 * Application Constants
 *
 * Centralized constants prevent magic strings scattered throughout the codebase.
 */

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'SecureShop';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id) => `/products/${id}`,
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    REMOVE: (id) => `/cart/${id}`,
    UPDATE: (id) => `/cart/${id}`,
  },
  PAYMENTS: {
    CREATE_INTENT: '/payments/create-intent',
    CONFIRM: '/payments/confirm',
  },
  WEBAUTHN: {
    REGISTER_OPTIONS: '/webauthn/register-options',
    REGISTER_VERIFY: '/webauthn/register-verify',
    LOGIN_OPTIONS: '/webauthn/login-options',
    LOGIN_VERIFY: '/webauthn/login-verify',
  },
};

export const TRUST_LEVELS = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
};

export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
};
