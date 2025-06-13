// Importar la instancia compartida de PrismaClient
const prisma = require('../../utils/prismaClient');

/**
 * Servicio para la gestión de notificaciones en el sistema.
 */
class NotificationService {
  /**
   * Crea una nueva notificación.
   * @param {Object} notificationData - Datos de la notificación
   * @param {string} notificationData.userId - ID del usuario que recibirá la notificación
   * @param {string} notificationData.type - Tipo de notificación
   * @param {string} notificationData.content - Contenido de la notificación
   * @param {string} [notificationData.relatedId] - ID opcional relacionado (inversión, proyecto, etc.)
   * @returns {Promise<Object>} - La notificación creada
   */
  async createNotification(notificationData) {
    const { userId, type, content, relatedId } = notificationData;

    if (!userId || !type || !content) {
      throw new Error('Usuario, tipo y contenido son requeridos para crear una notificación');
    }

    try {
      const notification = await prisma.notification.create({
        data: {
          userId,
          type,
          content,
          relatedId,
          read: false,
          createdAt: new Date()
        }
      });

      return notification;
    } catch (error) {
      console.error('Error al crear notificación:', error);
      throw new Error(`Error al crear notificación: ${error.message}`);
    }
  }

  /**
   * Obtiene todas las notificaciones de un usuario.
   * @param {string} userId - ID del usuario
   * @param {Object} options - Opciones de filtrado
   * @param {boolean} [options.unreadOnly=false] - Filtrar solo por no leídas
   * @param {number} [options.limit=10] - Límite de resultados
   * @returns {Promise<Array>} - Lista de notificaciones del usuario
   */
  async getUserNotifications(userId, options = {}) {
    const { unreadOnly = false, limit = 10 } = options;

    if (!userId) {
      throw new Error('ID de usuario requerido');
    }

    try {
      const where = { userId };
      if (unreadOnly) {
        where.read = false;
      }

      const notifications = await prisma.notification.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        },
        take: limit
      });

      return notifications;
    } catch (error) {
      console.error('Error al obtener notificaciones del usuario:', error);
      throw new Error(`Error al obtener notificaciones: ${error.message}`);
    }
  }

  /**
   * Marca una notificación como leída.
   * @param {string} notificationId - ID de la notificación
   * @param {string} userId - ID del usuario propietario
   * @returns {Promise<Object>} - La notificación actualizada
   */
  async markAsRead(notificationId, userId) {
    if (!notificationId || !userId) {
      throw new Error('ID de notificación y ID de usuario son requeridos');
    }

    try {
      // Verificar que la notificación pertenece al usuario
      const notification = await prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId
        }
      });

      if (!notification) {
        throw new Error('Notificación no encontrada o no pertenece al usuario');
      }

      // Actualizar a leída
      const updatedNotification = await prisma.notification.update({
        where: { id: notificationId },
        data: { read: true }
      });

      return updatedNotification;
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
      throw new Error(`Error al marcar notificación como leída: ${error.message}`);
    }
  }

  /**
   * Marca todas las notificaciones de un usuario como leídas.
   * @param {string} userId - ID del usuario
   * @returns {Promise<number>} - Número de notificaciones actualizadas
   */
  async markAllAsRead(userId) {
    if (!userId) {
      throw new Error('ID de usuario requerido');
    }

    try {
      const result = await prisma.notification.updateMany({
        where: {
          userId,
          read: false
        },
        data: {
          read: true
        }
      });

      return result.count;
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
      throw new Error(`Error al marcar notificaciones como leídas: ${error.message}`);
    }
  }

  /**
   * Elimina una notificación.
   * @param {string} notificationId - ID de la notificación
   * @param {string} userId - ID del usuario propietario
   * @returns {Promise<Object>} - La notificación eliminada
   */
  async deleteNotification(notificationId, userId) {
    if (!notificationId || !userId) {
      throw new Error('ID de notificación y ID de usuario son requeridos');
    }

    try {
      // Verificar que la notificación pertenece al usuario
      const notification = await prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId
        }
      });

      if (!notification) {
        throw new Error('Notificación no encontrada o no pertenece al usuario');
      }

      // Eliminar la notificación
      const deletedNotification = await prisma.notification.delete({
        where: { id: notificationId }
      });

      return deletedNotification;
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
      throw new Error(`Error al eliminar notificación: ${error.message}`);
    }
  }
}

// Exportar una instancia de la clase en lugar de la clase
module.exports = new NotificationService(); 