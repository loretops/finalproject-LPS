import { apiClient } from './authService';

/**
 * Servicio para gestionar operaciones de verificación de email
 */
const VerificationService = {
  /**
   * Verifica un token de email
   * @param {string} token - Token de verificación recibido por email
   * @returns {Promise<Object>} Resultado de la verificación
   */
  async verifyEmail(token) {
    try {
      const response = await apiClient.get(`/verification/verify/${token}`);
      return response.data;
    } catch (error) {
      // Capturar errores específicos devueltos por el servidor
      if (error.response && error.response.data) {
        return error.response.data;
      }
      // Error genérico
      throw new Error('Error al verificar el correo electrónico');
    }
  },

  /**
   * Reenvía el email de verificación al correo especificado
   * @param {string} email - Correo electrónico del usuario
   * @returns {Promise<Object>} Resultado del reenvío
   */
  async resendVerificationEmail(email) {
    try {
      const response = await apiClient.post('/verification/resend', { email });
      return response.data;
    } catch (error) {
      // Capturar errores específicos devueltos por el servidor
      if (error.response && error.response.data) {
        return error.response.data;
      }
      // Error genérico
      throw new Error('Error al reenviar el correo de verificación');
    }
  },

  /**
   * Comprueba el estado de verificación del usuario actual
   * @returns {Promise<Object>} Estado de verificación
   */
  async checkVerificationStatus() {
    try {
      const response = await apiClient.get('/verification/status');
      return response.data;
    } catch (error) {
      // Capturar errores específicos devueltos por el servidor
      if (error.response && error.response.data) {
        return error.response.data;
      }
      // Error genérico
      throw new Error('Error al comprobar el estado de verificación');
    }
  },

  /**
   * Envía un nuevo email de verificación al usuario actual
   * @returns {Promise<Object>} Resultado del envío
   */
  async sendVerificationEmail() {
    try {
      const response = await apiClient.post('/verification/send');
      return response.data;
    } catch (error) {
      // Capturar errores específicos devueltos por el servidor
      if (error.response && error.response.data) {
        return error.response.data;
      }
      // Error genérico
      throw new Error('Error al enviar el correo de verificación');
    }
  }
};

export default VerificationService; 