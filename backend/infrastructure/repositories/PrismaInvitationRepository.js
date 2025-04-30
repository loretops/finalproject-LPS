const { PrismaClient, InvitationStatus } = require('@prisma/client');
const InvitationRepository = require('../../domain/repositories/InvitationRepository');

const prisma = new PrismaClient();

/**
 * Prisma-based implementation of the InvitationRepository interface.
 */
class PrismaInvitationRepository extends InvitationRepository {

  async create(invitationData) {
    try {
      return await prisma.invitation.create({
        data: invitationData,
      });
    } catch (error) {
      console.error("Error creating invitation:", error);
      // Handle potential errors, e.g., unique constraint violation
      throw error; 
    }
  }

  async findByToken(token) {
    try {
      return await prisma.invitation.findUnique({
        where: { token },
      });
    } catch (error) {
      console.error("Error finding invitation by token:", error);
      throw error;
    }
  }

  async findActiveByEmail(email) {
    try {
      return await prisma.invitation.findFirst({
        where: {
          email: email,
          status: InvitationStatus.PENDING,
          expiresAt: { 
            gt: new Date() // Greater than current time -> not expired
          },
        },
      });
    } catch (error) {
      console.error("Error finding active invitation by email:", error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await prisma.invitation.findMany({
        orderBy: {
          createdAt: 'desc' // Most recent first
        },
        include: {
          inviter: {
            select: {
              email: true // Include the email of who invited
            }
          }
        }
      });
    } catch (error) {
      console.error("Error finding all invitations:", error);
      throw error;
    }
  }

  async updateStatus(token, newStatus) {
    // Ensure newStatus is a valid InvitationStatus enum value
    if (!Object.values(InvitationStatus).includes(newStatus)) {
      throw new Error(`Invalid status provided: ${newStatus}`);
    }
    try {
      return await prisma.invitation.update({
        where: { token },
        data: { status: newStatus },
      });
    } catch (error) {
      console.error("Error updating invitation status:", error);
      // Handle potential errors, e.g., record not found
      throw error;
    }
  }
}

module.exports = PrismaInvitationRepository; 