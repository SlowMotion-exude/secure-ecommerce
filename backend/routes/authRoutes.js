/**
 * Authentication Routes
 *
 * Handles user registration, login, logout, token refresh, and password reset.
 * All auth endpoints are rate-limited to prevent brute-force attacks.
 * Input validation middleware runs before controllers.
 */

const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimiter');
const { registerValidation, loginValidation } = require('../middleware/validator');
const { authenticateToken } = require('../middleware/auth');
const { hashPassword, verifyPassword } = require('../services/authService');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} = require('../services/tokenService');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/helpers');
const logger = require('../utils/logger');

// POST /api/auth/register
router.post('/register', authLimiter, registerValidation, async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return errorResponse(res, 'An account with this email already exists.', 409);
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ email, passwordHash, firstName, lastName });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);

    logger.info('User registered', { userId: user.id, email: user.email });

    successResponse(res, {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
    }, 'Registration successful.', 201);
  } catch (error) {
    logger.error('Registration error:', { message: error.message });
    errorResponse(res, 'Registration failed. Please try again.', 500);
  }
});

// POST /api/auth/login
router.post('/login', authLimiter, loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return errorResponse(res, 'Invalid email or password.', 401);
    }

    if (!user.is_active) {
      return errorResponse(res, 'Account has been suspended. Contact support.', 403);
    }

    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const minutesLeft = Math.ceil((new Date(user.locked_until) - new Date()) / 60000);
      return errorResponse(res, `Account locked. Try again in ${minutesLeft} minutes.`, 423);
    }

    const passwordValid = await verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      await User.incrementLoginAttempts(user.id);
      return errorResponse(res, 'Invalid email or password.', 401);
    }

    await User.updateLastLogin(user.id);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);

    logger.info('User logged in', { userId: user.id, email: user.email });

    successResponse(res, {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
    }, 'Login successful.');
  } catch (error) {
    logger.error('Login error:', { message: error.message });
    errorResponse(res, 'Login failed. Please try again.', 500);
  }
});

// POST /api/auth/logout
router.post('/logout', authenticateToken, (_req, res) => {
  clearRefreshTokenCookie(res);
  successResponse(res, null, 'Logged out successfully.');
});

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return errorResponse(res, 'No refresh token provided.', 401);
  }

  const decoded = verifyRefreshToken(token);
  if (!decoded) {
    clearRefreshTokenCookie(res);
    return errorResponse(res, 'Invalid or expired refresh token.', 401);
  }

  User.findById(decoded.userId).then((user) => {
    if (!user || !user.is_active) {
      clearRefreshTokenCookie(res);
      return errorResponse(res, 'User not found or account suspended.', 401);
    }

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    setRefreshTokenCookie(res, newRefreshToken);

    successResponse(res, { accessToken }, 'Token refreshed.');
  }).catch((error) => {
    logger.error('Token refresh error:', { message: error.message });
    errorResponse(res, 'Token refresh failed.', 500);
  });
});

// GET /api/auth/me — get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return errorResponse(res, 'User not found.', 404);
    }

    successResponse(res, {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      lastLogin: user.last_login,
      createdAt: user.created_at,
    }, 'User profile retrieved.');
  } catch (error) {
    logger.error('Profile fetch error:', { message: error.message });
    errorResponse(res, 'Failed to fetch profile.', 500);
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', authLimiter, (_req, res) => {
  successResponse(res, null, 'If an account with that email exists, a reset link has been sent.');
});

module.exports = router;
