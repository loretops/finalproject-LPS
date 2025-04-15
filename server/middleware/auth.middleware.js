const { jwtVerify } = require('jose');

/**
 * Middleware para verificar la autenticación del usuario
 * Verifica el token JWT en la cabecera Authorization
 */
async function authMiddleware(req, res, next) {
  try {
    // Obtener el token del header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
      // Verificar el token
      const encoder = new TextEncoder();
      const secretKey = encoder.encode(process.env.JWT_SECRET);

      const { payload } = await jwtVerify(token, secretKey);

      // Añadir el usuario al objeto de solicitud
      req.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      // Continuar con la siguiente función
      next();
    } catch (error) {
      console.error('Error al verificar token:', error);
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = authMiddleware;
