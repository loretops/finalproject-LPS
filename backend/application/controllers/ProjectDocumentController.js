/**
 * ProjectDocumentController.js
 * Controlador para manejar las operaciones de documentos de proyectos
 */

const ProjectDocumentService = require('../../domain/services/ProjectDocumentService');

/**
 * Controlador para operaciones de documentos de proyectos
 */
class ProjectDocumentController {
  constructor() {
    this.documentService = new ProjectDocumentService();
  }

  /**
   * Sube un nuevo documento para un proyecto
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async uploadProjectDocument(req, res) {
    try {
      const { projectId } = req.params;
      const file = req.file;
      
      if (!file) {
        return res.status(400).json({
          error: 'No se ha proporcionado ningún archivo'
        });
      }

      // Metadatos del documento
      const metadata = {
        documentType: req.body.documentType,
        accessLevel: req.body.accessLevel,
        securityLevel: req.body.securityLevel,
        optimize: req.body.optimize
      };

      const document = await this.documentService.uploadProjectDocument(
        projectId,
        file,
        metadata
      );

      res.status(201).json({
        message: 'Documento subido correctamente',
        document
      });
    } catch (error) {
      console.error('Error en uploadProjectDocument:', error);
      res.status(error.message.includes('no encontrado') ? 404 : 500).json({
        error: error.message || 'Error al subir documento'
      });
    }
  }

  /**
   * Obtiene todos los documentos de un proyecto
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async getProjectDocuments(req, res) {
    try {
      const { projectId } = req.params;
      const options = {
        documentType: req.query.documentType,
        accessLevel: req.query.accessLevel
      };

      const documents = await this.documentService.getProjectDocuments(projectId, options);

      res.status(200).json({
        documents
      });
    } catch (error) {
      console.error('Error en getProjectDocuments:', error);
      res.status(error.message.includes('no encontrado') ? 404 : 500).json({
        error: error.message || 'Error al obtener documentos'
      });
    }
  }

  /**
   * Obtiene un documento específico por ID
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async getDocumentById(req, res) {
    try {
      const { documentId } = req.params;
      const document = await this.documentService.getDocumentById(documentId);

      res.status(200).json({
        document
      });
    } catch (error) {
      console.error('Error en getDocumentById:', error);
      res.status(error.message.includes('no encontrado') ? 404 : 500).json({
        error: error.message || 'Error al obtener documento'
      });
    }
  }

  /**
   * Elimina un documento de proyecto
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async deleteDocument(req, res) {
    try {
      const { documentId } = req.params;
      await this.documentService.deleteDocument(documentId);

      res.status(200).json({
        message: 'Documento eliminado correctamente'
      });
    } catch (error) {
      console.error('Error en deleteDocument:', error);
      res.status(error.message.includes('no encontrado') ? 404 : 500).json({
        error: error.message || 'Error al eliminar documento'
      });
    }
  }

  /**
   * Obtiene una URL firmada para acceder a un documento
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async getSignedDocumentUrl(req, res) {
    try {
      const { documentId } = req.params;
      const userId = req.user.id; // Asumimos que hay autenticación implementada

      const result = await this.documentService.getSignedDocumentUrl(documentId, userId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error en getSignedDocumentUrl:', error);
      res.status(error.message.includes('no encontrado') ? 404 : 500).json({
        error: error.message || 'Error al generar URL'
      });
    }
  }
}

module.exports = new ProjectDocumentController(); 