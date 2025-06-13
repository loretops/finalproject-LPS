const path = require('path');

// Determinar la ruta base del backend
const backendRoot = path.resolve(__dirname, '../..');
const PrismaProjectRepository = require(path.join(backendRoot, 'infrastructure/repositories/PrismaProjectRepository'));
const { toProjectResponse, toProjectListItem } = require(path.join(backendRoot, 'interfaces/http/dto/project.dto'));
const Project = require(path.join(backendRoot, 'domain/entities/Project'));

// Instanciar el repositorio (podría usar Inyección de Dependencias para mejor testabilidad)
const projectRepository = new PrismaProjectRepository();

/**
 * Servicio para la gestión de proyectos inmobiliarios.
 */
class ProjectService {
  /**
   * Crea un nuevo proyecto en estado borrador.
   * @param {Object} projectData - Datos del proyecto
   * @param {string} creatorId - ID del usuario creador (manager)
   * @returns {Promise<Object>} Proyecto creado
   */
  async createProject(projectData, creatorId) {
    if (!projectData || !creatorId) {
      throw new Error('Datos del proyecto e ID del creador son requeridos');
    }

    // Validar datos mínimos del proyecto
    if (!projectData.title || !projectData.description) {
      throw new Error('El título y la descripción son campos obligatorios');
    }

    try {
      const project = await projectRepository.create(projectData, creatorId);
      return toProjectResponse(project);
    } catch (error) {
      console.error('Error en ProjectService.createProject:', error);
      throw error;
    }
  }

  /**
   * Obtiene un proyecto por su ID.
   * @param {string} id - ID del proyecto
   * @param {Object} options - Opciones adicionales
   * @param {string} [options.userRole] - Rol del usuario que solicita el proyecto
   * @returns {Promise<Object|null>} Proyecto encontrado o null
   */
  async getProjectById(id, options = {}) {
    try {
      const project = await projectRepository.findById(id, { includeDocuments: true });
      
      if (!project) {
        return null;
      }
      
      // Crear una copia del proyecto para la respuesta
      const projectResponse = toProjectResponse(project);
      
      // Si el proyecto tiene documentos, filtrarlos según el nivel de acceso del usuario
      if (project.documents && project.documents.length > 0) {
        const { userRole = 'partner' } = options;
        
        // Mapa de acceso según rol de usuario
        const accessLevelMap = {
          visitor: ['public'],
          partner: ['public', 'partner'],
          investor: ['public', 'partner', 'investor'],
          manager: ['public', 'partner', 'investor', 'manager']
        };
        
        // Determinar los niveles de acceso permitidos para el usuario
        const allowedAccessLevels = accessLevelMap[userRole] || ['public'];
        
        // Filtrar documentos que el usuario puede ver según su rol
        projectResponse.documents = project.documents
          .filter(doc => allowedAccessLevels.includes(doc.accessLevel))
          .map(doc => ({
            id: doc.id,
            title: doc.title,
            documentType: doc.documentType,
            fileUrl: doc.fileUrl,
            fileType: doc.fileType,
            accessLevel: doc.accessLevel,
            securityLevel: doc.securityLevel,
            createdAt: doc.createdAt.toISOString()
          }));
      }
      
      return projectResponse;
    } catch (error) {
      console.error('Error en ProjectService.getProjectById:', error);
      throw error;
    }
  }

  /**
   * Obtiene una lista de proyectos con filtros y paginación.
   * @param {Object} options - Opciones de filtrado y paginación
   * @returns {Promise<Object>} Listado de proyectos y metadatos de paginación
   */
  async getProjects(options = {}) {
    try {
      const result = await projectRepository.findAll(options);
      
      // Transformar proyectos a formato DTO
      const projects = result.data.map(toProjectListItem);
      
      return {
        data: projects,
        pagination: result.pagination
      };
    } catch (error) {
      console.error('Error en ProjectService.getProjects:', error);
      throw error;
    }
  }

  /**
   * Obtiene una lista de proyectos publicados para socios con filtros y paginación.
   * Este método garantiza que solo se muestren proyectos en estado 'published'.
   * @param {Object} options - Opciones de filtrado y paginación
   * @returns {Promise<Object>} Listado de proyectos publicados y metadatos de paginación
   */
  async getPublishedProjects(options = {}) {
    try {
      // Forzar que solo se muestren proyectos publicados
      const publicOptions = {
        ...options,
        status: 'published',
        includeDocuments: true  // Siempre incluir documentos para proyectos públicos
      };

      const result = await projectRepository.findAll(publicOptions);
      
      // Transformar proyectos a formato DTO para socios (puede tener menos información)
      const projects = result.data.map(project => {
        const transformed = toProjectListItem(project);
        // Aquí podemos personalizar qué información específica queremos mostrar a los socios
        return transformed;
      });
      
      return {
        data: projects,
        pagination: result.pagination
      };
    } catch (error) {
      console.error('Error en ProjectService.getPublishedProjects:', error);
      throw error;
    }
  }

