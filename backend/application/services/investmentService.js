const { PrismaClient } = require('@prisma/client');
const NotificationService = require('./notificationService');

const prisma = new PrismaClient();
const Investment = require('../../domain/entities/investment');
const Project = require('../../domain/entities/project');

/**
 * Servicio para la gestión de inversiones en proyectos.
 */
class InvestmentService {
  constructor() {
    this.notificationService = new NotificationService();
  }

  /**
   * Registra una nueva inversión en un proyecto.
   * @param {Object} investmentData - Datos de la inversión
   * @param {string} investmentData.userId - ID del usuario que invierte
   * @param {string} investmentData.projectId - ID del proyecto en el que se invierte
   * @param {number} investmentData.amount - Monto de la inversión
   * @param {string} [investmentData.notes] - Notas adicionales sobre la inversión
   * @returns {Promise<Object>} - La inversión creada
   */
  async createInvestment(investmentData) {
    const { userId, projectId, amount, notes } = investmentData;

    // Validar datos requeridos
    if (!userId || !projectId || !amount) {
      throw new Error('Usuario, proyecto y monto son requeridos para crear una inversión');
    }

    // Validar que el monto sea un número positivo
    if (isNaN(amount) || amount <= 0) {
      throw new Error('El monto debe ser un valor numérico positivo');
    }

    // Crear la inversión dentro de una transacción
    const investment = await prisma.$transaction(async (prismaClient) => {
      // Obtener el proyecto
      const projectData = await prismaClient.project.findUnique({
        where: { id: projectId }
      });

      if (!projectData) {
        throw new Error('El proyecto especificado no existe');
      }

      // Crear instancia de la entidad proyecto
      const project = new Project(projectData);

      // Verificar que el proyecto está disponible para inversión
      if (!project.isAvailableForInvestment()) {
        throw new Error('El proyecto no está disponible para inversiones en este momento');
      }

      // Verificar que el monto cumple con la inversión mínima
      if (!project.meetsMinimumInvestment(amount)) {
        throw new Error(`La inversión debe ser al menos de ${project.minimumInvestment}`);
      }

      // Crear la inversión
      const newInvestment = await prismaClient.investment.create({
        data: {
          userId,
          projectId,
          amount,
          status: 'pending',
          notes: notes || null
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          project: {
            select: {
              id: true,
              title: true,
              createdBy: true
            }
          }
        }
      });

      // Actualizar el monto actual del proyecto
      await prismaClient.project.update({
        where: { id: projectId },
        data: {
          currentAmount: {
            increment: parseFloat(amount)
          }
        }
      });

      // Crear notificación para el gestor del proyecto
      if (newInvestment.project.createdBy) {
        await this.notificationService.createNotification({
          userId: newInvestment.project.createdBy,
          type: 'investment_new',
          content: `${newInvestment.user.firstName} ${newInvestment.user.lastName} ha invertido ${amount}€ en tu proyecto "${newInvestment.project.title}"`,
          relatedId: newInvestment.id
        });
      }

      // Crear notificación para el usuario que invierte
      await this.notificationService.createNotification({
        userId: investmentData.userId,
        type: 'investment_created',
        content: `Has invertido ${amount}€ en el proyecto "${newInvestment.project.title}". Tu inversión está pendiente de confirmación.`,
        relatedId: newInvestment.id
      });

      return newInvestment;
    });

    return investment;
  }

