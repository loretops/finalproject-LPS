import { apiClient } from './authService';

/**
 * Servicio para manejar las operaciones relacionadas con notificaciones
 */
class NotificationService {
  /**
   * Obtiene las notificaciones del usuario autenticado
   * @param {Object} options - Opciones de filtrado
   * @param {boolean} [options.unreadOnly=false] - Obtener solo notificaciones no leídas
   * @param {number} [options.limit=10] - Límite de resultados a obtener
   * @returns {Promise<Array>} - Lista de notificaciones
   */
  async getNotifications(options = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (options.unreadOnly !== undefined) {
        queryParams.append('unreadOnly', options.unreadOnly);
      }
      
      if (options.limit) {
        queryParams.append('limit', options.limit);
      }
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await apiClient.get(`/notifications${query}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
      throw this.handleError(error);
    }
  }
  
  /**
   * Marca una notificación como leída
   * @param {string} notificationId - ID de la notificación
   * @returns {Promise<Object>} - Notificación actualizada
   */
  async markAsRead(notificationId) {
    try {
      const response = await apiClient.patch(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
      throw this.handleError(error);
    }
  }
  
  /**
   * Marca todas las notificaciones como leídas
   * @returns {Promise<Object>} - Respuesta con el número de notificaciones actualizadas
   */
  async markAllAsRead() {
    try {
      const response = await apiClient.patch('/notifications/read-all');
      return response.data;
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
      throw this.handleError(error);
    }
  }
  
  /**
   * Elimina una notificación
   * @param {string} notificationId - ID de la notificación
   * @returns {Promise<void>}
   */
  async deleteNotification(notificationId) {
    try {
      await apiClient.delete(`/notifications/${notificationId}`);
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
      throw this.handleError(error);
    }
  }
  
  /**
   * Maneja errores de la API
   * @param {Error} error - Error capturado
   * @returns {Error} - Error formateado
   * @private
   */
  handleError(error) {
    if (error.response) {
      const message = 
        error.response.data.message || 
        error.response.data.error || 
        'Ocurrió un error con tu solicitud';
      
      const formattedError = new Error(message);
      formattedError.status = error.response.status;
      formattedError.data = error.response.data;
      return formattedError;
    }
    
    if (error.request) {
      return new Error('No se recibió respuesta del servidor. Por favor, verifica tu conexión.');
    }
    
    return error;
  }
}

export default new NotificationService(); 