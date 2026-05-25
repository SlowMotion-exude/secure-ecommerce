/**
 * Input Validation Middleware
 *
 * Uses express-validator to validate and sanitize all user input
 * BEFORE it reaches controllers. This prevents:
 * - SQL injection (malicious SQL in input fields)
 * - XSS (script tags in input fields)
 * - Data integrity issues (invalid email formats, weak passwords)
 *
 * Validation rules are defined per-route and reused across the app.
 */

const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/helpers');

/**
 * Process validation results.
 * If any validation rule failed, return a 400 error with details.
 * Must be called AFTER the validation chain middleware.
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    return errorResponse(res, 'Validation failed.', 400, messages);
  }
  next();
}

/**
 * Registration validation rules.
 * Enforces strong passwords and valid email format.
 */
const registerValidation = [
  body('email')
    .isEmail().withMessage('Valid email address is required.')
    .normalizeEmail()
    .isLength({ max: 255 }).withMessage('Email must not exceed 255 characters.'),

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.'),

  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required.')
    .isLength({ max: 100 }).withMessage('First name must not exceed 100 characters.')
    .escape(),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required.')
    .isLength({ max: 100 }).withMessage('Last name must not exceed 100 characters.')
    .escape(),

  handleValidationErrors,
];

/**
 * Login validation rules.
 */
const loginValidation = [
  body('email')
    .isEmail().withMessage('Valid email address is required.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required.'),

  handleValidationErrors,
];

/**
 * Password reset request validation.
 */
const passwordResetValidation = [
  body('email')
    .isEmail().withMessage('Valid email address is required.')
    .normalizeEmail(),

  handleValidationErrors,
];

/**
 * New password validation (for password reset completion).
 */
const newPasswordValidation = [
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.'),

  body('token')
    .notEmpty().withMessage('Reset token is required.'),

  handleValidationErrors,
];

module.exports = {
  registerValidation,
  loginValidation,
  passwordResetValidation,
  newPasswordValidation,
  handleValidationErrors,
};
