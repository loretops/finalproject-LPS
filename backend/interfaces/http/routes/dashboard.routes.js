const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');
const roleAuthMiddleware = require('../../../middleware/roleAuthMiddleware');

const router = express.Router();

// GET /api/dashboard/stats - Obtener estadísticas generales del dashboard
// Requiere autenticación
router.get(
  '/stats',
  jwtAuthMiddleware,
  dashboardController.getStats
);

// GET /api/dashboard/manager-stats - Obtener estadísticas para gestores
// Requiere autenticación y rol manager
router.get(
  '/manager-stats',
  jwtAuthMiddleware,
  roleAuthMiddleware('manager'),
  dashboardController.getManagerStats
);

// GET /api/dashboard/user-stats - Obtener estadísticas para el usuario
// Requiere autenticación
router.get(
  '/user-stats',
  jwtAuthMiddleware,
  dashboardController.getUserStats
);

module.exports = router; 