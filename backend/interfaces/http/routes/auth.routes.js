const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/invitation/:token
router.get('/invitation/:token', authController.validateInvitation);

// POST /api/auth/register - Register with invitation token
router.post('/register', authController.register);

// Add other auth routes here (e.g., /logout)

module.exports = router; 