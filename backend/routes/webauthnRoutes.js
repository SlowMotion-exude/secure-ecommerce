/**
 * WebAuthn / FIDO2 Routes
 *
 * Handles biometric fingerprint registration and authentication.
 * Uses the Web Authentication API standard.
 *
 * Routes will be fully implemented in Phase 5.
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { successResponse } = require('../utils/helpers');

// Placeholder: POST /api/webauthn/register-options
router.post('/register-options', authenticateToken, (_req, res) => {
  successResponse(res, null, 'WebAuthn registration options endpoint ready (Phase 5)', 200);
});

// Placeholder: POST /api/webauthn/register-verify
router.post('/register-verify', authenticateToken, (_req, res) => {
  successResponse(res, null, 'WebAuthn registration verify endpoint ready (Phase 5)', 200);
});

// Placeholder: POST /api/webauthn/login-options
router.post('/login-options', (_req, res) => {
  successResponse(res, null, 'WebAuthn login options endpoint ready (Phase 5)', 200);
});

// Placeholder: POST /api/webauthn/login-verify
router.post('/login-verify', (_req, res) => {
  successResponse(res, null, 'WebAuthn login verify endpoint ready (Phase 5)', 200);
});

module.exports = router;
