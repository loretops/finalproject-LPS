const passwordResetService = require('../../../application/services/passwordResetService');

/**
 * Controlador para gestionar las solicitudes de recuperación de contraseña
 */
class PasswordController {
  /**
   * Inicia el proceso de recuperación de contraseña
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
      }

      // Llamar al servicio para iniciar el proceso
      const result = await passwordResetService.initiatePasswordReset(email);
      
      // Si no se encontró el usuario, devolver un mensaje apropiado
      if (!result.success) {
        return res.status(404).json({ message: result.message });
      }
      
      // Si todo fue bien, devolver mensaje de éxito
      res.status(200).json({ 
        message: 'Se ha enviado un enlace de recuperación al correo electrónico indicado' 
      });
    } catch (error) {
      console.error('Error al solicitar recuperación de contraseña:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  /**
   * Valida un token de recuperación de contraseña
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async validateResetToken(req, res) {
    try {
      const { token } = req.params;
      
      if (!token) {
        return res.status(400).json({ 
          valid: false, 
          message: 'El token es obligatorio' 
        });
      }

      const result = await passwordResetService.validatePasswordResetToken(token);
      
      if (!result.valid) {
        let statusCode = 400;
        let message = 'Token inválido';
        
        switch (result.reason) {
          case 'token_not_found':
            statusCode = 404;
            message = 'Token no encontrado';
            break;
          case 'token_used':
            statusCode = 410;
            message = 'El token ya ha sido utilizado';
            break;
          case 'token_expired':
            statusCode = 410;
            message = 'El token ha expirado';
            break;
        }
        
        return res.status(statusCode).json({ 
          valid: false, 
          message 
        });
      }

      res.status(200).json({ 
        valid: true,
        email: result.email
      });
    } catch (error) {
      console.error('Error al validar token de recuperación:', error);
      res.status(500).json({ 
        valid: false, 
        message: 'Error interno del servidor' 
      });
    }
  }

  /**
   * Restablece la contraseña usando un token válido
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;
      
      if (!token || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'El token y la nueva contraseña son obligatorios' 
        });
      }

      // Validar la complejidad de la contraseña
      if (password.length < 8) {
        return res.status(400).json({ 
          success: false, 
          message: 'La contraseña debe tener al menos 8 caracteres' 
        });
      }

      const result = await passwordResetService.resetPassword(token, password);
      
      if (!result.success) {
        let statusCode = 400;
        let message = 'Error al restablecer la contraseña';
        
        switch (result.reason) {
          case 'token_not_found':
            statusCode = 404;
            message = 'Token no encontrado';
            break;
          case 'token_used':
            statusCode = 410;
            message = 'El token ya ha sido utilizado';
            break;
          case 'token_expired':
            statusCode = 410;
            message = 'El token ha expirado';
            break;
          case 'invalid_password':
            statusCode = 400;
            message = 'La contraseña no cumple con los requisitos de seguridad';
            break;
        }
        
        return res.status(statusCode).json({ 
          success: false, 
          message 
        });
      }

      res.status(200).json({ 
        success: true, 
        message: 'Contraseña restablecida correctamente' 
      });
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error interno del servidor' 
      });
    }
  }
}

module.exports = new PasswordController(); 