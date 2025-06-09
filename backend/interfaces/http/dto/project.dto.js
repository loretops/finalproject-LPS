/**
 * Data Transfer Objects (DTOs) para proyectos
 * Define la estructura de datos para intercambio entre el backend y frontend
 */

/**
 * DTO para crear un nuevo proyecto (entrada)
 * @typedef {Object} CreateProjectDto
 * @property {string} title - Título del proyecto
 * @property {string} description - Descripción detallada
 * @property {number} minimumInvestment - Inversión mínima aceptada
 * @property {number} targetAmount - Monto total a captar
 * @property {number} expectedRoi - Retorno estimado (%)
 * @property {string} [location] - Ubicación del proyecto (opcional)
 * @property {string} [propertyType] - Tipo de propiedad (opcional)
 */

/**
 * DTO para respuesta de proyecto (salida)
 * @typedef {Object} ProjectResponseDto
 * @property {string} id - Identificador único
 * @property {string} title - Título del proyecto
 * @property {string} description - Descripción detallada
 * @property {string} status - Estado (draft, published, closed, funded)
 * @property {number} minimumInvestment - Inversión mínima aceptada
 * @property {number} targetAmount - Monto total a captar
 * @property {number} currentAmount - Monto ya invertido
 * @property {number} expectedRoi - Retorno estimado (%)
 * @property {string} [location] - Ubicación del proyecto
 * @property {string} [propertyType] - Tipo de propiedad
 * @property {boolean} draft - Indica si es borrador
 * @property {string} [publishedAt] - Fecha de publicación (ISO string)
 * @property {string} createdAt - Fecha de creación (ISO string)
 * @property {Object} creator - Información básica del creador
 * @property {string} creator.id - ID del creador
 * @property {string} creator.name - Nombre del creador
 * @property {Array<DocumentDto>} [documents] - Documentos asociados al proyecto (filtrados por acceso)
 */

/**
 * DTO para listado de proyectos (salida)
 * @typedef {Object} ProjectListDto
 * @property {Array<ProjectListItemDto>} data - Array de proyectos
 * @property {Object} pagination - Información de paginación
 * @property {number} pagination.total - Total de proyectos
 * @property {number} pagination.page - Página actual
 * @property {number} pagination.limit - Límite por página
 * @property {number} pagination.totalPages - Total de páginas
 */

/**
 * DTO para item en listado de proyectos (salida)
 * @typedef {Object} ProjectListItemDto
 * @property {string} id - Identificador único
 * @property {string} title - Título del proyecto
 * @property {string} status - Estado (draft, published, closed, funded)
 * @property {number} minimumInvestment - Inversión mínima aceptada
 * @property {number} targetAmount - Monto total a captar
 * @property {number} currentAmount - Monto ya invertido
 * @property {number} expectedRoi - Retorno estimado (%)
 * @property {string} [location] - Ubicación del proyecto
 * @property {string} [propertyType] - Tipo de propiedad
 * @property {string} createdAt - Fecha de creación (ISO string)
 * @property {string} [publishedAt] - Fecha de publicación (ISO string)
 */

/**
 * DTO para actualizar un proyecto (entrada)
 * @typedef {Object} UpdateProjectDto
 * @property {string} [title] - Título actualizado
 * @property {string} [description] - Descripción actualizada
 * @property {number} [minimumInvestment] - Nueva inversión mínima
 * @property {number} [targetAmount] - Nuevo monto objetivo
 * @property {number} [expectedRoi] - Nuevo retorno estimado
 * @property {string} [location] - Nueva ubicación
 * @property {string} [propertyType] - Nuevo tipo de propiedad
 */

/**
 * DTO para publicar un proyecto (salida)
 * @typedef {Object} PublishProjectDto
 * @property {string} id - ID del proyecto
 * @property {string} publishedAt - Fecha de publicación
 * @property {string} status - Nuevo estado (published)
 * @property {string} publishedBy - ID del usuario que publicó
 */

