const express = require('express');
const invitationController = require('../controllers/invitation.controller');
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');
const roleAuthMiddleware = require('../../../middleware/roleAuthMiddleware');

const router = express.Router();

// POST /api/invitations - Create a new invitation
// Protected route: Requires authentication (JWT) and 'manager' role.
router.post(
  '/', 
  jwtAuthMiddleware,         // 1. Verify JWT and attach req.user
  roleAuthMiddleware('manager'), // 2. Check if req.user.role is 'manager'
  invitationController.create  // 3. If checks pass, proceed to controller
);

// GET /api/invitations - List all invitations
// Protected route: Requires authentication (JWT) and 'manager' role.
router.get(
  '/',
  jwtAuthMiddleware,
  roleAuthMiddleware('manager'),
  invitationController.list
);

// Add other invitation-related routes here later if needed 
// (e.g., DELETE /:id to revoke)

module.exports = router; 