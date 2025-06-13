const InvestmentService = require('../../../application/services/investmentService');
const SimpleInvestmentService = require('../../../application/services/investmentService.simple');
const { validationResult } = require('express-validator');

/**
 * Controlador para gestionar las operaciones relacionadas con inversiones.
 */
class InvestmentController {
  constructor() {
    this.investmentService = new InvestmentService();
    this.simpleInvestmentService = new SimpleInvestmentService();
    
    // Vincular métodos al contexto correcto
    this.investInProject = this.investInProject.bind(this);
    this.getUserInvestments = this.getUserInvestments.bind(this);
    this.getProjectInvestments = this.getProjectInvestments.bind(this);
    this.getInvestmentById = this.getInvestmentById.bind(this);
    this.cancelInvestment = this.cancelInvestment.bind(this);
    this.updateInvestmentStatus = this.updateInvestmentStatus.bind(this);
    this.getAllInvestments = this.getAllInvestments.bind(this);
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

      // Crear la inversión usando el servicio simplificado temporalmente
      console.log('🔄 Usando servicio simplificado para crear inversión...');
      const investment = await this.simpleInvestmentService.createInvestment({
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
   * Obtiene todas las inversiones en la plataforma.
   * Solo accesible para gestores y administradores.
   * @param {Request} req - Objeto de solicitud Express
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Response} - Respuesta con todas las inversiones
   */
  async getAllInvestments(req, res) {
    try {
      console.log('Obteniendo todas las inversiones');
      
      const { status, page, limit, projectId } = req.query;

      const options = {
        status,
        projectId,
        page: page ? parseInt(page, 10) : 1,
        limit: limit ? parseInt(limit, 10) : 50
      };

      console.log('Opciones de filtrado:', options);

      const result = await this.investmentService.getAllInvestments(options);

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error en InvestmentController.getAllInvestments:', error);
      return res.status(500).json({ 
        message: 'Error al obtener todas las inversiones',
        error: error.message 
      });
    }
  }

  /**
   * Obtiene el detalle de una inversión específica.
   * Los usuarios solo pueden ver sus propias inversiones.
   * Gestores y administradores pueden ver cualquier inversión.
   * @param {Request} req - Objeto de solicitud Express
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Response} - Respuesta con el detalle de la inversión
   */
  async getInvestmentById(req, res) {
    try {
      const { investmentId } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      // Verificar acceso
      const investment = await this.investmentService.getInvestmentById(investmentId);
      
      // Si no es gestor o admin, verificar que la inversión pertenezca al usuario
      if (!['manager', 'admin'].includes(userRole) && investment.userId !== userId) {
        return res.status(403).json({ 
          message: 'No tienes permiso para ver esta inversión' 
        });
      }

      return res.status(200).json({
        data: investment
      });
    } catch (error) {
      console.error('Error en InvestmentController.getInvestmentById:', error);
      
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({ message: error.message });
      }
      
      return res.status(500).json({ 
        message: 'Error al obtener detalle de la inversión',
        error: error.message 
      });
    }
  }

  /**
   * Cancela una inversión pendiente.
   * Los usuarios solo pueden cancelar sus propias inversiones pendientes.
   * @param {Request} req - Objeto de solicitud Express
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Response} - Respuesta con la inversión cancelada
   */
  async cancelInvestment(req, res) {
    try {
      const { investmentId } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      // Verificar que la inversión exista y pertenezca al usuario (o sea admin/gestor)
      const investment = await this.investmentService.getInvestmentById(investmentId);
      
      // Si no es gestor o admin, verificar que la inversión pertenezca al usuario
      if (!['manager', 'admin'].includes(userRole) && investment.userId !== userId) {
        return res.status(403).json({ 
          message: 'No tienes permiso para cancelar esta inversión' 
        });
      }

      // Verificar que la inversión esté en estado pendiente
      if (investment.status !== 'pending') {
        return res.status(400).json({ 
          message: 'Solo se pueden cancelar inversiones en estado pendiente' 
        });
      }

      const cancelledInvestment = await this.investmentService.cancelInvestment(investmentId, userId);

      return res.status(200).json({
        message: 'Inversión cancelada con éxito',
        data: cancelledInvestment
      });
    } catch (error) {
      console.error('Error en InvestmentController.cancelInvestment:', error);
      
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({ message: error.message });
      }
      
      return res.status(500).json({ 
        message: 'Error al cancelar la inversión',
        error: error.message 
      });
    }
  }

  /**
   * Actualiza el estado de una inversión.
   * Solo accesible para gestores y administradores.
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

      const { investmentId } = req.params;
      const { status, contractReference, notes } = req.body;

      const updatedInvestment = await this.investmentService.updateInvestmentStatus(
        investmentId, 
        { status, contractReference, notes }
      );

      return res.status(200).json({
        message: 'Estado de inversión actualizado con éxito',
        data: updatedInvestment
      });
    } catch (error) {
      console.error('Error en InvestmentController.updateInvestmentStatus:', error);
      
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({ message: error.message });
      }
      
      return res.status(500).json({ 
        message: 'Error al actualizar el estado de la inversión',
        error: error.message 
      });
    }
  }
}

module.exports = new InvestmentController(); 