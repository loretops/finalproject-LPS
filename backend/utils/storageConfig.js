/**
 * storageConfig.js
 * Configuración para el servicio de almacenamiento de archivos
 */

// Tipos de archivos permitidos
const ALLOWED_FILE_TYPES = {
  // Documentos
  DOCUMENT: {
    mimeTypes: [
      'application/pdf', 
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/rtf'
    ],
    extensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.rtf'],
    maxSize: 10 * 1024 * 1024, // 10MB
    directory: 'documents'
  },
  
  // Imágenes
  IMAGE: {
    mimeTypes: [
      'image/jpeg', 
      'image/png', 
      'image/gif', 
      'image/webp', 
      'image/svg+xml'
    ],
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    maxSize: 5 * 1024 * 1024, // 5MB
    directory: 'images'
  },
  
  // Videos (miniatura y archivo)
  VIDEO: {
    mimeTypes: [
      'video/mp4', 
      'video/mpeg', 
      'video/quicktime', 
      'video/x-msvideo',
      'video/x-ms-wmv'
    ],
    extensions: ['.mp4', '.mpeg', '.mov', '.avi', '.wmv'],
    maxSize: 100 * 1024 * 1024, // 100MB
    directory: 'videos'
  },
  
  // Cualquier tipo (para pruebas)
  ANY: {
    mimeTypes: null,
    extensions: null,
    maxSize: 20 * 1024 * 1024, // 20MB
    directory: 'temp'
  }
};

// Tipos de documentos de proyecto
const PROJECT_DOCUMENT_TYPES = {
  LEGAL: 'legal',
  FINANCIAL: 'financial',
  TECHNICAL: 'technical',
  MARKETING: 'marketing',
  IMAGE: 'image',
  VIDEO: 'video',
  OTHER: 'other'
};

// Niveles de acceso a documentos
const ACCESS_LEVELS = {
  PUBLIC: 'public',     // Visible para todos
  PARTNER: 'partner',   // Solo para socios registrados
  INVESTOR: 'investor', // Solo para inversores en el proyecto
  ADMIN: 'admin',       // Solo administradores y gestores
};

// Niveles de seguridad de documentos
const SECURITY_LEVELS = {
  VIEW_ONLY: 'view_only',       // Solo ver en navegador
  DOWNLOAD: 'download',          // Permitir descarga
  PRINT: 'print',               // Permitir impresión
  FULL_ACCESS: 'full_access',   // Acceso completo
};

// Opciones para optimización de imágenes
const IMAGE_OPTIMIZATION_OPTIONS = {
  THUMBNAIL: {
    width: 300,
    height: 300,
    quality: 80,
    format: 'webp'
  },
  MEDIUM: {
    width: 800,
    height: 800,
    quality: 85,
    format: 'webp'
  },
  LARGE: {
    width: 1600,
    height: 1600,
    quality: 90,
    format: 'webp'
  },
  ORIGINAL: {
    quality: 95,
    format: 'webp'
  }
};

// Validación de tipos de archivo
const isFileTypeAllowed = (file, allowedTypes) => {
  // Si no hay restricciones, permitir cualquier tipo
  if (!allowedTypes || !allowedTypes.mimeTypes) {
    return true;
  }
  
  return allowedTypes.mimeTypes.includes(file.mimetype);
};

module.exports = {
  ALLOWED_FILE_TYPES,
  PROJECT_DOCUMENT_TYPES,
  ACCESS_LEVELS,
  SECURITY_LEVELS,
  IMAGE_OPTIMIZATION_OPTIONS,
  isFileTypeAllowed
}; 