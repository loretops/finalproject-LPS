const notificationService = require('../../../application/services/notificationService');

class NotificationController {
  /**
   * Obtiene las notificaciones del usuario autenticado
   * @param {object} req - Objeto de solicitud
   * @param {object} res - Objeto de respuesta
   */
  async getUserNotifications(req, res) {
    try {
      const userId = req.user.id;
      const { unreadOnly, limit } = req.query;
      
      const options = {
        unreadOnly: unreadOnly === 'true',
        limit: limit ? parseInt(limit) : 10
      };
      
      const notifications = await notificationService.getUserNotifications(userId, options);
      
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error al obtener notificaciones del usuario:', error);
      res.status(500).json({ message: error.message || 'Error al obtener notificaciones' });
    }
  }
  
  /**
   * Marca una notificación como leída
   * @param {object} req - Objeto de solicitud
   * @param {object} res - Objeto de respuesta
   */
  async markAsRead(req, res) {
    try {
      const userId = req.user.id;
      const { notificationId } = req.params;
      
      const notification = await notificationService.markAsRead(notificationId, userId);
      
      res.status(200).json(notification);
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
      res.status(error.message.includes('no encontrada') ? 404 : 500)
        .json({ message: error.message || 'Error al marcar notificación como leída' });
    }
  }
  
  /**
   * Marca todas las notificaciones del usuario como leídas
   * @param {object} req - Objeto de solicitud
   * @param {object} res - Objeto de respuesta
   */
  async markAllAsRead(req, res) {
    try {
      const userId = req.user.id;
      
      const count = await notificationService.markAllAsRead(userId);
      
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
      res.status(500).json({ message: error.message || 'Error al marcar notificaciones como leídas' });
    }
  }
  
  /**
   * Elimina una notificación
   * @param {object} req - Objeto de solicitud
   * @param {object} res - Objeto de respuesta
   */
  async deleteNotification(req, res) {
    try {
      const userId = req.user.id;
      const { notificationId } = req.params;
      
      await notificationService.deleteNotification(notificationId, userId);
      
      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
      res.status(error.message.includes('no encontrada') ? 404 : 500)
        .json({ message: error.message || 'Error al eliminar notificación' });
    }
  }
}

module.exports = new NotificationController(); 