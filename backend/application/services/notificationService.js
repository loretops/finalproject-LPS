const { PrismaClient } = require('@prisma/client');

// Instanciar el cliente de Prisma
const prisma = new PrismaClient();

/**
 * Servicio para la gestión de notificaciones del sistema.
 */
class NotificationService {
  /**
   * Crea una nueva notificación para un usuario.
   * @param {Object} notificationData - Datos de la notificación
   * @param {string} notificationData.userId - ID del usuario destinatario
   * @param {string} notificationData.type - Tipo de notificación (new_interest, project_update, etc.)
   * @param {string} notificationData.content - Contenido de la notificación
   * @param {string} [notificationData.relatedId] - ID opcional de entidad relacionada (proyecto, interés, etc.)
   * @returns {Promise<Object>} Notificación creada
   */
  async createNotification(notificationData) {
    if (!notificationData.userId || !notificationData.type || !notificationData.content) {
      throw new Error('Los campos userId, type y content son obligatorios para crear una notificación');
    }
    
    try {
      return await prisma.notification.create({
        data: {
          userId: notificationData.userId,
          type: notificationData.type,
          content: notificationData.content,
          relatedId: notificationData.relatedId,
          read: false,
          // createdAt se asigna automáticamente
        }
      });
    } catch (error) {
      console.error('Error en NotificationService.createNotification:', error);
      throw error;
    }
  }
  
  /**
   * Marca una notificación como leída.
   * @param {string} notificationId - ID de la notificación
   * @returns {Promise<Object>} Notificación actualizada
   */
  async markAsRead(notificationId) {
    try {
      return await prisma.notification.update({
        where: { id: notificationId },
        data: { read: true }
      });
    } catch (error) {
      console.error('Error en NotificationService.markAsRead:', error);
      throw error;
    }
  }
  
  /**
   * Obtiene todas las notificaciones de un usuario.
   * @param {string} userId - ID del usuario
   * @param {Object} options - Opciones de filtrado/paginación
   * @param {boolean} [options.unreadOnly=false] - Filtrar solo no leídas
   * @param {number} [options.limit] - Límite de resultados
   * @param {number} [options.offset] - Offset para paginación
   * @returns {Promise<Array<Object>>} Lista de notificaciones
   */
  async getUserNotifications(userId, options = {}) {
    try {
      const { unreadOnly = false, limit, offset } = options;
      
      const whereClause = { userId };
      if (unreadOnly) {
        whereClause.read = false;
      }
      
      const query = {
        where: whereClause,
        orderBy: {
          createdAt: 'desc'
        }
      };
      
      // Añadir paginación si se proporciona
      if (limit !== undefined) {
        query.take = limit;
      }
      if (offset !== undefined) {
        query.skip = offset;
      }
      
      return await prisma.notification.findMany(query);
    } catch (error) {
      console.error('Error en NotificationService.getUserNotifications:', error);
      throw error;
    }
  }
  
  /**
   * Crea una notificación para interés en proyecto.
   * @param {Object} interestData - Datos del interés
   * @param {Object} userData - Datos del usuario que mostró interés
   * @param {Object} projectData - Datos del proyecto
   * @returns {Promise<Object>} Notificación creada
   */
  async createInterestNotification(interestData, userData, projectData) {
    try {
      // Determinar el destinatario (gestor del proyecto)
      const project = await prisma.project.findUnique({
        where: { id: projectData.id },
        select: { createdBy: true, title: true }
      });
      
      if (!project) {
        throw new Error('Proyecto no encontrado');
      }
      
      // Crear notificación para el gestor del proyecto
      const content = `${userData.firstName} ${userData.lastName} ha mostrado interés en el proyecto "${project.title}"`;
      
      return await this.createNotification({
        userId: project.createdBy,
        type: 'new_interest',
        content,
        relatedId: interestData.id
      });
    } catch (error) {
      console.error('Error en NotificationService.createInterestNotification:', error);
      throw error;
    }
  }
}

module.exports = new NotificationService(); 