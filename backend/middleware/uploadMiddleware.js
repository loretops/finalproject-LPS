/**
 * uploadMiddleware.js
 * Middleware para procesar la subida de archivos utilizando Multer
 */

const multer = require('multer');
const { ALLOWED_FILE_TYPES } = require('../utils/storageConfig');

/**
 * Verifica el tipo de archivo permitido
 * @param {Object} fileType - Configuración del tipo de archivo permitido
 * @returns {Function} Función de filtro para multer
 */
const fileFilter = (fileType) => {
  return (req, file, cb) => {
    // Si no hay restricciones de tipo, aceptar cualquier archivo
    if (!fileType || !fileType.mimeTypes) {
      return cb(null, true);
    }

    // Verificar si el MIME type está permitido
    if (fileType.mimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    // Rechazar el archivo
    cb(new Error(`Tipo de archivo no permitido. Se esperaba: ${fileType.extensions.join(', ')}`));
  };
};

/**
 * Crea el middleware Multer para un tipo específico de archivo
 * @param {Object} fileType - Configuración del tipo de archivo
 * @param {string} fieldName - Nombre del campo en el formulario
 * @param {boolean} multiple - Si permite múltiples archivos
 * @returns {Function} Middleware de multer configurado
 */
const createUploadMiddleware = (fileType = ALLOWED_FILE_TYPES.ANY, fieldName = 'file', multiple = false) => {
  // Configurar opciones de multer
  const options = {
    storage: multer.memoryStorage(), // Almacenar como buffer en memoria
    limits: {
      fileSize: fileType.maxSize || 5 * 1024 * 1024 // 5MB por defecto
    },
    fileFilter: fileFilter(fileType)
  };

  // Crear y retornar middleware
  const upload = multer(options);
  
  return multiple 
    ? upload.array(fieldName, 10) // Limitar a 10 archivos si es múltiple
    : upload.single(fieldName);
};

// Middlewares predefinidos para tipos comunes
const uploadDocument = createUploadMiddleware(ALLOWED_FILE_TYPES.DOCUMENT, 'document');
const uploadImage = createUploadMiddleware(ALLOWED_FILE_TYPES.IMAGE, 'image');
const uploadVideo = createUploadMiddleware(ALLOWED_FILE_TYPES.VIDEO, 'video');
const uploadAny = createUploadMiddleware(ALLOWED_FILE_TYPES.ANY, 'file');

// Middleware para múltiples archivos
const uploadMultipleDocuments = createUploadMiddleware(ALLOWED_FILE_TYPES.DOCUMENT, 'documents', true);
const uploadMultipleImages = createUploadMiddleware(ALLOWED_FILE_TYPES.IMAGE, 'images', true);

/**
 * Middleware para manejar errores de Multer
 */
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Errores específicos de Multer
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'El archivo excede el tamaño máximo permitido'
      });
    }
    
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        error: 'Se ha excedido el número máximo de archivos'
      });
    }
    
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        error: `Campo de archivo inesperado: ${err.field}`
      });
    }
  }
  
  if (err.message && err.message.includes('Tipo de archivo no permitido')) {
    return res.status(400).json({
      error: err.message
    });
  }
  
  // Cualquier otro error
  next(err);
};

module.exports = {
  createUploadMiddleware,
  uploadDocument,
  uploadImage,
  uploadVideo,
  uploadAny,
  uploadMultipleDocuments,
  uploadMultipleImages,
  handleUploadErrors
}; 