const express = require('express');
const { body, param } = require('express-validator');
const investmentController = require('../controllers/investment.controller');
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');
const roleAuthMiddleware = require('../../../middleware/roleAuthMiddleware');

const router = express.Router();

/**
 * Rutas para la gestión de inversiones.
 * Todas requieren autenticación.
 */

// Registrar una nueva inversión en un proyecto
router.post('/projects/:projectId/invest',
  jwtAuthMiddleware,
  roleAuthMiddleware(['partner', 'investor', 'manager', 'admin']),
  [
    param('projectId').isUUID().withMessage('ID de proyecto inválido'),
    body('amount').isFloat({ min: 0.01 }).withMessage('El monto debe ser un número positivo'),
    body('notes').optional().isString().trim().isLength({ max: 1000 }).withMessage('Las notas no pueden exceder 1000 caracteres')
  ],
  investmentController.investInProject
);

// Obtener todas las inversiones del usuario autenticado
router.get('/users/me/investments',
  jwtAuthMiddleware,
  investmentController.getUserInvestments
);

// Obtener todas las inversiones de un proyecto específico (solo gestores)
router.get('/projects/:projectId/investments',
  jwtAuthMiddleware,
  roleAuthMiddleware(['manager', 'admin']),
  [
    param('projectId').isUUID().withMessage('ID de proyecto inválido')
  ],
  investmentController.getProjectInvestments
);

// Obtener todas las inversiones (solo gestores y administradores)
router.get('/investments',
  jwtAuthMiddleware,
  roleAuthMiddleware(['manager', 'admin']),
  investmentController.getAllInvestments
);

// Obtener detalle de una inversión específica
router.get('/investments/:investmentId',
  jwtAuthMiddleware,
  [
    param('investmentId').isUUID().withMessage('ID de inversión inválido')
  ],
  investmentController.getInvestmentById
);

// Cancelar una inversión (el usuario solo puede cancelar sus propias inversiones pendientes)
router.delete('/investments/:investmentId',
  jwtAuthMiddleware,
  [
    param('investmentId').isUUID().withMessage('ID de inversión inválido')
  ],
  investmentController.cancelInvestment
);

// Actualizar el estado de una inversión (solo gestores)
router.patch('/investments/:investmentId/status',
  jwtAuthMiddleware,
  roleAuthMiddleware(['manager', 'admin']),
  [
    param('investmentId').isUUID().withMessage('ID de inversión inválido'),
    body('status').isIn(['pending', 'confirmed', 'rejected', 'canceled', 'cancelled']).withMessage('Estado inválido'),
    body('contractReference').optional().isString().trim().isLength({ max: 255 }).withMessage('La referencia de contrato no puede exceder 255 caracteres')
  ],
  investmentController.updateInvestmentStatus
);

module.exports = router; 