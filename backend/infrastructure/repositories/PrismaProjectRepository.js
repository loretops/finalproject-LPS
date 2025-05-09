const { PrismaClient } = require('@prisma/client');
const ProjectRepository = require('../../domain/repositories/ProjectRepository');

const prisma = new PrismaClient();

/**
 * Implementación de ProjectRepository usando Prisma ORM
 */
class PrismaProjectRepository extends ProjectRepository {
  /**
   * Encuentra un proyecto por su ID.
   * @param {string} id - ID del proyecto
   * @returns {Promise<Object|null>} Proyecto encontrado o null
   */
  async findById(id) {
    try {
      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          creator: true,
          publisher: true,
          documents: true
        }
      });
      
      return project;
    } catch (error) {
      console.error('Error en PrismaProjectRepository.findById:', error);
      throw error;
    }
  }

  /**
   * Obtiene una lista de proyectos con filtros y paginación.
   * @param {Object} options - Opciones de filtrado y paginación
   * @returns {Promise<Object>} Listado de proyectos y metadatos de paginación
   */
  async findAll(options = {}) {
    try {
      const {
        status,
        propertyType,
        minRoi,
        location,
        page = 1,
        limit = 10
      } = options;

      // Construir filtros
      const where = {};
      
      if (status) {
        where.status = status;
      }
      
      if (propertyType) {
        where.propertyType = propertyType;
      }
      
      if (minRoi) {
        where.expectedRoi = {
          gte: parseFloat(minRoi)
        };
      }
      
      if (location) {
        where.location = {
          contains: location,
          mode: 'insensitive'
        };
      }

      // Calcular paginación
      const skip = (page - 1) * limit;
      
      // Contar total de proyectos
      const total = await prisma.project.count({ where });
      
      // Obtener proyectos paginados
      const projects = await prisma.project.findMany({
        where,
        include: {
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      // Calcular total de páginas
      const totalPages = Math.ceil(total / limit);
      
      return {
        data: projects,
        pagination: {
          total,
          page,
          limit,
          totalPages
        }
      };
    } catch (error) {
      console.error('Error en PrismaProjectRepository.findAll:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo proyecto.
   * @param {Object} data - Datos del proyecto
   * @param {string} createdBy - ID del usuario creador
   * @returns {Promise<Object>} Proyecto creado
   */
  async create(data, createdBy) {
    try {
      // Convertir valores decimales a string para Prisma Decimal
      const project = await prisma.project.create({
        data: {
          title: data.title,
          description: data.description,
          minimumInvestment: data.minimumInvestment.toString(),
          targetAmount: data.targetAmount.toString(),
          currentAmount: "0",
          expectedRoi: data.expectedRoi.toString(),
          location: data.location || null,
          propertyType: data.propertyType || null,
          status: 'draft',
          draft: true,
          creator: {
            connect: { id: createdBy }
          }
        },
        include: {
          creator: true
        }
      });
      
      return project;
    } catch (error) {
      console.error('Error en PrismaProjectRepository.create:', error);
      throw error;
    }
  }

  /**
   * Actualiza un proyecto existente.
   * @param {string} id - ID del proyecto
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Proyecto actualizado
   */
  async update(id, data) {
    try {
      const project = await prisma.project.update({
        where: { id },
        data,
        include: {
          creator: true,
          publisher: true
        }
      });
      
      return project;
    } catch (error) {
      console.error('Error en PrismaProjectRepository.update:', error);
      throw error;
    }
  }

  /**
   * Publica un proyecto (cambia estado a 'published').
   * @param {string} id - ID del proyecto
   * @param {string} publisherId - ID del usuario que publica
   * @returns {Promise<Object>} Proyecto publicado
   */
  async publish(id, publisherId) {
    try {
      const now = new Date();
      
      const project = await prisma.project.update({
        where: { id },
        data: {
          status: 'published',
          draft: false,
          publishedAt: now,
          // No incluir publishedBy directamente
          // publishedBy: publisherId,
          // Relaciones
          publisher: {
            connect: { id: publisherId }
          }
        },
        include: {
          creator: true,
          publisher: true
        }
      });
      
      return project;
    } catch (error) {
      console.error('Error en PrismaProjectRepository.publish:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los documentos de un proyecto.
   * @param {string} projectId - ID del proyecto
   * @param {string} [documentType] - Tipo de documento para filtrar
   * @returns {Promise<Array>} Lista de documentos
   */
  async getDocuments(projectId, documentType) {
    try {
      const where = { projectId };
      
      if (documentType) {
        where.documentType = documentType;
      }
      
      const documents = await prisma.projectDocument.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      return documents;
    } catch (error) {
      console.error('Error en PrismaProjectRepository.getDocuments:', error);
      throw error;
    }
  }

  /**
   * Añade un documento a un proyecto.
   * @param {string} projectId - ID del proyecto
   * @param {Object} documentData - Datos del documento
   * @returns {Promise<Object>} Documento creado
   */
  async addDocument(projectId, documentData) {
    try {
      const document = await prisma.projectDocument.create({
        data: {
          ...documentData,
          projectId,
          // Relaciones
          project: {
            connect: { id: projectId }
          }
        }
      });
      
      return document;
    } catch (error) {
      console.error('Error en PrismaProjectRepository.addDocument:', error);
      throw error;
    }
  }
}

module.exports = PrismaProjectRepository; 