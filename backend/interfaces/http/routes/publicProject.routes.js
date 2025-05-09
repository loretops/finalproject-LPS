const express = require('express');
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');
const roleAuthMiddleware = require('../../../middleware/roleAuthMiddleware');
const publicProjectController = require('../controllers/publicProject.controller');

const router = express.Router();

/**
 * Rutas para proyectos públicos - Accesibles por socios
 * Estas rutas están protegidas y requieren autenticación y rol de socio o superior.
 */

// GET /api/projects/public - Listar todos los proyectos publicados
// Protegido: Requiere autenticación (JWT) y rol 'partner' o superior
router.get(
  '/',
  jwtAuthMiddleware,
  roleAuthMiddleware(['partner', 'manager']),
  publicProjectController.list
);

// GET /api/projects/public/:id - Obtener detalles de un proyecto publicado específico
// Protegido: Requiere autenticación (JWT) y rol 'partner' o superior
router.get(
  '/:id',
  jwtAuthMiddleware,
  roleAuthMiddleware(['partner', 'manager']),
  publicProjectController.getById
);

module.exports = router; 