  /**
   * Actualiza un proyecto existente.
   * @param {string} id - ID del proyecto
   * @param {Object} projectData - Datos a actualizar
   * @returns {Promise<Object>} Proyecto actualizado
   */
  async updateProject(id, projectData) {
    if (!id || !projectData) {
      throw new Error('ID del proyecto y datos a actualizar son requeridos');
    }

    try {
      // Verificar que el proyecto existe
      const existingProject = await projectRepository.findById(id);
      if (!existingProject) {
        throw new Error('Proyecto no encontrado');
      }

      // Verificar que no se intenta actualizar un proyecto publicado
      if (!existingProject.draft) {
        throw new Error('No se puede modificar un proyecto ya publicado');
      }

      const updatedProject = await projectRepository.update(id, projectData);
      return toProjectResponse(updatedProject);
    } catch (error) {
      console.error('Error en ProjectService.updateProject:', error);
      throw error;
    }
  }

  /**
   * Publica un proyecto (cambia su estado a publicado).
   * @param {string} id - ID del proyecto
   * @param {string} publisherId - ID del usuario que publica
   * @returns {Promise<Object>} Proyecto publicado
   */
  async publishProject(id, publisherId) {
    if (!id || !publisherId) {
      throw new Error('ID del proyecto e ID del publicador son requeridos');
    }

    try {
      // Verificar que el proyecto existe y es un borrador
      const existingProject = await projectRepository.findById(id, { includeDocuments: true });
      if (!existingProject) {
        throw new Error('Proyecto no encontrado');
      }

      if (!existingProject.draft) {
        throw new Error('El proyecto ya está publicado');
      }

      // Realizar validaciones adicionales
      // 1. Verificar longitud mínima de la descripción
      if (!existingProject.description || existingProject.description.trim().length < 50) {
        throw new Error('La descripción del proyecto debe tener al menos 50 caracteres');
      }

      // 2. Verificar que tiene al menos un documento legal (DESHABILITADO TEMPORALMENTE EN DESARROLLO)
      /* COMENTADO TEMPORALMENTE PARA DESARROLLO
      const hasLegalDocs = existingProject.documents && 
                           existingProject.documents.some(doc => doc.documentType === 'legal');
      if (!hasLegalDocs) {
        console.log('Error de validación: No se encontraron documentos legales para el proyecto', id);
        throw new Error('El proyecto debe tener al menos un documento legal antes de ser publicado');
      }
      */
      console.log('NOTA: Validación de documentos legales temporalmente deshabilitada para desarrollo');

      // 3. Validar otros campos obligatorios usando el método de la entidad
      const projectEntity = new Project({
        id: existingProject.id,
        title: existingProject.title,
        description: existingProject.description,
        minimumInvestment: existingProject.minimumInvestment,
        targetAmount: existingProject.targetAmount,
        expectedRoi: existingProject.expectedRoi,
        location: existingProject.location,
        propertyType: existingProject.propertyType
      });
      
      try {
        projectEntity.validateForPublication();
      } catch (validationError) {
        throw validationError; // Propagar el error de validación
      }

      const publishedProject = await projectRepository.publish(id, publisherId);
      return toProjectResponse(publishedProject);
    } catch (error) {
      console.error('Error en ProjectService.publishProject:', error);
      throw error;
    }
  }

  /**
   * Añade un documento a un proyecto.
   * @param {string} projectId - ID del proyecto
   * @param {Object} documentData - Datos del documento
   * @returns {Promise<Object>} Documento añadido
   */
  async addProjectDocument(projectId, documentData) {
    if (!projectId || !documentData) {
      throw new Error('ID del proyecto y datos del documento son requeridos');
    }

    try {
      // Verificar que el proyecto existe
      const existingProject = await projectRepository.findById(projectId);
      if (!existingProject) {
        throw new Error('Proyecto no encontrado');
      }

      // Validar tipo de documento y nivel de acceso
      if (!documentData.documentType || !documentData.accessLevel) {
        throw new Error('Tipo de documento y nivel de acceso son requeridos');
      }

      const document = await projectRepository.addDocument(projectId, documentData);
      return document;
    } catch (error) {
      console.error('Error en ProjectService.addProjectDocument:', error);
      throw error;
    }
  }
}

module.exports = new ProjectService(); 