/**
 * Abstract interface for Invitation data access operations.
 */
class InvitationRepository {
  /**
   * Creates a new invitation record.
   * @param {object} invitationData - Data for the new invitation 
   *   (email, token, invitedBy, status, expiresAt).
   * @returns {Promise<Invitation>} The created invitation object.
   */
  async create(invitationData) {
    throw new Error('Method not implemented: create');
  }

  /**
   * Finds an invitation by its unique token.
   * @param {string} token - The invitation token.
   * @returns {Promise<Invitation|null>} The invitation object or null if not found.
   */
  async findByToken(token) {
    throw new Error('Method not implemented: findByToken');
  }

  /**
   * Finds an active (pending and not expired) invitation by email.
   * @param {string} email - The email address.
   * @returns {Promise<Invitation|null>} The active invitation or null if none exists.
   */
  async findActiveByEmail(email) {
    throw new Error('Method not implemented: findActiveByEmail');
  }

  /**
   * Updates the status of an invitation identified by its token.
   * @param {string} token - The invitation token.
   * @param {InvitationStatus} newStatus - The new status (e.g., 'USED', 'EXPIRED').
   * @returns {Promise<Invitation>} The updated invitation object.
   */
  async updateStatus(token, newStatus) {
    throw new Error('Method not implemented: updateStatus');
  }

  // Add other methods if needed (e.g., delete, findById)
}

module.exports = InvitationRepository; 