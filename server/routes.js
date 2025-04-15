const express = require('express');
const router = express.Router();

// Importar controladores
const {
  createInvitation,
  getInvitations,
  verifyInvitation,
} = require('./controllers/invitation.controller');

// Middleware de autenticación
const authMiddleware = require('./middleware/auth.middleware');

// Rutas de invitación
router.post('/invitations', authMiddleware, createInvitation);
router.get('/invitations', authMiddleware, getInvitations);
router.get('/invitations/verify/:token', verifyInvitation);

module.exports = router;
