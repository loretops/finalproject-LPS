const express = require('express');
const publicProjectController = require('../controllers/publicProject.controller');

const router = express.Router();

/**
 * Rutas para proyectos públicos - Accesibles principalmente por usuarios con rol de socio
 * Estas rutas SÍ requieren autenticación porque acceden a datos del usuario autenticado.
 */

// Importar middleware de autenticación
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');

// GET /api/projects/public - Listar todos los proyectos publicados
router.get(
  '/',
  jwtAuthMiddleware,
  publicProjectController.list
);

// GET /api/projects/public/:id - Obtener detalles de un proyecto publicado específico
router.get(
  '/:id',
  jwtAuthMiddleware,
  publicProjectController.getById
);

module.exports = router; 