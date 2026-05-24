/**
 * Product Routes
 *
 * Handles product listing, detail retrieval, and admin management.
 * Public routes: product listing and details.
 * Protected routes: product creation, update, deletion (admin only).
 *
 * Routes will be fully implemented in Phase 6.
 */

const express = require('express');
const router = express.Router();
const { successResponse } = require('../utils/helpers');

// Placeholder: GET /api/products
router.get('/', (_req, res) => {
  successResponse(res, [], 'Product listing endpoint ready (Phase 6)', 200);
});

// Placeholder: GET /api/products/:id
router.get('/:id', (req, res) => {
  successResponse(res, { id: req.params.id }, 'Product detail endpoint ready (Phase 6)', 200);
});

module.exports = router;
