/**
 * Trust Service
 *
 * Implements Trusted Computing Platform (TCP) concepts:
 * - Device fingerprinting: identifies returning devices
 * - Trust scoring: assigns a trust level based on device history
 * - Session validation: ensures session integrity
 *
 * Trust levels determine what actions a user can perform:
 * - HIGH: full access, biometric-verified device
 * - MEDIUM: password-authenticated, known device
 * - LOW: new device or suspicious activity — may require re-authentication
 */

const crypto = require('crypto');
const logger = require('../utils/logger');

/**
 * Generate a device fingerprint from request metadata.
 * Combines User-Agent, accepted languages, and IP into a hash.
 * This is a simplified fingerprint — production systems use more signals.
 */
function generateDeviceFingerprint(req) {
  const components = [
    req.headers['user-agent'] || 'unknown',
    req.headers['accept-language'] || 'unknown',
    req.ip || 'unknown',
  ];

  return crypto
    .createHash('sha256')
    .update(components.join('|'))
    .digest('hex');
}

/**
 * Calculate a trust score based on device and session attributes.
 * Returns a value between 0 and 100.
 *
 * Factors:
 * - Known device: +30 points
 * - Biometric authentication: +40 points
 * - Consistent IP: +15 points
 * - Valid session age: +15 points
 */
function calculateTrustScore(factors) {
  let score = 0;

  if (factors.knownDevice) score += 30;
  if (factors.biometricVerified) score += 40;
  if (factors.consistentIP) score += 15;
  if (factors.validSessionAge) score += 15;

  logger.debug(`Trust score calculated: ${score}`, { factors });

  return score;
}

/**
 * Determine trust level from a numeric score.
 */
function getTrustLevel(score) {
  if (score >= 70) return 'HIGH';
  if (score >= 40) return 'MEDIUM';
  return 'LOW';
}

module.exports = {
  generateDeviceFingerprint,
  calculateTrustScore,
  getTrustLevel,
};
