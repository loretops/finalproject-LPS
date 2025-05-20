const projectService = require('../../../application/services/projectService');

class ProjectController {
  /**
   * Maneja la petición POST /api/projects para crear un nuevo proyecto.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async create(req, res) {
    try {
      const projectData = req.body;
      const creatorId = req.user.id;

      // Validación básica
      if (!projectData.title || !projectData.description) {
        return res.status(400).json({
          message: 'Se requieren título y descripción para crear un proyecto'
        });
      }

      const newProject = await projectService.createProject(projectData, creatorId);
      res.status(201).json(newProject);
    } catch (error) {
      console.error('Error en ProjectController.create:', error);
      res.status(500).json({
        message: 'Error al crear el proyecto',
        error: error.message
      });
    }
  }

  /**
   * Maneja la petición GET /api/projects para listar proyectos.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async list(req, res) {
    try {
      // Extraer parámetros de consulta (query params)
      const {
        status,
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
        status,
        propertyType,
        minRoi,
        location,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sortField,
        sortDirection
      };

      console.log('ProjectController.list - Parámetros recibidos:', req.query);
      console.log('ProjectController.list - Opciones de búsqueda:', options);

      const result = await projectService.getProjects(options);
      
      console.log(`ProjectController.list - Total de proyectos encontrados: ${result.data.length}`);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en ProjectController.list:', error);
      res.status(500).json({
        message: 'Error al listar proyectos',
        error: error.message
      });
    }
  }

  /**
   * Maneja la petición GET /api/projects/:id para obtener un proyecto específico.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(id);

      if (!project) {
        return res.status(404).json({
          message: 'Proyecto no encontrado'
        });
      }

      res.status(200).json(project);
    } catch (error) {
      console.error('Error en ProjectController.getById:', error);
      res.status(500).json({
        message: 'Error al obtener el proyecto',
        error: error.message
      });
    }
  }

  /**
   * Maneja la petición PUT /api/projects/:id para actualizar un proyecto.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const projectData = req.body;

      // Validación básica
      if (Object.keys(projectData).length === 0) {
        return res.status(400).json({
          message: 'No se han proporcionado datos para actualizar'
        });
      }

      const updatedProject = await projectService.updateProject(id, projectData);
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error('Error en ProjectController.update:', error);
      
      // Manejar diferentes tipos de error
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          message: error.message
        });
      }
      
      if (error.message.includes('no se puede modificar')) {
        return res.status(400).json({
          message: error.message
        });
      }

      res.status(500).json({
        message: 'Error al actualizar el proyecto',
        error: error.message
      });
    }
  }

  /**
   * Maneja la petición POST /api/projects/:id/publish para publicar un proyecto.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async publish(req, res) {
    try {
      const { id } = req.params;
      const publisherId = req.user.id;

      console.log(`Intentando publicar proyecto con ID ${id} por usuario ${publisherId}`);
      
      const publishedProject = await projectService.publishProject(id, publisherId);
      console.log(`Proyecto ${id} publicado exitosamente`);
      res.status(200).json(publishedProject);
    } catch (error) {
      console.error('Error en ProjectController.publish:', error);
      
      // Manejar diferentes tipos de error
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          message: error.message,
          type: 'not_found_error'
        });
      }
      
      // Errores de validación específicos - código 400 (Bad Request)
      const validationPhrases = [
        'ya está publicado',
        'debe tener',
        'debe especificar',
        'es requerido',
        'documento legal',
        'descripción',
        'título',
        'inversión mínima',
        'monto objetivo',
        'ubicación',
        'tipo de propiedad',
        'al menos',
        'caracteres'
      ];
      
      if (validationPhrases.some(phrase => error.message.toLowerCase().includes(phrase.toLowerCase()))) {
        console.log(`Error de validación detectado: ${error.message}`);
        return res.status(400).json({
          message: error.message,
          type: 'validation_error'
        });
      }

      res.status(500).json({
        message: 'Error al publicar el proyecto',
        error: error.message,
        type: 'server_error'
      });
    }
  }

  /**
   * Maneja la petición POST /api/projects/:id/documents para subir un documento.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async addDocument(req, res) {
    try {
      const { id } = req.params;
      const documentData = req.body;

      // Validación básica
      if (!documentData.documentType || !documentData.accessLevel) {
        return res.status(400).json({
          message: 'Se requieren tipo de documento y nivel de acceso'
        });
      }

      // Aquí faltaría el manejo del archivo subido
      // Esto se implementará en el ticket #14 de servicio de almacenamiento

      const document = await projectService.addProjectDocument(id, documentData);
      res.status(201).json(document);
    } catch (error) {
      console.error('Error en ProjectController.addDocument:', error);
      
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          message: error.message
        });
      }

      res.status(500).json({
        message: 'Error al añadir documento al proyecto',
        error: error.message
      });
    }
  }
}

module.exports = new ProjectController(); 