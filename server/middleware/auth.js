// Middleware de autenticación y autorización
const jose = require('jose');

/**
 * Protege rutas verificando el token JWT
 * @returns {Function} Middleware que verifica autenticación
 */
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Obtener token de headers o cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // Verificar si el token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No tienes autorización para acceder a este recurso'
      });
    }

    // Verificar token con jose
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(process.env.JWT_SECRET);
    
    try {
      const { payload } = await jose.jwtVerify(token, secretKey);
      
      // Almacenar usuario en req (en un entorno real se buscaría en la base de datos)
      req.user = { id: payload.id, role: payload.role };
      
      next();
    } catch (jwtError) {
      console.error(`Error de JWT: ${jwtError.message}`);
      return res.status(401).json({
        success: false,
        error: 'Token inválido o expirado'
      });
    }
  } catch (err) {
    console.error(`Error de autenticación: ${err.message}`);
    return res.status(401).json({
      success: false,
      error: 'Error al procesar la autenticación'
    });
  }
};

/**
 * Restringe acceso basado en roles de usuario
 * @param {...String} roles Roles autorizados para acceder
 * @returns {Function} Middleware que verifica rol
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para realizar esta acción'
      });
    }
    next();
  };
};

/**
 * Middleware para verificar acceso a documentos/proyectos confidenciales
 * @param {String} entityType Tipo de entidad (proyecto, documento, etc.)
 * @returns {Function} Middleware que verifica permiso
 */
exports.checkEntityAccess = (entityType) => {
  return async (req, res, next) => {
    try {
      const entityId = req.params.id;
      const userId = req.user.id;
      
      // Aquí iría la lógica para verificar si el usuario tiene permisos
      // para acceder a esta entidad específica (buscar en la base de datos)
      
      // Ejemplo simplificado:
      /*
      const permission = await db.userPermissions.findOne({
        where: { 
          userId,
          entityId,
          entityType 
        }
      });
      
      if (!permission && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'No tienes permiso para acceder a este contenido'
        });
      }
      */
      
      // Para el ejemplo, simplemente pasamos al siguiente middleware
      next();
    } catch (err) {
      console.error(`Error verificando permisos: ${err.message}`);
      return res.status(500).json({
        success: false,
        error: 'Error al verificar permisos de acceso'
      });
    }
  };
}; 