/**
 * DTO para subir documento (entrada)
 * @typedef {Object} UploadDocumentDto
 * @property {string} documentType - Tipo de documento (legal, economic, technical, image, video)
 * @property {string} accessLevel - Nivel de acceso (public, partner, investor)
 * @property {string} [securityLevel] - Nivel de seguridad (downloadable, view_only, watermarked)
 * @property {File} file - Archivo a subir
 */

/**
 * DTO para documento de proyecto (salida)
 * @typedef {Object} DocumentDto
 * @property {string} id - Identificador único
 * @property {string} name - Nombre del documento
 * @property {string} documentType - Tipo de documento (legal, economic, technical, image, video)
 * @property {string} accessLevel - Nivel de acceso (public, partner, investor)
 * @property {string} securityLevel - Nivel de seguridad (downloadable, view_only, watermarked)
 * @property {string} url - URL del documento
 * @property {string} createdAt - Fecha de creación (ISO string)
 */

/**
 * Función para convertir un modelo Project de Prisma a ProjectResponseDto
 * @param {Object} projectModel - Modelo Project de Prisma
 * @returns {ProjectResponseDto} Objeto DTO para respuesta
 */
function toProjectResponse(projectModel) {
  // Preparar una lista de documentos formateados si están presentes
  const documents = projectModel.documents ? projectModel.documents.map(doc => ({
    id: doc.id,
    documentType: doc.documentType,
    fileUrl: doc.fileUrl,
    fileType: doc.fileType,
    accessLevel: doc.accessLevel,
    securityLevel: doc.securityLevel,
    title: doc.title,
    createdAt: doc.createdAt.toISOString()
  })) : [];
  
  return {
    id: projectModel.id,
    title: projectModel.title,
    description: projectModel.description,
    status: projectModel.status,
    minimumInvestment: parseFloat(projectModel.minimumInvestment),
    targetAmount: parseFloat(projectModel.targetAmount),
    currentAmount: parseFloat(projectModel.currentAmount),
    expectedRoi: parseFloat(projectModel.expectedRoi),
    location: projectModel.location,
    propertyType: projectModel.propertyType,
    draft: projectModel.draft,
    publishedAt: projectModel.publishedAt ? projectModel.publishedAt.toISOString() : null,
    createdAt: projectModel.createdAt.toISOString(),
    creator: projectModel.creator ? {
      id: projectModel.creator.id,
      name: `${projectModel.creator.firstName} ${projectModel.creator.lastName}`
    } : null,
    documents: documents
  };
}

/**
 * Función para convertir un modelo Project de Prisma a ProjectListItemDto
 * @param {Object} projectModel - Modelo Project de Prisma
 * @returns {ProjectListItemDto} Objeto DTO para listado
 */
function toProjectListItem(projectModel) {
  // Preparar una lista de documentos formateados si están presentes
  const documents = projectModel.documents ? projectModel.documents.map(doc => ({
    id: doc.id,
    documentType: doc.documentType,
    fileUrl: doc.fileUrl,
    fileType: doc.fileType,
    accessLevel: doc.accessLevel,
    securityLevel: doc.securityLevel,
    title: doc.title,
    createdAt: doc.createdAt.toISOString()
  })) : [];
  
  return {
    id: projectModel.id,
    title: projectModel.title,
    status: projectModel.status,
    minimumInvestment: parseFloat(projectModel.minimumInvestment),
    targetAmount: parseFloat(projectModel.targetAmount),
    currentAmount: parseFloat(projectModel.currentAmount),
    expectedRoi: parseFloat(projectModel.expectedRoi),
    location: projectModel.location,
    propertyType: projectModel.propertyType,
    createdAt: projectModel.createdAt.toISOString(),
    publishedAt: projectModel.publishedAt ? projectModel.publishedAt.toISOString() : null,
    documents: documents
  };
}

module.exports = {
  toProjectResponse,
  toProjectListItem
}; 