/**
 * Token Service
 *
 * Centralized JWT token generation and verification.
 * Separating token logic into a service keeps controllers thin
 * and makes token policy changes easy to manage in one place.
 *
 * Token strategy:
 * - Access token: short-lived (15 min), sent in Authorization header
 * - Refresh token: long-lived (7 days), sent in httpOnly cookie
 * - This dual-token approach limits damage from token theft
 */

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

/**
 * Generate a short-lived access token.
 * Contains only the minimum claims needed for authorization.
 */
function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role || 'customer',
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
}

/**
 * Generate a long-lived refresh token.
 * Stored in an httpOnly cookie — JavaScript cannot access it.
 */
function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
}

/**
 * Verify a refresh token and return the decoded payload.
 */
function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    logger.debug('Refresh token verification failed:', { message: error.message });
    return null;
  }
}

/**
 * Set the refresh token as a secure httpOnly cookie.
 * httpOnly prevents XSS from stealing the refresh token.
 * sameSite: 'strict' prevents CSRF.
 * secure: true ensures the cookie is only sent over HTTPS in production.
 */
function setRefreshTokenCookie(res, token) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth/refresh',
  });
}

/**
 * Clear the refresh token cookie (used on logout).
 */
function clearRefreshTokenCookie(res) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/auth/refresh',
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
};
