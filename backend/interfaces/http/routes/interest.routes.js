const express = require('express');
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');
const roleAuthMiddleware = require('../../../middleware/roleAuthMiddleware');
const interestController = require('../controllers/interest.controller');

const router = express.Router();

/**
 * Rutas para gestión de intereses en proyectos.
 * Todas las rutas requieren autenticación.
 * Algunas rutas están restringidas a roles específicos.
 */

/**
 * POST /api/interests
 * Registrar interés en un proyecto.
 * Accesible para: socios ('partner')
 */
router.post(
  '/',
  jwtAuthMiddleware,
  roleAuthMiddleware('partner'),
  interestController.registerInterest
);

/**
 * GET /api/interests/user
 * Obtener todos los intereses del usuario autenticado.
 * Accesible para: socios ('partner')
 */
router.get(
  '/user',
  jwtAuthMiddleware,
  roleAuthMiddleware('partner'),
  interestController.getUserInterests
);

/**
 * GET /api/interests/project/:projectId
 * Obtener todos los intereses para un proyecto específico.
 * Accesible para: gestores ('manager')
 */
router.get(
  '/project/:projectId',
  jwtAuthMiddleware,
  roleAuthMiddleware('manager'),
  interestController.getProjectInterests
);

/**
 * DELETE /api/interests/:id
 * Eliminar un interés.
 * Accesible para: socios ('partner')
 * Nota: solo se puede eliminar interés propio (validado en el controlador)
 */
router.delete(
  '/:id',
  jwtAuthMiddleware,
  roleAuthMiddleware('partner'),
  interestController.removeInterest
);

/**
 * PATCH /api/interests/:id/status
 * Cambiar el estado de un interés (convertido, rechazado, etc.)
 * Accesible para: gestores ('manager')
 */
router.patch(
  '/:id/status',
  jwtAuthMiddleware,
  roleAuthMiddleware('manager'),
  interestController.changeInterestStatus
);

module.exports = router; 