/**
 * Interfaz abstracta para el repositorio de proyectos
 * Define operaciones estándar para acceder a los datos de los proyectos
 */
class ProjectRepository {
  /**
   * Encuentra un proyecto por su ID.
   * @param {string} id - ID del proyecto
   * @returns {Promise<Object|null>} Proyecto encontrado o null
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene una lista de proyectos con filtros y paginación.
   * @param {Object} options - Opciones de filtrado y paginación
   * @param {string} [options.status] - Filtrar por estado
   * @param {string} [options.propertyType] - Filtrar por tipo de propiedad
   * @param {number} [options.minRoi] - Filtrar por ROI mínimo
   * @param {string} [options.location] - Filtrar por ubicación
   * @param {number} options.page - Número de página
   * @param {number} options.limit - Elementos por página
   * @returns {Promise<Object>} Listado de proyectos y metadatos de paginación
   */
  async findAll(options) {
    throw new Error('Method not implemented');
  }

  /**
   * Crea un nuevo proyecto.
   * @param {Object} data - Datos del proyecto
   * @param {string} createdBy - ID del usuario creador
   * @returns {Promise<Object>} Proyecto creado
   */
  async create(data, createdBy) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza un proyecto existente.
   * @param {string} id - ID del proyecto
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Proyecto actualizado
   */
  async update(id, data) {
    throw new Error('Method not implemented');
  }

  /**
   * Publica un proyecto (cambia estado a 'published').
   * @param {string} id - ID del proyecto
   * @param {string} publishedBy - ID del usuario que publica
   * @returns {Promise<Object>} Proyecto publicado
   */
  async publish(id, publishedBy) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene todos los documentos de un proyecto.
   * @param {string} projectId - ID del proyecto
   * @param {string} [documentType] - Tipo de documento para filtrar
   * @returns {Promise<Array>} Lista de documentos
   */
  async getDocuments(projectId, documentType) {
    throw new Error('Method not implemented');
  }

  /**
   * Añade un documento a un proyecto.
   * @param {string} projectId - ID del proyecto
   * @param {Object} documentData - Datos del documento
   * @returns {Promise<Object>} Documento creado
   */
  async addDocument(projectId, documentData) {
    throw new Error('Method not implemented');
  }
}

module.exports = ProjectRepository; 