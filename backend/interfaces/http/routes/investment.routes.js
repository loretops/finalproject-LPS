const express = require('express');
const { body, param } = require('express-validator');
const investmentController = require('../controllers/investment.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();

/**
 * Rutas para la gestión de inversiones.
 * Todas requieren autenticación.
 */

// Registrar una nueva inversión en un proyecto
router.post('/projects/:projectId/invest',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['partner', 'investor', 'manager', 'admin']),
  [
    param('projectId').isUUID().withMessage('ID de proyecto inválido'),
    body('amount').isFloat({ min: 0.01 }).withMessage('El monto debe ser un número positivo'),
    body('notes').optional().isString().trim().isLength({ max: 1000 }).withMessage('Las notas no pueden exceder 1000 caracteres')
  ],
  investmentController.investInProject
);

// Obtener todas las inversiones del usuario autenticado
router.get('/users/me/investments',
  authMiddleware.authenticate,
  investmentController.getUserInvestments
);

// Obtener todas las inversiones de un proyecto específico (solo gestores)
router.get('/projects/:projectId/investments',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['manager', 'admin']),
  [
    param('projectId').isUUID().withMessage('ID de proyecto inválido')
  ],
  investmentController.getProjectInvestments
);

// Obtener detalle de una inversión específica
router.get('/investments/:id',
  authMiddleware.authenticate,
  [
    param('id').isUUID().withMessage('ID de inversión inválido')
  ],
  investmentController.getInvestmentById
);

// Cancelar una inversión (solo el usuario que la realizó)
router.delete('/investments/:id',
  authMiddleware.authenticate,
  [
    param('id').isUUID().withMessage('ID de inversión inválido')
  ],
  investmentController.cancelInvestment
);

// Actualizar estado de una inversión (solo gestores)
router.patch('/investments/:id/status',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['manager', 'admin']),
  [
    param('id').isUUID().withMessage('ID de inversión inválido'),
    body('status').isIn(['pending', 'confirmed', 'rejected', 'cancelled']).withMessage('Estado no válido'),
    body('contractReference').optional().isString().trim().isLength({ max: 100 }).withMessage('Referencia de contrato inválida')
  ],
  investmentController.updateInvestmentStatus
);

module.exports = router; 