const express = require('express');
const authController = require('../controllers/auth.controller');
const passwordController = require('../controllers/password.controller');

const router = express.Router();

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/invitation/:token
router.get('/invitation/:token', authController.validateInvitation);

// POST /api/auth/register - Register with invitation token
router.post('/register', authController.register);

// Rutas para recuperación de contraseña
router.post('/password-reset', passwordController.requestPasswordReset);
router.get('/password-reset/:token', passwordController.validateResetToken);
router.post('/password-reset/reset', passwordController.resetPassword);

// Add other auth routes here (e.g., /logout)

module.exports = router; 