const PrismaInterestRepository = require('../../infrastructure/repositories/PrismaInterestRepository');
const notificationService = require('./notificationService');
const projectService = require('./projectService');
const { PrismaClient } = require('@prisma/client');

// Importar la instancia compartida de PrismaClient
const prisma = require('../../utils/prismaClient');

// Instanciar el repositorio y cliente Prisma
const interestRepository = new PrismaInterestRepository();

/**
 * Clase que implementa el servicio de gestión de intereses en proyectos.
 */
class InterestService {
  /**
   * Registra un nuevo interés de un usuario en un proyecto.
   * @param {string} userId - ID del usuario que muestra interés
   * @param {string} projectId - ID del proyecto de interés
   * @param {string} [notes] - Notas opcionales sobre el interés
   * @returns {Promise<Object>} Interés registrado
   */
  async registerInterest(userId, projectId, notes = null) {
    // Validación inicial de parámetros
    if (!userId || !projectId) {
      throw new Error('El ID del usuario y del proyecto son obligatorios');
    }
    
    try {
      // Verificar que el proyecto existe y está publicado
      console.log(`[InterestService] Verificando proyecto ${projectId}`);
      const project = await projectService.getProjectById(projectId);
      
      if (!project) {
        console.error(`[InterestService] Proyecto no encontrado: ${projectId}`);
        throw new Error('Proyecto no encontrado');
      }
      
      console.log(`[InterestService] Estado del proyecto: ${project.status}`);
      if (project.status !== 'published') {
        throw new Error('Solo se puede mostrar interés en proyectos publicados');
      }
      
      // Verificar si ya existe un interés activo para este usuario y proyecto
      console.log(`[InterestService] Verificando interés existente - Usuario: ${userId}, Proyecto: ${projectId}`);
      const existingInterest = await interestRepository.findByUserAndProject(userId, projectId);
      
      if (existingInterest) {
        console.log(`[InterestService] Interés existente encontrado: ${existingInterest.id}, Estado: ${existingInterest.status}`);
        
        if (existingInterest.status === 'active') {
          // Devolver el interés existente en lugar de lanzar error
          return existingInterest;
        } else {
          // Si existe pero no está activo, actualizamos su estado y notas
          console.log(`[InterestService] Reactivando interés: ${existingInterest.id}`);
          let updatedInterest;
          
          try {
            updatedInterest = await interestRepository.updateStatus(existingInterest.id, 'active');
            
            // Actualizamos las notas si se proporcionaron
            if (notes) {
              await prisma.interest.update({
                where: { id: existingInterest.id },
                data: { notes }
              });
            }
          } catch (updateError) {
            console.error(`[InterestService] Error al actualizar interés: ${updateError.message}`);
            // Si falla la actualización, devolvemos el interés existente
            return existingInterest;
          }
          
          return updatedInterest;
        }
      }
      
      // Crear el nuevo interés
      console.log(`[InterestService] Creando nuevo interés`);
      const interestData = {
        userId,
        projectId,
        status: 'active',
        notes
      };
      
      let interest;
      try {
        interest = await interestRepository.create(interestData);
      } catch (createError) {
        // Capturar errores específicos de Prisma
        if (createError.code === 'P2002') {
          console.log('[InterestService] Conflicto de clave única, intentando obtener el interés existente');
          // Si hay un error de clave única, intentamos obtener el interés existente
          const existingInterest = await interestRepository.findByUserAndProject(userId, projectId);
          if (existingInterest) {
            return existingInterest;
          }
          // Si no podemos encontrarlo, propagamos el error original
          throw new Error('Ya existe un interés para este usuario y proyecto');
        }
        throw createError;
      }
      
      // Obtener información del usuario para la notificación
      console.log(`[InterestService] Preparando notificación`);
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { firstName: true, lastName: true, email: true }
        });
        
