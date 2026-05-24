/**
 * Cart Routes
 *
 * Handles shopping cart operations: add, remove, update quantity, view.
 * All cart routes require authentication.
 *
 * Routes will be fully implemented in Phase 6.
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { successResponse } = require('../utils/helpers');

// Placeholder: GET /api/cart
router.get('/', authenticateToken, (_req, res) => {
  successResponse(res, { items: [] }, 'Cart endpoint ready (Phase 6)', 200);
});

module.exports = router;
