const express = require('express');
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');

const router = express.Router();

/**
 * Rutas para la gestión del sistema de logging
 */

// Ruta para registrar errores desde el frontend
router.post('/errors', jwtAuthMiddleware, async (req, res) => {
  try {
    const {
      message,
      status,
      code,
      component,
      action,
      additionalData,
      environment,
      user
    } = req.body;

    const timestamp = new Date();
    const userId = req.user?.id;
    const userRole = req.user?.role;

    // Crear estructura de datos para el log
    const logEntry = {
      timestamp,
      message,
      status,
      code,
      component,
      action,
      additionalData,
      environment,
      user: {
        ...user,
        id: userId || user?.userId,
        role: userRole || user?.role
      },
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    };

    // En una implementación real, aquí se guardaría en base de datos o
    // se enviaría a un servicio de logging como CloudWatch, LogDNA, etc.
    
    // Por ahora, solo lo registramos en la consola
    console.log('🚨 Error Frontend:', message);
    if (status >= 500) {
      console.error('Error crítico registrado:', JSON.stringify(logEntry, null, 2));
    } else {
      console.warn('Error registrado:', JSON.stringify(logEntry, null, 2));
    }

    // También podríamos notificar a administradores en caso de errores críticos
    
    // Responder con éxito para no bloquear al usuario
    res.status(201).json({
      message: 'Error registrado correctamente',
      logId: `log_${Date.now()}`
    });
  } catch (error) {
    console.error('Error al registrar error de cliente:', error);
    res.status(500).json({
      message: 'No se pudo registrar el error',
      error: error.message
    });
  }
});

module.exports = router; 