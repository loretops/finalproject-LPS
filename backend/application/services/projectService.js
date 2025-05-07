const PrismaProjectRepository = require('../../infrastructure/repositories/PrismaProjectRepository');
const { toProjectResponse, toProjectListItem } = require('../../interfaces/http/dto/project.dto');

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
   * @returns {Promise<Object|null>} Proyecto encontrado o null
   */
  async getProjectById(id) {
    try {
      const project = await projectRepository.findById(id);
      return project ? toProjectResponse(project) : null;
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
      const existingProject = await projectRepository.findById(id);
      if (!existingProject) {
        throw new Error('Proyecto no encontrado');
      }

      if (!existingProject.draft) {
        throw new Error('El proyecto ya está publicado');
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