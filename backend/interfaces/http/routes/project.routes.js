const express = require('express');
const jwtAuthMiddleware = require('../../../middleware/jwtAuthMiddleware');
const roleAuthMiddleware = require('../../../middleware/roleAuthMiddleware');
// Este controlador lo implementaremos después
const projectController = require('../controllers/project.controller');

const router = express.Router();

// POST /api/projects - Crear un nuevo proyecto (borrador)
// Protegido: Requiere autenticación (JWT) y rol 'manager'
router.post(
  '/', 
  jwtAuthMiddleware,
  roleAuthMiddleware('manager'),
  projectController.create
);

// GET /api/projects - Listar todos los proyectos
// Protegido: Requiere autenticación (JWT) y rol 'partner', 'investor' o 'manager'
router.get(
  '/',
  jwtAuthMiddleware,
  roleAuthMiddleware(['partner', 'investor', 'manager']),
  projectController.list
);

// GET /api/projects/:id - Obtener un proyecto específico
// Protegido: Requiere autenticación (JWT) y rol 'partner', 'investor' o 'manager'
router.get(
  '/:id',
  jwtAuthMiddleware,
  roleAuthMiddleware(['partner', 'investor', 'manager']),
  projectController.getById
);

// PUT /api/projects/:id - Actualizar un proyecto existente
// Protegido: Requiere autenticación (JWT) y rol 'manager'
router.put(
  '/:id',
  jwtAuthMiddleware,
  roleAuthMiddleware('manager'),
  projectController.update
);

// POST /api/projects/:id/publish - Publicar un proyecto
// Protegido: Requiere autenticación (JWT) y rol 'manager'
router.post(
  '/:id/publish',
  jwtAuthMiddleware,
  roleAuthMiddleware('manager'),
  projectController.publish
);

// POST /api/projects/:id/documents - Subir documento a un proyecto
// Protegido: Requiere autenticación (JWT) y rol 'manager'
// router.post(
//   '/:id/documents',
//   jwtAuthMiddleware,
//   roleAuthMiddleware('manager'),
//   projectController.addDocument
// );

module.exports = router; 