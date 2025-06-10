const { PrismaClient } = require('@prisma/client');
const ProjectRepository = require('../../domain/repositories/ProjectRepository');
const prisma = require('../../utils/prismaClient');

/**
 * Implementación de ProjectRepository usando Prisma ORM
 */
class PrismaProjectRepository extends ProjectRepository {
  /**
   * Encuentra un proyecto por su ID.
   * @param {string} id - ID del proyecto
   * @param {Object} options - Opciones adicionales
   * @param {boolean} [options.includeDocuments=false] - Si se deben incluir los documentos asociados
   * @returns {Promise<Object|null>} Proyecto encontrado o null
   */
  async findById(id, options = {}) {
    try {
      // Configurar opciones por defecto
      const { includeDocuments = false } = options;

      // Construir objeto de incluir en la consulta
      const include = {
        creator: true
      };

      // Incluir documentos si se solicita
      if (includeDocuments) {
        include.documents = true;
      }

      // Realizar consulta a la base de datos
      const project = await prisma.project.findUnique({
        where: { id },
        include
      });
      
      if (!project) {
        return null;
      }
      
      // Obtener todas las inversiones confirmadas para este proyecto
      const investments = await prisma.investment.findMany({
        where: {
          projectId: id,
          status: {
            in: ['confirmed', 'completed']
          }
        },
        select: {
          amount: true
        }
      });
      
      // Calcular la suma total
      const totalInvested = investments.reduce(
        (total, inv) => total + parseFloat(inv.amount), 
        0
      ).toString();
      
      // Actualizar el currentAmount con el valor calculado
      return {
        ...project,
        currentAmount: totalInvested || "0"
      };
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
        limit = 10,
        sortField = 'createdAt',
        sortDirection = 'desc',
        includeDocuments = false
      } = options;

      // Construir filtros
      const where = {};
      
      // Solo aplicar filtro de status si es diferente de "all"
      if (status && status !== 'all') {
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

      console.log('Filtros aplicados:', where);

      // Calcular paginación
      const skip = (page - 1) * limit;
      
      // Contar total de proyectos
      const total = await prisma.project.count({ where });
      
      // Mapa de campos para ordenación (convertir nombres de campos del frontend a nombres en la BD)
      const fieldMapping = {
        'title': 'title',
        'minimum_investment': 'minimumInvestment',
        'target_amount': 'targetAmount',
        'expected_roi': 'expectedRoi',
        'status': 'status',
        'created_at': 'createdAt'
      };
      
      // Preparar la ordenación
      const orderBy = {};
      const mappedField = fieldMapping[sortField] || 'createdAt';
      orderBy[mappedField] = sortDirection?.toLowerCase() || 'desc';
      
      console.log('Ordenando por:', orderBy);
      
      // Configurar inclusiones
      const include = {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      };
      
      // Incluir documentos si se solicita
      if (includeDocuments) {
        include.documents = {
          where: {
            documentType: 'image',
            accessLevel: 'public'
          }
        };
      }
      
      // Obtener proyectos paginados
      const projects = await prisma.project.findMany({
        where,
        include: include,
        skip,
        take: limit,
        orderBy
      });
      
      // Obtener todas las inversiones confirmadas
      const investments = await prisma.investment.findMany({
        where: {
          projectId: {
            in: projects.map(p => p.id)
          },
          status: {
            in: ['confirmed', 'completed']
          }
        },
        select: {
          projectId: true,
          amount: true
        }
      });
      
      // Agrupar inversiones por projectId
      const investmentsByProject = {};
      investments.forEach(inv => {
        if (!investmentsByProject[inv.projectId]) {
          investmentsByProject[inv.projectId] = 0;
        }
        investmentsByProject[inv.projectId] += parseFloat(inv.amount);
      });
      
      // Añadir el monto invertido a cada proyecto
      const projectsWithInvestments = projects.map(project => ({
        ...project,
        currentAmount: investmentsByProject[project.id]?.toString() || "0"
      }));
      
      // Calcular total de páginas
      const totalPages = Math.ceil(total / limit);
      
      return {
        data: projectsWithInvestments,
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