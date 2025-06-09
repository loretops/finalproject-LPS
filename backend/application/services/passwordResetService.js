const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const prisma = require('../../utils/prismaClient');
const { EmailService } = require('./emailService');
const { generateSecureToken } = require('../../utils/tokenUtils');

/**
 * Servicio para gestionar la recuperación de contraseñas
 */
class PasswordResetService {
  constructor() {
    this.prisma = prisma;
    this.emailService = new EmailService();
  }

  /**
   * Genera un token de recuperación y envía un correo al usuario
   * @param {string} email - Correo electrónico del usuario
   * @returns {Promise<Object>} Resultado de la operación
   */
  async initiatePasswordReset(email) {
    try {
      // 1. Buscar al usuario por email
      const user = await this.prisma.user.findUnique({
        where: { email }
      });

      // 2. Si no existe el usuario, devolver un mensaje indicando que no existe
      if (!user) {
        return { 
          success: false, 
          message: 'No existe ningún usuario o socio con ese correo electrónico' 
        };
      }

      // 3. Generar token seguro
      const token = generateSecureToken();
      const expires = new Date();
      expires.setHours(expires.getHours() + 24); // Token válido por 24 horas

      // 4. Guardar token en la base de datos
      // Primero, invalidar tokens existentes para este usuario
      await this.prisma.passwordResetToken.updateMany({
        where: {
          userId: user.id,
          used: false
        },
        data: {
          used: true
        }
      });

      // Crear nuevo token
      await this.prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token: token,
          expiresAt: expires,
          used: false
        }
      });

      // 5. Generar URL de recuperación
      const resetUrl = `${process.env.FRONTEND_URL}/resetear-password?token=${token}`;

      // 6. Enviar correo electrónico
      const name = user.firstName && user.lastName 
        ? `${user.firstName} ${user.lastName}`
        : user.email;

      await this.emailService.sendEmail({
        to: user.email,
        subject: 'Restablecimiento de contraseña en COOPCO',
        template: 'password-reset',
        context: {
          name,
          resetUrl
        }
      });

      return { success: true, message: 'Si el correo existe, se ha enviado un enlace de recuperación' };
    } catch (error) {
      console.error('Error iniciando restablecimiento de contraseña:', error);
      throw new Error(`Error al iniciar recuperación de contraseña: ${error.message}`);
    }
  }

  /**
   * Valida un token de recuperación de contraseña
   * @param {string} token - Token a validar
   * @returns {Promise<Object>} Resultado de la validación
   */
  async validatePasswordResetToken(token) {
    try {
      if (!token) {
        return { valid: false, reason: 'token_required' };
      }

      // Buscar token en la base de datos
      const resetToken = await this.prisma.passwordResetToken.findUnique({
        where: { token },
        include: { user: true }
      });

      // Verificar si el token existe
      if (!resetToken) {
        return { valid: false, reason: 'token_not_found' };
      }

      // Verificar si el token ya fue utilizado
      if (resetToken.used) {
        return { valid: false, reason: 'token_used' };
      }

      // Verificar si el token ha expirado
      if (new Date() > resetToken.expiresAt) {
        return { valid: false, reason: 'token_expired' };
      }

      // El token es válido
      return { 
        valid: true, 
        userId: resetToken.userId,
        email: resetToken.user.email
      };
    } catch (error) {
      console.error('Error validando token de recuperación:', error);
      return { valid: false, reason: 'server_error', error: error.message };
    }
  }

  /**
   * Restablece la contraseña de un usuario utilizando un token válido
   * @param {string} token - Token de recuperación
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise<Object>} Resultado de la operación
   */
  async resetPassword(token, newPassword) {
    try {
      // 1. Validar el token
      const tokenValidation = await this.validatePasswordResetToken(token);

      if (!tokenValidation.valid) {
        return { success: false, reason: tokenValidation.reason };
      }

      // 2. Validar la nueva contraseña
      if (!newPassword || newPassword.length < 8) {
        return { success: false, reason: 'invalid_password' };
      }

      // 3. Hashear la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // 4. Actualizar la contraseña del usuario
      await this.prisma.user.update({
        where: { id: tokenValidation.userId },
        data: { passwordHash: hashedPassword }
      });

      // 5. Marcar el token como utilizado
      await this.prisma.passwordResetToken.update({
        where: { token },
        data: { used: true }
      });

      return { success: true };
    } catch (error) {
      console.error('Error restableciendo contraseña:', error);
      return { success: false, reason: 'server_error', error: error.message };
    }
  }
}

module.exports = new PasswordResetService(); 