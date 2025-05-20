import { toast } from 'react-hot-toast';

/**
 * Objeto que contiene los tipos de errores comunes
 */
export const ErrorTypes = {
  VALIDATION: 'VALIDATION_ERROR',
  NETWORK: 'NETWORK_ERROR',
  SERVER: 'SERVER_ERROR',
  AUTH: 'AUTHENTICATION_ERROR',
  FORBIDDEN: 'FORBIDDEN_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  CONFLICT: 'CONFLICT_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

/**
 * Objeto para configurar las preferencias de notificación según el tipo de error
 */
const NotificationConfig = {
  [ErrorTypes.VALIDATION]: { 
    duration: 5000, 
    icon: '⚠️', 
    styles: { backgroundColor: '#FEF3C7', color: '#92400E' }
  },
  [ErrorTypes.NETWORK]: { 
    duration: 6000, 
    icon: '📡', 
    styles: { backgroundColor: '#DBEAFE', color: '#1E40AF' }
  },
  [ErrorTypes.SERVER]: { 
    duration: 6000, 
    icon: '🛑', 
    styles: { backgroundColor: '#FEE2E2', color: '#B91C1C' }
  },
  [ErrorTypes.AUTH]: { 
    duration: 4000, 
    icon: '🔐', 
    styles: { backgroundColor: '#DBEAFE', color: '#1E40AF' }
  },
  [ErrorTypes.FORBIDDEN]: { 
    duration: 4000, 
    icon: '🚫', 
    styles: { backgroundColor: '#FEE2E2', color: '#B91C1C' }
  },
  [ErrorTypes.NOT_FOUND]: { 
    duration: 4000, 
    icon: '🔍', 
    styles: { backgroundColor: '#E0E7FF', color: '#3730A3' }
  },
  [ErrorTypes.CONFLICT]: { 
    duration: 5000, 
    icon: '⚙️', 
    styles: { backgroundColor: '#FEF3C7', color: '#92400E' }
  },
  [ErrorTypes.UNKNOWN]: { 
    duration: 5000, 
    icon: '❓', 
    styles: { backgroundColor: '#F3F4F6', color: '#1F2937' }
  }
};

/**
 * Determina el tipo de error basado en el objeto de error
 * @param {Error} error - El objeto de error
 * @returns {string} - El tipo de error
 */
export const getErrorType = (error) => {
  if (!error) return ErrorTypes.UNKNOWN;

  // Si el error tiene un status HTTP
  if (error.status) {
    switch (error.status) {
      case 400: return ErrorTypes.VALIDATION;
      case 401: return ErrorTypes.AUTH;
      case 403: return ErrorTypes.FORBIDDEN;
      case 404: return ErrorTypes.NOT_FOUND;
      case 409: return ErrorTypes.CONFLICT;
      default:
        return error.status >= 500 ? ErrorTypes.SERVER : ErrorTypes.UNKNOWN;
    }
  }

  // Si el error es de red o conexión
  if (error.message && (
    error.message.includes('conexión') || 
    error.message.includes('network') || 
    error.message.includes('servidor')
  )) {
    return ErrorTypes.NETWORK;
  }

  return ErrorTypes.UNKNOWN;
};

/**
 * Muestra una notificación de error usando toast
 * @param {Error} error - El objeto de error a mostrar
 * @param {Object} options - Opciones adicionales
 * @param {string} options.context - Contexto adicional para el error
 * @param {boolean} options.logDetails - Si debe loguear detalles técnicos (por defecto true)
 */
export const showErrorNotification = (error, options = {}) => {
  const { context = '', logDetails = true } = options;
  
  if (!error) {
    toast.error('Se produjo un error desconocido');
    return;
  }

  const errorType = getErrorType(error);
  const config = NotificationConfig[errorType] || NotificationConfig[ErrorTypes.UNKNOWN];
  const message = error.message || 'Ocurrió un error inesperado';
  
  // Mensaje con contexto si existe
  const displayMessage = context 
    ? `${context}: ${message}` 
    : message;

  // Mostrar la notificación
  toast.error(displayMessage, {
    duration: config.duration,
    icon: config.icon,
    style: config.styles
  });

  // Loguear detalles técnicos si es necesario
  if (logDetails && errorType === ErrorTypes.SERVER) {
    console.error('Detalles técnicos del error:', {
      message: error.message,
      stack: error.stack,
      data: error.data || {},
      status: error.status,
      code: error.code,
      context
    });
  }
};

/**
 * Manejador de errores completo para usar en bloques catch
 * @param {Error} error - El error capturado
 * @param {Object} options - Opciones adicionales
 * @param {string} options.context - Contexto adicional para el error
 * @param {Function} options.onAuthError - Función a ejecutar en caso de error de autenticación
 * @returns {Error} - El error procesado
 */
export const handleClientError = (error, options = {}) => {
  const { 
    context = '', 
    onAuthError = null 
  } = options;
  
  // Mostrar notificación al usuario
  showErrorNotification(error, { context });
  
  // Si es un error de autenticación, ejecutar callback
  if (getErrorType(error) === ErrorTypes.AUTH && onAuthError) {
    onAuthError(error);
  }
  
  // Devolver el error procesado
  return error;
};

export default {
  handleClientError,
  showErrorNotification,
  getErrorType,
  ErrorTypes
}; 