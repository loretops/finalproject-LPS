const express = require('express');
const notificationController = require('../controllers/notification.controller');
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');

const router = express.Router();

// Todas las rutas de notificaciones requieren autenticación
router.use(jwtAuthMiddleware);

// GET /api/notifications - Obtener notificaciones del usuario
router.get('/', notificationController.getUserNotifications);

// PATCH /api/notifications/:notificationId/read - Marcar notificación como leída
router.patch('/:notificationId/read', notificationController.markAsRead);

// PATCH /api/notifications/read-all - Marcar todas las notificaciones como leídas
router.patch('/read-all', notificationController.markAllAsRead);

// DELETE /api/notifications/:notificationId - Eliminar notificación
router.delete('/:notificationId', notificationController.deleteNotification);

module.exports = router; 