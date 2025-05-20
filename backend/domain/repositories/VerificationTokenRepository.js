/**
 * Interface for VerificationToken repository
 * All repository implementations for VerificationToken should implement these methods
 */
class VerificationTokenRepository {
  /**
   * Creates a new verification token in the repository
   * @param {Object} verificationToken - The verification token to create
   * @returns {Promise<Object>} The created verification token
   */
  async create(verificationToken) {
    throw new Error('Method not implemented');
  }

  /**
   * Finds a verification token by its token string
   * @param {string} token - The token string to search for
   * @returns {Promise<Object|null>} The verification token if found, null otherwise
   */
  async findByToken(token) {
    throw new Error('Method not implemented');
  }

  /**
   * Finds all verification tokens for a user
   * @param {string} userId - The user ID to find tokens for
   * @returns {Promise<Array>} An array of verification tokens
   */
  async findByUserId(userId) {
    throw new Error('Method not implemented');
  }

  /**
   * Updates a verification token
   * @param {string} id - The ID of the token to update
   * @param {Object} data - The data to update
   * @returns {Promise<Object>} The updated verification token
   */
  async update(id, data) {
    throw new Error('Method not implemented');
  }
}

module.exports = VerificationTokenRepository; 