        if (user && project) {
          // Crear notificación para el gestor del proyecto
          await notificationService.createInterestNotification(interest, user, project);
        } else {
          console.warn(`[InterestService] No se pudo crear notificación: datos insuficientes`);
        }
      } catch (notificationError) {
        // Si hay un error al crear la notificación, lo registramos pero permitimos continuar
        console.error('[InterestService] Error al crear notificación:', notificationError);
      }
      
      return interest;
    } catch (error) {
      console.error(`[InterestService] Error en registerInterest:`, error);
      // Re-lanzar el error original para que sea manejado por el controlador
      throw error;
    }
  }
  
  /**
   * Obtiene todos los proyectos en los que un usuario ha mostrado interés.
   * @param {string} userId - ID del usuario
   * @param {Object} options - Opciones de filtrado/paginación
   * @returns {Promise<Array<Object>>} Lista de intereses con información de proyectos
   */
  async getUserInterests(userId, options = {}) {
    if (!userId) {
      throw new Error('El ID del usuario es obligatorio');
    }
    
    try {
      // Usar consulta simplificada para reducir la carga
      const interests = await prisma.interest.findMany({
        where: {
          userId: userId,
          ...(options.status ? { status: options.status } : {})
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: options.offset || 0,
        take: options.limit || 10,
        include: {
          project: {
            select: {
              id: true,
              title: true,
              description: true,
              status: true,
              expectedRoi: true,
              minimumInvestment: true,
              targetAmount: true,
              currentAmount: true,
              location: true,
              propertyType: true,
              documents: {
                where: {
                  documentType: 'image',
                  accessLevel: 'public'
                },
                take: 1,
                select: {
                  fileUrl: true
                }
              }
            }
          }
        }
      });
      
      // Transformar los resultados para un formato adecuado para el frontend
      return interests.map(interest => ({
        id: interest.id,
        status: interest.status,
        notes: interest.notes,
        createdAt: interest.createdAt,
        project: interest.project ? {
          id: interest.project.id,
          title: interest.project.title,
          description: interest.project.description,
          status: interest.project.status,
          expectedRoi: interest.project.expectedRoi,
          minimumInvestment: interest.project.minimumInvestment,
          targetAmount: interest.project.targetAmount,
          currentAmount: interest.project.currentAmount,
          location: interest.project.location,
          propertyType: interest.project.propertyType,
          imageUrl: interest.project.documents && interest.project.documents.length > 0 
            ? interest.project.documents[0].fileUrl 
            : null
        } : null
      }));
    } catch (error) {
      console.error('Error en InterestService.getUserInterests:', error);
      throw error;
    }
  }
  
  /**
   * Obtiene todos los usuarios que han mostrado interés en un proyecto.
   * @param {string} projectId - ID del proyecto
   * @param {Object} options - Opciones de filtrado/paginación
   * @returns {Promise<Array<Object>>} Lista de intereses con información de usuarios
   */
  async getProjectInterests(projectId, options = {}) {
    if (!projectId) {
      throw new Error('El ID del proyecto es obligatorio');
    }
    
    try {
      const interests = await interestRepository.findByProject(projectId, options);
      
      // Transformar los resultados para un formato adecuado para el frontend
      return interests.map(interest => ({
        id: interest.id,
        status: interest.status,
        notes: interest.notes,
        createdAt: interest.createdAt,
        user: interest.user ? {
          id: interest.user.id,
          name: `${interest.user.firstName} ${interest.user.lastName}`,
          email: interest.user.email
        } : null
      }));
    } catch (error) {
      console.error('Error en InterestService.getProjectInterests:', error);
      throw error;
    }
  }
  
  /**
   * Elimina un interés existente.
   * @param {string} interestId - ID del interés a eliminar
   * @param {string} userId - ID del usuario que solicita la eliminación
   * @returns {Promise<boolean>} Indicador de éxito
   */
  async removeInterest(interestId, userId) {
    if (!interestId || !userId) {
      throw new Error('El ID del interés y del usuario son obligatorios');
    }
    
    try {
      // Verificar que el interés existe y pertenece al usuario
      const interest = await prisma.interest.findUnique({
        where: { id: interestId }
      });
      
      if (!interest) {
        throw new Error('Interés no encontrado');
      }
      
      if (interest.userId !== userId) {
        throw new Error('No tienes permiso para eliminar este interés');
      }
      
      // Eliminar el interés
      return await interestRepository.delete(interestId);
    } catch (error) {
      console.error('Error en InterestService.removeInterest:', error);
      throw error;
    }
  }
  
  /**
   * Cambia el estado de un interés.
   * @param {string} interestId - ID del interés a actualizar
   * @param {string} status - Nuevo estado ('active', 'converted', 'declined')
   * @returns {Promise<Object>} Interés actualizado
   */
  async changeInterestStatus(interestId, status) {
    if (!interestId || !status) {
      throw new Error('El ID del interés y el nuevo estado son obligatorios');
    }
    
    // Validar que el estado sea válido
    const validStatuses = ['active', 'converted', 'declined'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Estado inválido. Debe ser uno de: ${validStatuses.join(', ')}`);
    }
    
    try {
      return await interestRepository.updateStatus(interestId, status);
    } catch (error) {
      console.error('Error en InterestService.changeInterestStatus:', error);
      throw error;
    }
  }
}

module.exports = new InterestService(); 