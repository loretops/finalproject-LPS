const { PrismaClient } = require('@prisma/client');
const UserRepository = require('../../domain/repositories/UserRepository');
const User = require('../../domain/entities/User'); // Optional: For mapping results to domain object

const prisma = new PrismaClient();

/**
 * Prisma-based implementation of the UserRepository interface.
 */
class PrismaUserRepository extends UserRepository {
  /**
   * Finds a user by their email address using Prisma.
   * @param {string} email - The email address to search for.
   * @returns {Promise<User|null>} The user object or null if not found.
   */
  async findByEmail(email) {
    try {
      const userRecord = await prisma.user.findUnique({
        where: { email },
        include: { role: true }, // Include role if relation exists and is needed
      });

      if (!userRecord) {
        return null;
      }

      // Optional: Map Prisma record to domain entity
      // return new User(userRecord);
      return userRecord; // Return Prisma record directly for simplicity now

    } catch (error) {
      console.error("Error finding user by email in PrismaUserRepository:", error);
      // Rethrow or handle error appropriately
      throw error;
    }
  }

  /**
   * Finds a user by their ID using Prisma.
   * @param {string} id - The user ID to search for.
   * @returns {Promise<User|null>} The user object or null if not found.
   */
  async findById(id) {
     try {
      const userRecord = await prisma.user.findUnique({
        where: { id },
        include: { role: true }, // Include role if relation exists and is needed
      });

      if (!userRecord) {
        return null;
      }
      // Optional: Map Prisma record to domain entity
      // return new User(userRecord);
       return userRecord; // Return Prisma record directly for simplicity now
    } catch (error) {
      console.error("Error finding user by ID in PrismaUserRepository:", error);
      // Rethrow or handle error appropriately
      throw error;
    }
  }

  /**
   * Updates a user by their ID
   * @param {string} id - The ID of the user to update
   * @param {Object} data - The data to update
   * @returns {Promise<User>} The updated user
   */
  async update(id, data) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data
      });

      return updatedUser;
    } catch (error) {
      console.error("Error updating user in PrismaUserRepository:", error);
      throw error;
    }
  }

  // Implement other methods (create, update, etc.) as needed
}

module.exports = PrismaUserRepository; 