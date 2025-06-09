const { PrismaClient } = require('@prisma/client');
const InterestRepository = require('../../domain/repositories/InterestRepository');

const prisma = new PrismaClient();

/**
 * Prisma-based implementation of the InterestRepository interface.
 */
class PrismaInterestRepository extends InterestRepository {
  /**
   * Creates a new interest.
   * @param {Object} interestData - Data for creating interest
   * @returns {Promise<Object>} Created interest
   */
  async create(interestData) {
    try {
      return await prisma.interest.create({
        data: interestData,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          },
          project: {
            select: {
              title: true
            }
          }
        }
      });
    } catch (error) {
      console.error("Error creating interest:", error);
      throw error;
    }
  }

  /**
   * Finds interest by user and project IDs.
   * @param {string} userId - User ID
   * @param {string} projectId - Project ID
   * @returns {Promise<Object|null>} Interest if found, null otherwise
   */
  async findByUserAndProject(userId, projectId) {
    try {
      return await prisma.interest.findFirst({
        where: {
          userId: userId,
          projectId: projectId
        }
      });
    } catch (error) {
      console.error("Error finding interest by user and project:", error);
      throw error;
    }
  }

  /**
   * Gets all interests for a user.
   * @param {string} userId - User ID
   * @param {Object} options - Optional parameters for filtering/pagination
   * @returns {Promise<Array<Object>>} List of interests
   */
  async findByUser(userId, options = {}) {
    const { status, limit, offset, includeProject = true } = options;
    
    try {
      const whereClause = {
        userId
      };
      
      // Add status filter if provided
      if (status) {
        whereClause.status = status;
      }
      
      // Create base query
      let query = {
        where: whereClause,
        orderBy: {
          createdAt: 'desc'
        }
      };
      
      // Add pagination if provided
      if (limit !== undefined) {
        query.take = limit;
      }
      if (offset !== undefined) {
        query.skip = offset;
      }
      
      // Include project data if requested
      if (includeProject) {
        query.include = {
          project: {
            select: {
              id: true,
              title: true,
              description: true,
              status: true,
              expectedRoi: true,
              minimumInvestment: true,
              targetAmount: true,
              currentAmount: true,
              location: true,
              propertyType: true,
              documents: {
                where: {
                  documentType: 'image',
                  accessLevel: 'public'
                },
                take: 1
              }
            }
          }
        };
      }
      
      return await prisma.interest.findMany(query);
    } catch (error) {
      console.error("Error finding interests by user:", error);
      throw error;
    }
  }

  /**
   * Gets all interests for a project.
   * @param {string} projectId - Project ID
   * @param {Object} options - Optional parameters for filtering/pagination
   * @returns {Promise<Array<Object>>} List of interests
   */
  async findByProject(projectId, options = {}) {
    const { status, limit, offset, includeUser = true } = options;
    
    try {
      const whereClause = {
        projectId
      };
      
      // Add status filter if provided
      if (status) {
        whereClause.status = status;
      }
      
      // Create base query
      let query = {
        where: whereClause,
        orderBy: {
          createdAt: 'desc'
        }
      };
      
      // Add pagination if provided
      if (limit !== undefined) {
        query.take = limit;
      }
      if (offset !== undefined) {
        query.skip = offset;
      }
      
      // Include user data if requested
      if (includeUser) {
        query.include = {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        };
      }
      
      return await prisma.interest.findMany(query);
    } catch (error) {
      console.error("Error finding interests by project:", error);
      throw error;
    }
  }

  /**
   * Updates the status of an interest.
   * @param {string} id - Interest ID
   * @param {string} status - New status (active, converted, declined)
   * @returns {Promise<Object>} Updated interest
   */
  async updateStatus(id, status) {
    try {
      return await prisma.interest.update({
        where: { id },
        data: { status }
      });
    } catch (error) {
      console.error("Error updating interest status:", error);
      throw error;
    }
  }

  /**
   * Deletes an interest.
   * @param {string} id - Interest ID
   * @returns {Promise<boolean>} Success indicator
   */
  async delete(id) {
    try {
      await prisma.interest.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error("Error deleting interest:", error);
      throw error;
    }
  }
}

module.exports = PrismaInterestRepository; 