  /**
   * Obtiene todas las inversiones realizadas por un usuario.
   * @param {string} userId - ID del usuario
   * @param {Object} options - Opciones de filtrado y paginación
   * @returns {Promise<Array>} - Lista de inversiones del usuario
   */
  async getUserInvestments(userId, options = {}) {
    if (!userId) {
      throw new Error('ID de usuario requerido');
    }

    const { status, page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    // Construir filtros
    const where = { userId };
    if (status) {
      where.status = status;
    }

    // Obtener inversiones con datos del proyecto relacionado
    const investments = await prisma.investment.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            title: true,
            expectedRoi: true,
            targetAmount: true,
            currentAmount: true,
            minimumInvestment: true,
            status: true
          }
        }
      },
      orderBy: { investedAt: 'desc' },
      skip,
      take: limit
    });

    // Contar total para paginación
    const total = await prisma.investment.count({ where });

    return {
      data: investments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Obtiene todas las inversiones realizadas en un proyecto.
   * @param {string} projectId - ID del proyecto
   * @param {Object} options - Opciones de filtrado y paginación
   * @returns {Promise<Array>} - Lista de inversiones del proyecto
   */
  async getProjectInvestments(projectId, options = {}) {
    if (!projectId) {
      throw new Error('ID de proyecto requerido');
    }

    const {
      status,
      page = 1,
      limit = 10
    } = options;

    const skip = (page - 1) * limit;

    // Construir el filtro
    const where = { projectId };
    if (status) {
      where.status = status;
    }

    // Obtener las inversiones
    const [investments, total] = await Promise.all([
      prisma.investment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { investedAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          project: {
            select: {
              id: true,
              title: true
            }
          }
        }
      }),
      prisma.investment.count({ where })
    ]);

    // Calcular metadatos de paginación
    const totalPages = Math.ceil(total / limit);

    return {
      data: investments,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages
      }
    };
  }

  /**
   * Obtiene todas las inversiones en la plataforma.
   * @param {Object} options - Opciones de filtrado y paginación
   * @param {string} [options.status] - Filtrar por estado
   * @param {string} [options.projectId] - Filtrar por proyecto
   * @param {number} [options.page=1] - Número de página
   * @param {number} [options.limit=50] - Elementos por página
   * @returns {Promise<Object>} - Lista de inversiones y metadatos de paginación
   */
  async getAllInvestments(options = {}) {
    const {
      status,
      projectId,
      page = 1,
      limit = 50
    } = options;

    const skip = (page - 1) * limit;

    // Construir el filtro
    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    if (projectId) {
      where.projectId = projectId;
    }

    console.log('Filtros para getAllInvestments:', where);

    // Obtener las inversiones con un join a usuarios y proyectos
    try {
      const [investments, total] = await Promise.all([
        prisma.investment.findMany({
          where,
          skip,
          take: limit,
          orderBy: { investedAt: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            },
            project: {
              select: {
                id: true,
                title: true,
                status: true
              }
            }
          }
        }),
        prisma.investment.count({ where })
      ]);

      console.log(`Encontradas ${investments.length} inversiones de un total de ${total}`);

      // Calcular metadatos de paginación
      const totalPages = Math.ceil(total / limit);

      return {
        data: investments,
        pagination: {
          page,
          limit,
          totalItems: total,
          totalPages
        }
      };
    } catch (error) {
      console.error('Error en InvestmentService.getAllInvestments:', error);
      throw error;
    }
  }

  /**
   * Obtiene una inversión específica por su ID.
   * @param {string} id - ID de la inversión
   * @returns {Promise<Object|null>} - La inversión encontrada o null
   */
  async getInvestmentById(id) {
    if (!id) {
      throw new Error('ID de inversión requerido');
    }

    const investment = await prisma.investment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        project: {
          select: {
            id: true,
            title: true,
            expectedRoi: true,
            status: true
          }
        }
      }
    });

    return investment;
  }

  /**
   * Actualiza el estado de una inversión.
   * @param {string} id - ID de la inversión
   * @param {Object} updateData - Datos para actualizar la inversión
   * @param {string} updateData.status - Nuevo estado ('confirmed', 'rejected', 'canceled')
   * @param {string} [updateData.contractReference] - Referencia del contrato (para estado confirmed)
   * @param {string} [updateData.notes] - Notas adicionales sobre el cambio de estado
   * @returns {Promise<Object>} - La inversión actualizada
   */
  async updateInvestmentStatus(id, updateData) {
    if (!id || !updateData || !updateData.status) {
      throw new Error('ID de inversión y nuevo estado son requeridos');
    }

    const status = updateData.status;
    const contractReference = updateData.contractReference;
    const notes = updateData.notes;
    
    const validStatuses = ['pending', 'confirmed', 'rejected', 'canceled'];
    if (!validStatuses.includes(status)) {
      throw new Error('Estado de inversión no válido');
    }

    // Obtener la inversión actual
    const currentInvestment = await prisma.investment.findUnique({
      where: { id },
      include: { project: true }
    });

    if (!currentInvestment) {
      throw new Error('Inversión no encontrada');
    }

    // Crear instancias de dominio
    const investment = new Investment(currentInvestment);
    const project = new Project(currentInvestment.project);

    // Verificar que el cambio de estado es válido
    if (investment.status === status) {
      return currentInvestment; // No hay cambio
    }

    // Usar transacción para mantener consistencia
    return await prisma.$transaction(async (prismaClient) => {
      // Actualizar la inversión
      const updateDataDB = { status };
      
      // Añadir referencia de contrato si es necesario
      if (status === 'confirmed' && contractReference) {
        updateDataDB.contractReference = contractReference;
      }
      
      // Añadir notas si se proporcionan
      if (notes) {
        updateDataDB.notes = notes;
      }

      // Si se cancela una inversión que estaba confirmada, ajustar monto del proyecto
      if (status === 'canceled' && investment.status === 'confirmed') {
        await prismaClient.project.update({
          where: { id: currentInvestment.projectId },
          data: {
            currentAmount: {
              decrement: parseFloat(currentInvestment.amount)
            }
          }
        });
      }

      // Actualizar inversión en la base de datos
      const updatedInvestment = await prismaClient.investment.update({
        where: { id },
        data: updateDataDB,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          project: {
            select: {
              id: true,
              title: true,
              expectedRoi: true,
              status: true,
              createdBy: true
            }
          }
        }
      });

      // Crear notificación para el usuario
      await this.notificationService.createNotification({
        userId: updatedInvestment.userId,
        type: 'investment_status_change',
        content: `El estado de tu inversión en ${updatedInvestment.project.title} ha cambiado a ${status}`,
        relatedId: id
      });

      // Si hay cambio de estado, notificar también al gestor del proyecto
      if (updatedInvestment.project.createdBy) {
        await this.notificationService.createNotification({
          userId: updatedInvestment.project.createdBy,
          type: 'investment_status_change',
          content: `El estado de la inversión de ${updatedInvestment.user.firstName} ${updatedInvestment.user.lastName} en ${updatedInvestment.project.title} ha cambiado a ${status}`,
          relatedId: id
        });
      }

      return updatedInvestment;
    });
  }

  /**
   * Cancela una inversión pendiente. Solo el usuario que realizó la inversión puede cancelarla.
   * @param {string} id - ID de la inversión
   * @param {string} userId - ID del usuario que intenta cancelar
   * @returns {Promise<Object>} - La inversión cancelada
   */
  async cancelInvestment(id, userId) {
    if (!id || !userId) {
      throw new Error('ID de inversión y ID de usuario son requeridos');
    }

    // Verificar que la inversión existe y pertenece al usuario
    const investment = await prisma.investment.findFirst({
      where: { 
        id,
        userId
      }
    });

    if (!investment) {
      throw new Error('Inversión no encontrada o no pertenece al usuario');
    }

    // Verificar que la inversión está en estado pendiente
    if (investment.status !== 'pending') {
      throw new Error('Solo se pueden cancelar inversiones en estado pendiente');
    }

    // Actualizar el estado a cancelado
    return await this.updateInvestmentStatus(id, { status: 'canceled' });
  }
}

module.exports = InvestmentService; 