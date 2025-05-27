/**
 * ProjectDocumentService.js
 * Servicio para gestionar documentos asociados a proyectos
 */

const { PrismaClient } = require('@prisma/client');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');
const fs = require('fs-extra');
const mime = require('mime-types');
const storageService = require('../../infrastructure/external/storage/StorageFactory');
const { 
  PROJECT_DOCUMENT_TYPES, 
  ACCESS_LEVELS, 
  SECURITY_LEVELS,
  ALLOWED_FILE_TYPES,
  IMAGE_OPTIMIZATION_OPTIONS 
} = require('../../utils/storageConfig');

class ProjectDocumentService {
  constructor() {
    this.prisma = new PrismaClient();
    this.storageService = storageService;
  }

  /**
   * Determina el tipo de almacenamiento y directorio según el tipo de archivo
   * @param {string} fileType - MIME type del archivo
   * @returns {Object} Configuración para almacenamiento
   */
  _getStorageConfigForFile(fileType) {
    const mimeType = fileType.toLowerCase();
    
    // Comprobar el tipo de archivo
    if (mimeType.startsWith('image/')) {
      return {
        type: ALLOWED_FILE_TYPES.IMAGE,
        directory: ALLOWED_FILE_TYPES.IMAGE.directory
      };
    } else if (mimeType.startsWith('video/')) {
      return {
        type: ALLOWED_FILE_TYPES.VIDEO,
        directory: ALLOWED_FILE_TYPES.VIDEO.directory
      };
    } else {
      return {
        type: ALLOWED_FILE_TYPES.DOCUMENT,
        directory: ALLOWED_FILE_TYPES.DOCUMENT.directory
      };
    }
  }

  /**
   * Sube un documento para un proyecto
   * @param {string} projectId - ID del proyecto
   * @param {Object} file - Archivo a subir (de multer)
   * @param {Object} metadata - Metadatos del documento
   * @returns {Promise<Object>} Documento creado
   */
  async uploadProjectDocument(projectId, file, metadata) {
    try {
      // Validar que el proyecto existe
      const project = await this.prisma.project.findUnique({
        where: { id: projectId }
      });

      if (!project) {
        throw new Error(`Proyecto con ID ${projectId} no encontrado`);
      }

      // Validar metadatos
      const documentType = metadata.documentType || PROJECT_DOCUMENT_TYPES.OTHER;
      const accessLevel = metadata.accessLevel || ACCESS_LEVELS.PARTNER;
      const securityLevel = metadata.securityLevel || SECURITY_LEVELS.VIEW_ONLY;

      // Determinar configuración de almacenamiento
      const storageConfig = this._getStorageConfigForFile(file.mimetype);
      let fileUrl;

      // Procesar el archivo según su tipo
      if (storageConfig.type === ALLOWED_FILE_TYPES.IMAGE) {
        // Para imágenes, aplicar optimización
        const optimizationOptions = metadata.optimize 
          ? IMAGE_OPTIMIZATION_OPTIONS[metadata.optimize.toUpperCase()] || IMAGE_OPTIMIZATION_OPTIONS.MEDIUM
          : IMAGE_OPTIMIZATION_OPTIONS.ORIGINAL;

        fileUrl = await this.storageService.storeImage(
          file, 
          `${storageConfig.directory}/${projectId}`,
          optimizationOptions
        );
      } else {
        // Para otros archivos, almacenar sin procesamiento
        fileUrl = await this.storageService.storeFile(
          file,
          `${storageConfig.directory}/${projectId}`
        );
      }

      // Crear registro en la base de datos
      const document = await this.prisma.projectDocument.create({
        data: {
          projectId,
          fileUrl,
          fileType: file.mimetype,
          documentType,
          accessLevel,
          securityLevel,
          title: metadata.title || file.originalname
        }
      });

      return document;
    } catch (error) {
      console.error('Error al subir documento:', error);
      throw new Error(`Error al subir documento: ${error.message}`);
    }
  }

