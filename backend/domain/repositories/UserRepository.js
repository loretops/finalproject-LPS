/**
 * Abstract interface for User data access operations.
 */
class UserRepository {
  /**
   * Finds a user by their email address.
   * @param {string} email - The email address to search for.
   * @returns {Promise<User|null>} The user object or null if not found.
   * @throws {Error} If the method is not implemented.
   */
  async findByEmail(email) {
    throw new Error('Method not implemented: findByEmail');
  }

  /**
   * Finds a user by their ID.
   * @param {string} id - The user ID to search for.
   * @returns {Promise<User|null>} The user object or null if not found.
   * @throws {Error} If the method is not implemented.
   */
  async findById(id) {
    throw new Error('Method not implemented: findById');
  }

  /**
   * Updates a user by their ID.
   * @param {string} id - The user ID to update.
   * @param {Object} data - The data to update.
   * @returns {Promise<User>} The updated user object.
   * @throws {Error} If the method is not implemented.
   */
  async update(id, data) {
    throw new Error('Method not implemented: update');
  }

  // Define other abstract methods as needed (create, update, delete, etc.)
}

module.exports = UserRepository; 