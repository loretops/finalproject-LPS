/**
 * Utilidad para monitorear errores críticos en la aplicación
 * En una implementación real, esto podría enviar datos a un servicio como Sentry o LogRocket
 */

// Configuración del monitor de errores
const config = {
  // Nivel mínimo para registrar errores (error, warn, info, debug)
  minLevel: 'error',
  
  // Si debe capturar automáticamente errores no controlados
  captureUnhandledErrors: true,
  
  // Si debe incluir información del usuario
  includeUserInfo: true,
  
  // Máximo de errores a registrar por sesión
  maxErrorsPerSession: 50,
  
  // API endpoint para reportar errores (podría ser un endpoint real en producción)
  endpoint: process.env.NODE_ENV === 'production' 
    ? '/api/logs/errors' 
    : null
};

// Contador de errores registrados en la sesión actual
let errorCount = 0;

// Cache de errores ya reportados para evitar duplicados
// Usamos un Set para almacenar firmas de errores
const reportedErrors = new Set();

/**
 * Genera una firma única para un error basada en su mensaje y detalles
 * @param {Object} errorData - Datos del error
 * @returns {string} - Firma del error
 */
const generateErrorSignature = (errorData) => {
  const { message, status, code, component, action } = errorData;
  return `${status || ''}|${code || ''}|${component || ''}|${action || ''}|${message || ''}`;
};

/**
 * Obtiene información básica del usuario si está disponible
 * @returns {Object} - Información del usuario
 */
const getUserInfo = () => {
  try {
    // En una implementación real, esto obtendría información del almacenamiento local
    // o del contexto de autenticación
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      // Solo incluimos información no sensible
      return {
        userId: user.id,
        role: user.role,
        // No incluir información personal como email, nombre, etc.
      };
    }
  } catch (e) {
    console.warn('No se pudo obtener información del usuario para el reporte de error');
  }
  return null;
};

/**
 * Obtiene información del entorno de ejecución
 * @returns {Object} - Información del entorno
 */
const getEnvironmentInfo = () => {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    url: window.location.href,
    referrer: document.referrer,
    timestamp: new Date().toISOString()
  };
};

/**
 * Envía el error al servidor o al servicio de monitoreo
 * @param {Object} errorData - Datos completos del error
 * @returns {Promise<void>}
 */
const sendErrorToServer = async (errorData) => {
  // Si no hay un endpoint configurado o estamos en desarrollo, solo mostramos en consola
  if (!config.endpoint) {
    console.group('🚨 Error Monitor');
    console.error('Error capturado:', errorData);
    console.groupEnd();
    return;
  }
  
  // En producción, enviamos al endpoint
  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(errorData),
      // No enviamos credenciales a menos que el endpoint esté en nuestro dominio
      credentials: 'same-origin'
    });
    
    if (!response.ok) {
      console.warn('No se pudo reportar el error al servidor:', await response.text());
    }
  } catch (e) {
    // Silenciamos errores del reporte para evitar loops
    console.warn('Error al enviar el reporte de error:', e.message);
  }
};

/**
 * Registra un error en el sistema de monitoreo
 * @param {Error|Object} error - Error o datos del error
 * @param {Object} contextData - Datos adicionales de contexto
 * @param {string} contextData.component - Componente donde ocurrió el error
 * @param {string} contextData.action - Acción que estaba realizando el usuario
 * @param {Object} contextData.additionalData - Datos adicionales específicos
 * @returns {string} - ID del error registrado o null si no se registró
 */
export const logError = (error, contextData = {}) => {
  // Si hemos alcanzado el límite de errores para esta sesión, no registramos más
  if (errorCount >= config.maxErrorsPerSession) {
    return null;
  }
  
  const { component = 'unknown', action = 'unknown', additionalData = {} } = contextData;
  
  // Construir objeto de error estructurado
  const errorData = {
    message: error.message || 'Error desconocido',
    stack: error.stack,
    status: error.status || error.statusCode,
    code: error.code,
    data: error.data,
    component,
    action,
    additionalData,
    environment: getEnvironmentInfo()
  };
  
  // Añadir información del usuario si está configurado
  if (config.includeUserInfo) {
    errorData.user = getUserInfo();
  }
  
  // Generar firma del error para evitar duplicados
  const errorSignature = generateErrorSignature(errorData);
  
  // Si ya hemos reportado este error, no lo registramos de nuevo
  if (reportedErrors.has(errorSignature)) {
    return null;
  }
  
  // Marcar este error como reportado
  reportedErrors.add(errorSignature);
  errorCount++;
  
  // Enviar al servidor
  sendErrorToServer(errorData);
  
  // Generar ID único para el error
  const errorId = `err_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  return errorId;
};

/**
 * Registra específicamente un error 500 del servidor
 * @param {Error|Object} error - Error capturado
 * @param {Object} contextData - Datos de contexto
 * @returns {string} - ID del error registrado
 */
export const logServerError = (error, contextData = {}) => {
  // Asegurarnos de que sabemos que es un error de servidor
  const enhancedError = {
    ...error,
    status: error.status || 500,
    code: error.code || 'SERVER_ERROR'
  };
  
  // Añadir prioridad alta
  const enhancedContext = {
    ...contextData,
    additionalData: {
      ...(contextData.additionalData || {}),
      priority: 'high',
      category: 'server_error'
    }
  };
  
  // Registrar con mayor detalle
  return logError(enhancedError, enhancedContext);
};

/**
 * Configura un listener global para capturar errores no controlados
 */
if (config.captureUnhandledErrors && typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    logError(event.error || { message: event.message }, {
      component: 'window',
      action: 'unhandled_error'
    });
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason || { message: 'Promesa rechazada no controlada' }, {
      component: 'window',
      action: 'unhandled_rejection'
    });
  });
}

export default {
  logError,
  logServerError
}; 