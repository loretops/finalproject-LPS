const InvestmentService = require('../../../application/services/investmentService');
const { validationResult } = require('express-validator');

/**
 * Controlador para gestionar las operaciones relacionadas con inversiones.
 */
class InvestmentController {
  constructor() {
    this.investmentService = new InvestmentService();
  }

  /**
   * Registra una nueva inversión en un proyecto.
   * @param {Request} req - Objeto de solicitud Express
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Response} - Respuesta con la inversión creada o error
   */
  async investInProject(req, res) {
    try {
      // Verificar errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { projectId } = req.params;
      const { amount, notes } = req.body;
      const userId = req.user.id; // Asumiendo middleware de autenticación

      // Crear la inversión
      const investment = await this.investmentService.createInvestment({
        userId,
        projectId,
        amount: parseFloat(amount),
        notes
      });

      return res.status(201).json({
        message: 'Inversión registrada con éxito',
        data: investment
      });
    } catch (error) {
      console.error('Error en InvestmentController.investInProject:', error);
      
      // Manejo específico de errores conocidos
      if (error.message.includes('inversión mínima') || 
          error.message.includes('no está disponible') ||
          error.message.includes('El proyecto especificado no existe')) {
        return res.status(400).json({ message: error.message });
      }
      
      return res.status(500).json({ 
        message: 'Error al registrar la inversión',
        error: error.message 
      });
    }
  }

  /**
   * Obtiene todas las inversiones realizadas por el usuario autenticado.
   * @param {Request} req - Objeto de solicitud Express
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Response} - Respuesta con las inversiones del usuario
   */
  async getUserInvestments(req, res) {
    try {
      const userId = req.user.id; // Asumiendo middleware de autenticación
      const { status, page, limit } = req.query;

      const options = {
        status,
        page: page ? parseInt(page, 10) : 1,
        limit: limit ? parseInt(limit, 10) : 10
      };

      const result = await this.investmentService.getUserInvestments(userId, options);

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error en InvestmentController.getUserInvestments:', error);
      return res.status(500).json({ 
        message: 'Error al obtener inversiones del usuario',
        error: error.message 
      });
    }
  }

  /**
   * Obtiene todas las inversiones realizadas en un proyecto específico.
   * Solo accesible para gestores y administradores.
   * @param {Request} req - Objeto de solicitud Express
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Response} - Respuesta con las inversiones del proyecto
   */
  async getProjectInvestments(req, res) {
    try {
      const { projectId } = req.params;
      const { status, page, limit } = req.query;

      const options = {
        status,
        page: page ? parseInt(page, 10) : 1,
        limit: limit ? parseInt(limit, 10) : 10
      };

      const result = await this.investmentService.getProjectInvestments(projectId, options);

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error en InvestmentController.getProjectInvestments:', error);
      return res.status(500).json({ 
        message: 'Error al obtener inversiones del proyecto',
        error: error.message 
      });
    }
  }

  /**
   * Obtiene el detalle de una inversión específica.
   * @param {Request} req - Objeto de solicitud Express
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Response} - Respuesta con el detalle de la inversión
   */
  async getInvestmentById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      const investment = await this.investmentService.getInvestmentById(id);

      if (!investment) {
        return res.status(404).json({ message: 'Inversión no encontrada' });
      }

      // Verificar permisos: solo el propio usuario o gestores/admin pueden ver
      if (investment.userId !== userId && userRole !== 'manager' && userRole !== 'admin') {
        return res.status(403).json({ message: 'No tienes permiso para ver esta inversión' });
      }

      return res.status(200).json({
        data: investment
      });
    } catch (error) {
      console.error('Error en InvestmentController.getInvestmentById:', error);
      return res.status(500).json({ 
        message: 'Error al obtener detalle de la inversión',
        error: error.message 
      });
    }
  }

  /**
   * Cancela una inversión pendiente.
   * Solo el usuario que realizó la inversión puede cancelarla.
   * @param {Request} req - Objeto de solicitud Express
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Response} - Respuesta con la inversión cancelada
   */
  async cancelInvestment(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const cancelledInvestment = await this.investmentService.cancelInvestment(id, userId);

      return res.status(200).json({
        message: 'Inversión cancelada con éxito',
        data: cancelledInvestment
      });
    } catch (error) {
      console.error('Error en InvestmentController.cancelInvestment:', error);
      
      // Manejo específico de errores conocidos
      if (error.message.includes('no encontrada') || 
          error.message.includes('no pertenece al usuario') ||
          error.message.includes('Solo se pueden cancelar')) {
        return res.status(400).json({ message: error.message });
      }
      
      return res.status(500).json({ 
        message: 'Error al cancelar la inversión',
        error: error.message 
      });
    }
  }

  /**
   * Actualiza el estado de una inversión (solo gestores/admin).
   * @param {Request} req - Objeto de solicitud Express
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Response} - Respuesta con la inversión actualizada
   */
  async updateInvestmentStatus(req, res) {
    try {
      // Verificar errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { status, contractReference } = req.body;

      // Esta operación solo debe ser accesible para gestores/admin (verificado en middleware)
      const updatedInvestment = await this.investmentService.updateInvestmentStatus(id, status, contractReference);

      return res.status(200).json({
        message: 'Estado de inversión actualizado con éxito',
        data: updatedInvestment
      });
    } catch (error) {
      console.error('Error en InvestmentController.updateInvestmentStatus:', error);
      
      // Manejo específico de errores conocidos
      if (error.message.includes('no encontrada') || 
          error.message.includes('Estado de inversión no válido')) {
        return res.status(400).json({ message: error.message });
      }
      
      return res.status(500).json({ 
        message: 'Error al actualizar estado de la inversión',
        error: error.message 
      });
    }
  }
}

module.exports = new InvestmentController(); 