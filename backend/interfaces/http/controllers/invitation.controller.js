const invitationService = require('../../../application/services/invitationService');

class InvitationController {

  /**
   * Handles POST /api/invitations request to create a new invitation.
   * Assumes authentication and role check middleware have run.
   */
  async create(req, res) {
    const { email } = req.body; // Email of the invitee
    // Get the inviter's ID from the user object attached by jwtAuthMiddleware
    const inviterId = req.user?.id; 

    // Basic input validation
    if (!email) {
      return res.status(400).json({ message: 'Email is required in the request body.' });
    }
    if (!inviterId) {
      // This shouldn't happen if jwtAuthMiddleware ran correctly
      console.error('Invitation create failed: Inviter ID missing from req.user.');
      return res.status(500).json({ message: 'Authentication error.' }); 
    }
    // Optional: Add more robust email format validation

    try {
      const newInvitation = await invitationService.createInvitation(email, inviterId);
      // Respond with 201 Created and potentially the created invitation details (optional)
      res.status(201).json({
        message: 'Invitation created and email sent successfully.',
        invitationId: newInvitation.id, // Send back ID or maybe the whole object
        token: newInvitation.token // Sending token back might be useful for admin UI or testing
      });

    } catch (error) {
      // Handle specific errors from the service
      if (error.message.includes('active invitation already exists')) {
        return res.status(409).json({ message: error.message }); // 409 Conflict
      }
      if (error.message.includes('required')) { // e.g., 'Email and inviter ID are required'
          return res.status(400).json({ message: error.message });
      }
      // Handle generic errors
      console.error(`Error creating invitation for ${email}:`, error);
      res.status(500).json({ message: 'Failed to create invitation.' });
    }
  }

  /**
   * Handles GET /api/invitations request to list all invitations.
   * Assumes authentication and role check middleware have run.
   */
  async list(req, res) {
    try {
      // Get all invitations, potentially with filters from query params
      const invitations = await invitationService.getAllInvitations();
      res.status(200).json(invitations);
    } catch (error) {
      console.error('Error fetching invitations:', error);
      res.status(500).json({ message: 'Failed to fetch invitations.' });
    }
  }

  // Add other invitation-related controller methods if needed (e.g., list, revoke)
}

module.exports = new InvitationController(); 