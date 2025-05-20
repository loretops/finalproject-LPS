const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verification.controller');
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');

/**
 * @route   GET /api/verification/status
 * @desc    Check email verification status for current user
 * @access  Private (requires authentication)
 */
router.get('/status', jwtAuthMiddleware, verificationController.checkVerificationStatus);

/**
 * @route   POST /api/verification/send
 * @desc    Send verification email to current user
 * @access  Private (requires authentication)
 */
router.post('/send', jwtAuthMiddleware, verificationController.sendVerificationEmail);

/**
 * @route   GET /api/verification/verify/:token
 * @desc    Verify a user's email with token
 * @access  Public
 */
router.get('/verify/:token', verificationController.verifyEmail);

/**
 * @route   POST /api/verification/resend
 * @desc    Resend verification email
 * @access  Public
 */
router.post('/resend', verificationController.resendVerificationEmail);

module.exports = router; 