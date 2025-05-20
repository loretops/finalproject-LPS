const interestService = require('../../../application/services/interestService');

/**
 * Controlador para endpoints de gestión de intereses en proyectos.
 * Este controlador gestiona las operaciones CRUD para intereses de usuarios en proyectos.
 */
class InterestController {
  /**
   * Maneja la petición POST /api/interests para registrar interés en un proyecto.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async registerInterest(req, res) {
    try {
      const { projectId, notes } = req.body;
      const userId = req.user.id;

      console.log(`[InterestController] Solicitud de interés recibida - Usuario: ${userId}, Proyecto: ${projectId}`);

      if (!projectId) {
        console.warn(`[InterestController] Solicitud rechazada - ID de proyecto no proporcionado`);
        return res.status(400).json({
          message: 'Se requiere el ID del proyecto'
        });
      }

      try {
        const interest = await interestService.registerInterest(userId, projectId, notes);
        console.log(`[InterestController] Interés registrado correctamente: ${interest.id}`);
        res.status(201).json(interest);
      } catch (serviceError) {
        console.error(`[InterestController] Error del servicio: ${serviceError.message}`);
        
        // Manejar distintos tipos de error con respuestas específicas
        if (serviceError.message.includes('Ya has mostrado interés') || 
            serviceError.message.includes('Ya existe un interés')) {
          return res.status(409).json({ // Conflict
            message: serviceError.message
          });
        }
        
        if (serviceError.message.includes('Proyecto no encontrado')) {
          return res.status(404).json({
            message: serviceError.message
          });
        }
        
        if (serviceError.message.includes('Solo se puede mostrar interés en proyectos publicados')) {
          return res.status(400).json({
            message: serviceError.message
          });
        }
        
        // Para errores de Prisma, proporcionar mensajes más amigables
        if (serviceError.code === 'P2002') {
          return res.status(409).json({
            message: 'Ya has mostrado interés en este proyecto'
          });
        }
        
        if (serviceError.code === 'P2003') {
          return res.status(400).json({
            message: 'La referencia al proyecto o usuario no es válida'
          });
        }
        
        // Error genérico para cualquier otro caso
        throw serviceError; // Re-lanzar para el manejo general de errores abajo
      }
    } catch (error) {
      console.error('[InterestController] Error inesperado en registerInterest:', error);
      
      // Detalle técnico solo para logs, no para respuesta al usuario
      const errorDetail = error.code || error.name || 'UnknownError';
      console.error(`[InterestController] Tipo de error: ${errorDetail}, Stack: ${error.stack}`);
      
      res.status(500).json({
        message: 'Error al registrar interés en el proyecto',
        error: 'Se ha producido un error interno. Por favor, inténtalo de nuevo más tarde.'
      });
    }
  }

  /**
   * Maneja la petición GET /api/interests/user para obtener intereses del usuario autenticado.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async getUserInterests(req, res) {
    try {
      const userId = req.user.id;
      const { status, page = 1, limit = 10 } = req.query;
      
      // Convertir a números
      const options = {
        status,
        offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
        limit: parseInt(limit, 10)
      };
      
      const interests = await interestService.getUserInterests(userId, options);
      res.status(200).json(interests);
    } catch (error) {
      console.error('Error en InterestController.getUserInterests:', error);
      res.status(500).json({
        message: 'Error al obtener los intereses del usuario',
        error: error.message
      });
    }
  }

  /**
   * Maneja la petición GET /api/interests/project/:projectId para obtener intereses en un proyecto.
   * Solo accesible para gestores.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async getProjectInterests(req, res) {
    try {
      const { projectId } = req.params;
      const { status, page = 1, limit = 10 } = req.query;
      
      if (!projectId) {
        return res.status(400).json({
          message: 'Se requiere el ID del proyecto'
        });
      }
      
      // Convertir a números
      const options = {
        status,
        offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
        limit: parseInt(limit, 10)
      };
      
      const interests = await interestService.getProjectInterests(projectId, options);
      res.status(200).json(interests);
    } catch (error) {
      console.error('Error en InterestController.getProjectInterests:', error);
      res.status(500).json({
        message: 'Error al obtener los intereses en el proyecto',
        error: error.message
      });
    }
  }

  /**
   * Maneja la petición DELETE /api/interests/:id para eliminar un interés.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async removeInterest(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      if (!id) {
        return res.status(400).json({
          message: 'Se requiere el ID del interés'
        });
      }
      
      await interestService.removeInterest(id, userId);
      res.status(204).send(); // No content
    } catch (error) {
      console.error('Error en InterestController.removeInterest:', error);
      
      if (error.message.includes('Interés no encontrado')) {
        return res.status(404).json({
          message: error.message
        });
      }
      
      if (error.message.includes('No tienes permiso')) {
        return res.status(403).json({
          message: error.message
        });
      }
      
      res.status(500).json({
        message: 'Error al eliminar el interés',
        error: error.message
      });
    }
  }

  /**
   * Maneja la petición PATCH /api/interests/:id/status para cambiar el estado de un interés.
   * Solo accesible para gestores.
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async changeInterestStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!id || !status) {
        return res.status(400).json({
          message: 'Se requieren el ID del interés y el nuevo estado'
        });
      }
      
      const updatedInterest = await interestService.changeInterestStatus(id, status);
      res.status(200).json(updatedInterest);
    } catch (error) {
      console.error('Error en InterestController.changeInterestStatus:', error);
      
      if (error.message.includes('Estado inválido')) {
        return res.status(400).json({
          message: error.message
        });
      }
      
      res.status(500).json({
        message: 'Error al cambiar el estado del interés',
        error: error.message
      });
    }
  }
}

module.exports = new InterestController(); 