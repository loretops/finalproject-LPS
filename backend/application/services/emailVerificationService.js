const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const VerificationToken = require('../../domain/entities/VerificationToken');
const PrismaVerificationTokenRepository = require('../../infrastructure/repositories/PrismaVerificationTokenRepository');
const { EmailService } = require('./emailService');
const { generateSecureToken } = require('../../utils/tokenUtils');
const PrismaUserRepository = require('../../infrastructure/repositories/PrismaUserRepository');

/**
 * Servicio para manejar la verificación de correo electrónico de usuarios
 */
class EmailVerificationService {
  constructor() {
    this.tokenRepository = new PrismaVerificationTokenRepository();
    this.emailService = new EmailService();
    this.userRepository = new PrismaUserRepository();
  }

  /**
   * Genera un token único para verificación de email
   * @returns {string} Token de verificación
   */
  generateVerificationToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Crea un nuevo token de verificación para un usuario
   * @param {string} userId - ID del usuario
   * @param {number} expirationHours - Horas hasta la expiración (por defecto: 24)
   * @returns {Promise<Object>} Token de verificación creado
   */
  async createVerificationToken(userId, expirationHours = 24) {
    // Invalidar tokens anteriores del usuario
    await this.invalidateUserTokens(userId);
    
    // Crear nuevo token
    const token = this.generateVerificationToken();
    const verificationToken = VerificationToken.create({
      userId,
      token
    }, expirationHours);
    
    return this.tokenRepository.create(verificationToken);
  }

  /**
   * Invalida todos los tokens anteriores de un usuario
   * @param {string} userId - ID del usuario
   * @returns {Promise<void>}
   */
  async invalidateUserTokens(userId) {
    const tokens = await this.tokenRepository.findByUserId(userId);
    
    for (const token of tokens) {
      if (token.isValid()) {
        await this.tokenRepository.update(token.id, { used: true });
      }
    }
  }

  /**
   * Verifica un token y marca al usuario como verificado si es válido
   * @param {string} token - Token de verificación
   * @returns {Promise<Object>} Resultado de la verificación con información del usuario
   */
  async verifyEmail(token) {
    try {
      // 1. Find token in database
      const verificationToken = await this.tokenRepository.findByToken(token);
      
      if (!verificationToken) {
        return { success: false, reason: 'invalid_token' };
      }
      
      // 2. Check if token is valid (not used and not expired)
      if (!verificationToken.isValid()) {
        if (verificationToken.used) {
          return { success: false, reason: 'token_already_used' };
        }
        
        if (verificationToken.hasExpired()) {
          return { success: false, reason: 'token_expired' };
        }
        
        return { success: false, reason: 'invalid_token' };
      }
      
      // 3. Get user associated with token
      const user = await this.userRepository.findById(verificationToken.userId);
      
      if (!user) {
        return { success: false, reason: 'user_not_found' };
      }
      
      // 4. Update user's email verification status
      await this.userRepository.update(user.id, {
        emailVerified: true,
        emailVerifiedAt: new Date()
      });
      
      // 5. Mark token as used
      await this.tokenRepository.update(verificationToken.id, {
        used: true
      });
      
      return { 
        success: true, 
        user: {
          id: user.id,
          email: user.email,
          emailVerified: true
        }
      };
    } catch (error) {
      console.error('Email verification error:', error);
      return { success: false, reason: 'server_error', error: error.message };
    }
  }

  /**
   * Reenvía el email de verificación a un usuario
   * @param {string} email - The user's email address
   * @returns {Promise<Object>} Result with status of the operation
   */
  async resendVerificationEmail(email) {
    try {
      // 1. Find user by email
      const user = await this.userRepository.findByEmail(email);
      
      if (!user) {
        return { success: false, reason: 'user_not_found' };
      }
      
      // 2. Check if already verified
      if (user.emailVerified) {
        return { success: false, reason: 'already_verified' };
      }
      
      // 3. Remove existing tokens for this user (optional)
      const existingTokens = await this.tokenRepository.findByUserId(user.id);
      
      // Don't wait for these operations to complete
      for (const token of existingTokens) {
        if (!token.used && !token.hasExpired()) {
          await this.tokenRepository.update(token.id, { used: true });
        }
      }
      
      // 4. Create and send new token
      await this.sendVerificationEmail(user.id);
      
      return { success: true };
    } catch (error) {
      console.error('Error resending verification email:', error);
      return { success: false, reason: 'server_error', error: error.message };
    }
  }

  /**
   * Generate a verification token for a user and send verification email
   * @param {string} userId - The ID of the user to verify
   * @returns {Promise<Object>} The created verification token
   * @throws {Error} If token generation or email sending fails
   */
  async sendVerificationEmail(userId) {
    try {
      // 1. Find the user
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // 2. Check if user is already verified
      if (user.emailVerified) {
        throw new Error('Email is already verified');
      }

      // 3. Generate token
      const token = generateSecureToken();
      
      // 4. Create verification token entity
      const verificationToken = VerificationToken.create({
        userId,
        token
      }, 24);
      
      // 5. Save token in database
      const savedToken = await this.tokenRepository.create(verificationToken);
      
      // 6. Generate verification URL
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
      
      // 7. Send verification email
      const name = user.firstName && user.lastName 
        ? `${user.firstName} ${user.lastName}`
        : user.email;
      
      await this.emailService.sendEmail({
        to: user.email,
        subject: 'Verifica tu cuenta en COOPCO',
        template: 'email-verification',
        context: {
          name,
          verificationUrl
        }
      });
      
      return savedToken;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error(`Failed to send verification email: ${error.message}`);
    }
  }

  /**
   * Comprueba si un usuario tiene el email verificado
   * @param {string} userId - ID del usuario
   * @returns {Promise<boolean>} True si el email está verificado
   */
  async isEmailVerified(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { emailVerified: true }
    });
    
    return user?.emailVerified || false;
  }
}

module.exports = new EmailVerificationService(); 