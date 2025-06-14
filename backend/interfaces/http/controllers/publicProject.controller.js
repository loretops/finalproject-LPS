const projectService = require('../../../application/services/projectService');

/**
 * Controlador para endpoints de proyectos públicos.
 * Este controlador gestiona los endpoints relacionados con la visualización
 * de proyectos publicados por parte de los socios.
 */
class PublicProjectController {
  /**
   * Maneja la petición GET /api/projects/public para listar proyectos publicados.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async list(req, res) {
    try {
      // Verificar que req.user exista y tenga un rol definido
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          message: 'No autorizado - Se requiere autenticación con rol válido'
        });
      }
      
      // Extraer parámetros de consulta (query params)
      const {
        propertyType,
        minRoi,
        location,
        page = 1,
        limit = 10,
        sortField,
        sortDirection
      } = req.query;

      // Convertir page y limit a números
      const options = {
        propertyType,
        minRoi,
        location,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sortField,
        sortDirection
      };

      console.log('Opciones de búsqueda para proyectos públicos:', options);

      // Usar el método específico para proyectos publicados
      const result = await projectService.getPublishedProjects(options);
      
      // Registrar la actividad del usuario (opcional para análisis)
      // TODO: Implementar registro de actividad
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en PublicProjectController.list:', error);
      res.status(500).json({
        message: 'Error al listar proyectos públicos',
        error: error.message
      });
    }
  }

  /**
   * Maneja la petición GET /api/projects/public/:id para obtener un proyecto público específico.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      
      // Verificar que req.user exista y tenga un rol definido
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          message: 'No autorizado - Se requiere autenticación con rol válido'
        });
      }
      
      // Pasar el rol del usuario como opción
      const options = {
        userRole: req.user.role?.name || req.user.role || 'partner'
      };
      
      const project = await projectService.getProjectById(id, options);

      if (!project) {
        return res.status(404).json({
          message: 'Proyecto no encontrado'
        });
      }

      // Verificar que el proyecto está publicado (solo socios deben ver proyectos publicados)
      if (project.status !== 'published') {
        return res.status(403).json({
          message: 'No tienes acceso a este proyecto'
        });
      }

      // Registrar visualización (opcional para análisis y seguimiento)
      // Implementación simple para MVP
      console.log(`[${new Date().toISOString()}] Usuario ${req.user.id} (${req.user.role}) ha visto el proyecto ${id}`);
      
      // Para una implementación completa se podría usar un servicio específico
      // await projectViewService.registerView({
      //   projectId: id,
      //   userId: req.user.id,
      //   userRole: req.user.role,
      //   timestamp: new Date()
      // });
      
      res.status(200).json(project);
    } catch (error) {
      console.error('Error en PublicProjectController.getById:', error);
      res.status(500).json({
        message: 'Error al obtener el proyecto',
        error: error.message
      });
    }
  }
}

module.exports = new PublicProjectController(); 