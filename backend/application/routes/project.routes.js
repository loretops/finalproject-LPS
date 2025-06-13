// Obtener un proyecto público específico
router.get(
  '/public/:id',
  projectController.getPublishedProject.bind(projectController)
); 