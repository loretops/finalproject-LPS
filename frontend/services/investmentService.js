import { apiClient } from '../utils/apiClient';

/**
 * Servicio para manejar operaciones relacionadas con inversiones
 */
class InvestmentService {
  /**
   * Crea una nueva inversión en un proyecto
   * @param {string} projectId - ID del proyecto en el que se invierte
   * @param {Object} investmentData - Datos de la inversión
   * @param {number} investmentData.amount - Monto a invertir
   * @param {string} [investmentData.notes] - Notas opcionales
   * @returns {Promise<Object>} - Inversión creada
   */
  async createInvestment(projectId, investmentData) {
    try {
      const response = await apiClient.post(
        `/projects/${projectId}/invest`,
        investmentData
      );
      return response.data;
    } catch (error) {
      console.error('Error al crear inversión:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene las inversiones realizadas por el usuario actual
   * @param {Object} options - Opciones de filtro
   * @param {string} [options.status] - Filtrar por estado
   * @param {number} [options.page=1] - Página para paginación
   * @param {number} [options.limit=10] - Límite por página
   * @returns {Promise<Object>} - Lista paginada de inversiones
   */
  async getUserInvestments(options = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (options.status) queryParams.append('status', options.status);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await apiClient.get(`/users/me/investments${query}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener inversiones del usuario:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene las inversiones de un proyecto específico (solo gestores)
   * @param {string} projectId - ID del proyecto
   * @param {Object} options - Opciones de filtro
   * @param {string} [options.status] - Filtrar por estado
   * @param {number} [options.page=1] - Página para paginación
   * @param {number} [options.limit=10] - Límite por página
   * @returns {Promise<Object>} - Lista paginada de inversiones
   */
  async getProjectInvestments(projectId, options = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (options.status) queryParams.append('status', options.status);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await apiClient.get(`/projects/${projectId}/investments${query}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener inversiones del proyecto:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene el detalle de una inversión específica
   * @param {string} investmentId - ID de la inversión
   * @returns {Promise<Object>} - Detalles de la inversión
   */
  async getInvestmentById(investmentId) {
    try {
      const response = await apiClient.get(`/investments/${investmentId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener detalle de inversión:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Cancela una inversión pendiente
   * @param {string} investmentId - ID de la inversión
   * @returns {Promise<Object>} - Inversión cancelada
   */
  async cancelInvestment(investmentId) {
    try {
      const response = await apiClient.delete(`/investments/${investmentId}`);
      return response.data;
    } catch (error) {
      console.error('Error al cancelar inversión:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Actualiza el estado de una inversión (solo gestores)
   * @param {string} investmentId - ID de la inversión
   * @param {Object} statusData - Datos de actualización
   * @param {string} statusData.status - Nuevo estado
   * @param {string} [statusData.contractReference] - Referencia de contrato
   * @returns {Promise<Object>} - Inversión actualizada
   */
  async updateInvestmentStatus(investmentId, statusData) {
    try {
      const response = await apiClient.patch(
        `/investments/${investmentId}/status`,
        statusData
      );
      return response.data;
    } catch (error) {
      console.error('Error al actualizar estado de inversión:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Maneja errores de la API
   * @param {Error} error - Error capturado
   * @returns {Error} - Error procesado
   * @private
   */
  handleError(error) {
    if (error.response) {
      // El servidor respondió con un código de error
      const message = 
        error.response.data.message || 
        error.response.data.error || 
        'Ocurrió un error con tu solicitud';
      
      const formattedError = new Error(message);
      formattedError.status = error.response.status;
      formattedError.data = error.response.data;
      return formattedError;
    }
    
    if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      return new Error('No se recibió respuesta del servidor. Por favor, verifica tu conexión.');
    }
    
    // Error al configurar la solicitud
    return error;
  }
}

// Exportar una instancia única del servicio
export default new InvestmentService(); 