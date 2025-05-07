/**
 * projectDocumentRoutes.js
 * Rutas para operaciones con documentos de proyectos
 */

const express = require('express');
const router = express.Router();
const ProjectDocumentController = require('../controllers/ProjectDocumentController');
const { uploadDocument, uploadImage, uploadVideo, handleUploadErrors } = require('../../middleware/uploadMiddleware');
const jwtAuthMiddleware = require('../../middleware/jwtAuthMiddleware');
const roleAuthMiddleware = require('../../middleware/roleAuthMiddleware');

// Todas las rutas requieren autenticación
router.use(jwtAuthMiddleware);

// Ruta para subir un documento a un proyecto (usando middleware adecuado según tipo)
router.post(
  '/projects/:projectId/documents', 
  roleAuthMiddleware(['manager', 'admin']),
  uploadDocument,
  handleUploadErrors,
  ProjectDocumentController.uploadProjectDocument.bind(ProjectDocumentController)
);

// Ruta para subir una imagen a un proyecto
router.post(
  '/projects/:projectId/images', 
  roleAuthMiddleware(['manager', 'admin']),
  uploadImage,
  handleUploadErrors,
  ProjectDocumentController.uploadProjectDocument.bind(ProjectDocumentController)
);

// Ruta para subir un video a un proyecto
router.post(
  '/projects/:projectId/videos', 
  roleAuthMiddleware(['manager', 'admin']),
  uploadVideo,
  handleUploadErrors,
  ProjectDocumentController.uploadProjectDocument.bind(ProjectDocumentController)
);

// Listar documentos de un proyecto
router.get(
  '/projects/:projectId/documents',
  ProjectDocumentController.getProjectDocuments.bind(ProjectDocumentController)
);

// Obtener un documento específico
router.get(
  '/documents/:documentId',
  ProjectDocumentController.getDocumentById.bind(ProjectDocumentController)
);

// Eliminar un documento
router.delete(
  '/documents/:documentId',
  roleAuthMiddleware(['manager', 'admin']),
  ProjectDocumentController.deleteDocument.bind(ProjectDocumentController)
);

// Obtener URL firmada para acceso temporal a un documento
router.get(
  '/documents/:documentId/access',
  ProjectDocumentController.getSignedDocumentUrl.bind(ProjectDocumentController)
);

module.exports = router; 