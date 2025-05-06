const { InvitationStatus } = require('@prisma/client');
const PrismaInvitationRepository = require('../../infrastructure/repositories/PrismaInvitationRepository');
const { generateSecureToken } = require('../../utils/tokenUtils');
const { sendInvitationEmail } = require('./emailService'); // Importar el servicio de email

// Instantiate repository (consider Dependency Injection for better testability)
const invitationRepository = new PrismaInvitationRepository();

const INVITATION_EXPIRATION_DAYS = 7;

/**
 * Service layer for managing invitations.
 */
class InvitationService {

  /**
   * Creates a new invitation for a given email, sent by a specific user.
   * Checks for existing active invitations for the same email.
   * @param {string} email - Email of the person being invited.
   * @param {string} invitedById - UUID of the user sending the invitation (manager).
   * @returns {Promise<Invitation>} The created invitation object.
   * @throws {Error} If an active invitation already exists or creation fails.
   */
  async createInvitation(email, invitedById) {
    if (!email || !invitedById) {
      throw new Error('Email and inviter ID are required.');
    }

    // 1. Check if an active invitation already exists for this email
    const existingActive = await invitationRepository.findActiveByEmail(email);
    if (existingActive) {
      console.warn(`Attempted to create invitation for ${email}, but an active one already exists.`);
      // Decide on behavior: error out, or maybe resend/update existing?
      // For now, error out to enforce one active invite rule.
      throw new Error('An active invitation already exists for this email address.');
    }

    // 2. Generate secure token
    const token = generateSecureToken(); // Use our utility

    // 3. Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRATION_DAYS);

    // 4. Prepare data and create in DB
    const invitationData = {
      email,
      token,
      invitedBy: invitedById,
      status: InvitationStatus.PENDING, // Default status from Enum
      expiresAt,
      // createdAt is handled by Prisma @default(now())
    };

    let newInvitation; // Declarar fuera del try para acceder en el finally o después
    try {
      newInvitation = await invitationRepository.create(invitationData);
      console.log(`Invitation created for ${email} with token ${token}`);
      
      // <<< ENVIAR EMAIL DESPUÉS DE CREAR EN BD >>>
      // Usamos await, pero no bloqueamos si falla (emailService maneja su propio try/catch)
      await sendInvitationEmail(newInvitation.email, newInvitation.token);
      // <<< FIN ENVÍO EMAIL >>>

      return newInvitation;
      
    } catch (error) {
      console.error('Failed to save invitation to database:', error);
      throw new Error('Could not create invitation.');
    }
    // Nota: Si el email falla, la invitación ya está creada en la BD.
    // Podríamos añadir lógica para reintentar o marcar la invitación si el email falla.
  }

  /**
   * Validates an invitation token.
   * @param {string} token - The invitation token to validate.
   * @returns {Promise<object>} Result object: { isValid: boolean, reason?: string, email?: string, invitation?: Invitation }
   */
  async validateInvitationToken(token) {
    if (!token) {
      return { isValid: false, reason: 'Token is required' };
    }

    const invitation = await invitationRepository.findByToken(token);

    if (!invitation) {
      return { isValid: false, reason: 'not_found' };
    }

    if (invitation.status === InvitationStatus.USED) {
      return { isValid: false, reason: 'used', invitation };
    }

    if (invitation.status === InvitationStatus.EXPIRED) {
      return { isValid: false, reason: 'expired', invitation };
    }

    // Check expiration date explicitly 
    const now = new Date();
    if (invitation.expiresAt <= now) {
      // Mark as expired if it hasn't been already (optional optimistic update)
      try {
        await this.markInvitationAsExpired(token);
      } catch (err) {
        console.error(`Failed to mark token ${token} as expired during validation:`, err);
        // Continue validation even if update fails
      }
      return { isValid: false, reason: 'expired', invitation };
    }

    // If PENDING and not expired
    if (invitation.status === InvitationStatus.PENDING) {
      return { isValid: true, email: invitation.email, invitation };
    }

    // Catch any other unexpected status
    return { isValid: false, reason: 'invalid_status', invitation };
  }

  /**
   * Marks an invitation as USED.
   * @param {string} token - The token of the invitation to mark as used.
   * @returns {Promise<Invitation>} The updated invitation.
   * @throws {Error} If the invitation is not found or update fails.
   */
  async markInvitationAsUsed(token) {
    try {
      console.log(`Marking invitation token ${token} as USED.`);
      // We might want findByToken first to ensure it exists and is PENDING
      const updated = await invitationRepository.updateStatus(token, InvitationStatus.USED);
      return updated;
    } catch (error) {
      console.error(`Failed to mark invitation ${token} as used:`, error);
      throw new Error('Could not update invitation status to used.');
    }
  }

  /**
   * Marks an invitation as EXPIRED.
   * @param {string} token - The token of the invitation to mark as expired.
   * @returns {Promise<Invitation>} The updated invitation.
   * @throws {Error} If the invitation is not found or update fails.
   */
  async markInvitationAsExpired(token) {
    try {
      console.log(`Marking invitation token ${token} as EXPIRED.`);
      const updated = await invitationRepository.updateStatus(token, InvitationStatus.EXPIRED);
      return updated;
    } catch (error) {
      console.error(`Failed to mark invitation ${token} as expired:`, error);
      throw new Error('Could not update invitation status to expired.');
    }
  }

  /**
   * Gets all invitations from the database.
   * @returns {Promise<Array<Invitation>>} List of all invitations.
   * @throws {Error} If fetching invitations fails.
   */
  async getAllInvitations() {
    try {
      // Get all invitations from the repository
      // Could add pagination, sorting, filtering options later
      const invitations = await invitationRepository.findAll();
      
      // Process each invitation to check for expiration
      const now = new Date();
      for (const invitation of invitations) {
        // If PENDING but the date is expired, mark it as EXPIRED
        if (invitation.status === InvitationStatus.PENDING && invitation.expiresAt <= now) {
          // We don't await this to avoid blocking the response
          // Just fire and forget
          this.markInvitationAsExpired(invitation.token)
            .catch(err => console.error(`Failed to auto-expire invitation ${invitation.id}:`, err));
          
          // Update the status in the current response
          invitation.status = InvitationStatus.EXPIRED;
        }
      }
      
      return invitations;
    } catch (error) {
      console.error('Failed to fetch invitations:', error);
      throw new Error('Could not fetch invitations.');
    }
  }
}

// Export an instance of the service
module.exports = new InvitationService(); 