  /**
   * Obtiene todos los documentos de un proyecto
   * @param {string} projectId - ID del proyecto
   * @param {Object} options - Opciones de filtrado
   * @returns {Promise<Array>} Lista de documentos
   */
  async getProjectDocuments(projectId, options = {}) {
    try {
      // Preparar filtros
      const filter = {
        projectId,
        ...(options.documentType && { documentType: options.documentType }),
        ...(options.accessLevel && { accessLevel: options.accessLevel })
      };

      // Buscar documentos
      const documents = await this.prisma.projectDocument.findMany({
        where: filter,
        orderBy: {
          createdAt: 'desc'
        }
      });

      return documents;
    } catch (error) {
      console.error('Error al obtener documentos:', error);
      throw new Error(`Error al obtener documentos: ${error.message}`);
    }
  }

  /**
   * Obtiene un documento específico
   * @param {string} documentId - ID del documento
   * @returns {Promise<Object>} Documento
   */
  async getDocumentById(documentId) {
    try {
      const document = await this.prisma.projectDocument.findUnique({
        where: { id: documentId },
        include: {
          project: true
        }
      });

      if (!document) {
        throw new Error(`Documento con ID ${documentId} no encontrado`);
      }

      return document;
    } catch (error) {
      console.error('Error al obtener documento:', error);
      throw new Error(`Error al obtener documento: ${error.message}`);
    }
  }

  /**
   * Elimina un documento de proyecto
   * @param {string} documentId - ID del documento
   * @returns {Promise<boolean>} True si se eliminó correctamente
   */
  async deleteDocument(documentId) {
    try {
      // Obtener documento
      const document = await this.prisma.projectDocument.findUnique({
        where: { id: documentId }
      });

      if (!document) {
        throw new Error(`Documento con ID ${documentId} no encontrado`);
      }

      // Eliminar archivo físico
      await this.storageService.deleteFile(document.fileUrl);

      // Eliminar vistas asociadas para evitar violación de clave foránea
      await this.prisma.documentView.deleteMany({ where: { documentId } });

      // Eliminar registro de base de datos
      await this.prisma.projectDocument.delete({
        where: { id: documentId }
      });

      return true;
    } catch (error) {
      console.error('Error al eliminar documento:', error);
      throw new Error(`Error al eliminar documento: ${error.message}`);
    }
  }

  /**
   * Registra una visualización de documento
   * @param {string} documentId - ID del documento
   * @param {string} userId - ID del usuario
   * @param {string} ipAddress - Dirección IP
   * @returns {Promise<Object>} Registro de visualización
   */
  async recordDocumentView(documentId, userId, ipAddress) {
    try {
      // Verificar que el documento existe
      const document = await this.prisma.projectDocument.findUnique({
        where: { id: documentId }
      });

      if (!document) {
        throw new Error(`Documento con ID ${documentId} no encontrado`);
      }

      // Registrar visualización
      const view = await this.prisma.documentView.create({
        data: {
          documentId,
          userId,
          ipAddress
        }
      });

      return view;
    } catch (error) {
      console.error('Error al registrar visualización:', error);
      throw new Error(`Error al registrar visualización: ${error.message}`);
    }
  }

  /**
   * Genera una URL firmada para acceso temporal a un documento
   * @param {string} documentId - ID del documento
   * @param {string} userId - ID del usuario que solicita acceso
   * @returns {Promise<Object>} Objeto con URL y metadatos
   */
  async getSignedDocumentUrl(documentId, userId) {
    try {
      // Obtener documento
      const document = await this.prisma.projectDocument.findUnique({
        where: { id: documentId },
        include: {
          project: true
        }
      });

      if (!document) {
        throw new Error(`Documento con ID ${documentId} no encontrado`);
      }

      // Validar acceso según nivel (esto sería más complejo en producción)
      // Por ahora asumimos que el usuario tiene acceso

      // Generar URL firmada (expiración de 1 hora)
      const signedUrl = await this.storageService.getSignedUrl(document.fileUrl, 3600);

      // Registrar visualización
      await this.recordDocumentView(documentId, userId, '127.0.0.1');

      return {
        document,
        url: signedUrl,
        expiresIn: 3600
      };
    } catch (error) {
      console.error('Error al generar URL firmada:', error);
      throw new Error(`Error al generar URL firmada: ${error.message}`);
    }
  }
}

module.exports = ProjectDocumentService; 