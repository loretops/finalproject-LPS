const { PrismaClient } = require('@prisma/client');
const VerificationTokenRepository = require('../../domain/repositories/VerificationTokenRepository');
const VerificationToken = require('../../domain/entities/VerificationToken');

/**
 * Prisma implementation of the VerificationToken repository
 */
class PrismaVerificationTokenRepository extends VerificationTokenRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  /**
   * Maps a Prisma model to a domain entity
   * @param {Object} model - The Prisma model
   * @returns {VerificationToken} The domain entity
   */
  _toDomainEntity(model) {
    if (!model) return null;
    
    return new VerificationToken({
      id: model.id,
      userId: model.userId,
      token: model.token,
      used: model.used,
      createdAt: model.createdAt,
      expiresAt: model.expiresAt
    });
  }

  /**
   * Maps a domain entity to Prisma format
   * @param {VerificationToken} entity - The domain entity
   * @returns {Object} Data in Prisma format
   */
  _toPrismaModel(entity) {
    return {
      id: entity.id,
      userId: entity.userId,
      token: entity.token,
      used: entity.used,
      createdAt: entity.createdAt,
      expiresAt: entity.expiresAt
    };
  }

  /**
   * Creates a new verification token
   * @param {VerificationToken} verificationToken - The verification token to create
   * @returns {Promise<VerificationToken>} The created verification token
   */
  async create(verificationToken) {
    const data = this._toPrismaModel(verificationToken);
    
    const result = await this.prisma.verificationToken.create({
      data: {
        userId: data.userId,
        token: data.token,
        used: data.used,
        expiresAt: data.expiresAt
      }
    });
    
    return this._toDomainEntity(result);
  }

  /**
   * Finds a verification token by its token string
   * @param {string} token - The token string to search for
   * @returns {Promise<VerificationToken|null>} The verification token if found, null otherwise
   */
  async findByToken(token) {
    const result = await this.prisma.verificationToken.findUnique({
      where: { token }
    });
    
    return this._toDomainEntity(result);
  }

  /**
   * Finds all verification tokens for a user
   * @param {string} userId - The user ID to find tokens for
   * @returns {Promise<VerificationToken[]>} An array of verification tokens
   */
  async findByUserId(userId) {
    const results = await this.prisma.verificationToken.findMany({
      where: { userId }
    });
    
    return results.map(result => this._toDomainEntity(result));
  }

  /**
   * Updates a verification token
   * @param {string} id - The ID of the token to update
   * @param {Object} data - The data to update
   * @returns {Promise<VerificationToken>} The updated verification token
   */
  async update(id, data) {
    const result = await this.prisma.verificationToken.update({
      where: { id },
      data
    });
    
    return this._toDomainEntity(result);
  }
}

module.exports = PrismaVerificationTokenRepository; 