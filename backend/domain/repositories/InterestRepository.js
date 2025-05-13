/**
 * Abstract interface for Interest repository
 */
class InterestRepository {
  /**
   * Creates a new interest.
   * @param {Object} interestData - Data for creating a new interest (userId, projectId, status, notes)
   * @returns {Promise<Object>} Created interest
   */
  async create(interestData) {
    throw new Error('Method not implemented');
  }

  /**
   * Finds interest by user and project IDs.
   * @param {string} userId - User ID
   * @param {string} projectId - Project ID
   * @returns {Promise<Object|null>} Interest if found, null otherwise
   */
  async findByUserAndProject(userId, projectId) {
    throw new Error('Method not implemented');
  }

  /**
   * Gets all interests for a user.
   * @param {string} userId - User ID
   * @param {Object} options - Optional parameters for filtering/pagination
   * @returns {Promise<Array<Object>>} List of interests
   */
  async findByUser(userId, options = {}) {
    throw new Error('Method not implemented');
  }

  /**
   * Gets all interests for a project.
   * @param {string} projectId - Project ID
   * @param {Object} options - Optional parameters for filtering/pagination
   * @returns {Promise<Array<Object>>} List of interests
   */
  async findByProject(projectId, options = {}) {
    throw new Error('Method not implemented');
  }

  /**
   * Updates the status of an interest.
   * @param {string} id - Interest ID
   * @param {string} status - New status (active, converted, declined)
   * @returns {Promise<Object>} Updated interest
   */
  async updateStatus(id, status) {
    throw new Error('Method not implemented');
  }

  /**
   * Deletes an interest.
   * @param {string} id - Interest ID
   * @returns {Promise<boolean>} Success indicator
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = InterestRepository; 