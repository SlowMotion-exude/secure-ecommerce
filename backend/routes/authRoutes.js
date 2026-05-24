/**
 * Authentication Routes
 *
 * Handles user registration, login, logout, token refresh, and password reset.
 * All auth endpoints are rate-limited to prevent brute-force attacks.
 * Input validation middleware runs before controllers.
 *
 * Routes will be fully implemented in Phase 4.
 */

const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimiter');
const { successResponse } = require('../utils/helpers');

// Placeholder: POST /api/auth/register
router.post('/register', authLimiter, (_req, res) => {
  successResponse(res, null, 'Registration endpoint ready (Phase 4)', 200);
});

// Placeholder: POST /api/auth/login
router.post('/login', authLimiter, (_req, res) => {
  successResponse(res, null, 'Login endpoint ready (Phase 4)', 200);
});

// Placeholder: POST /api/auth/logout
router.post('/logout', (_req, res) => {
  successResponse(res, null, 'Logout endpoint ready (Phase 4)', 200);
});

// Placeholder: POST /api/auth/refresh
router.post('/refresh', (_req, res) => {
  successResponse(res, null, 'Token refresh endpoint ready (Phase 4)', 200);
});

// Placeholder: POST /api/auth/forgot-password
router.post('/forgot-password', authLimiter, (_req, res) => {
  successResponse(res, null, 'Password reset endpoint ready (Phase 4)', 200);
});

module.exports = router;
