import { apiClient } from './authService';

/**
 * Normaliza un objeto de inversión para asegurar consistencia
 * @param {Object} investment - Inversión a normalizar
 * @returns {Object} - Inversión normalizada
 */
const normalizeInvestment = (investment) => {
  if (!investment) return null;
  
  return {
    id: investment.id || '',
    amount: parseFloat(investment.amount || 0),
    status: investment.status || 'pending',
    investedAt: investment.investedAt || investment.created_at || new Date().toISOString(),
    contractReference: investment.contractReference || investment.contract_reference || '',
    notes: investment.notes || '',
    user: investment.user ? {
      id: investment.user.id || '',
      firstName: investment.user.firstName || investment.user.first_name || '',
      lastName: investment.user.lastName || investment.user.last_name || '',
      email: investment.user.email || ''
    } : null,
    project: investment.project ? {
      id: investment.project.id || '',
      title: investment.project.title || ''
    } : null
  };
};

/**
 * Normaliza la respuesta de la API para manejar diferentes formatos
 * @param {Object|Array} response - Respuesta de la API
 * @returns {Object} - Respuesta normalizada con formato { data: [], pagination: {} }
 */
const normalizeResponse = (response) => {
  if (!response) {
    return { data: [], pagination: { page: 1, totalPages: 1, totalItems: 0 } };
  }
  
  // Si la respuesta ya es un array, normalizamos cada inversión
  if (Array.isArray(response)) {
    return {
      data: response.map(item => normalizeInvestment(item)),
      pagination: { page: 1, totalPages: 1, totalItems: response.length }
    };
  }
  
  // Si la respuesta tiene un campo data que es un array
  if (response.data && Array.isArray(response.data)) {
    return {
      data: response.data.map(item => normalizeInvestment(item)),
      pagination: response.pagination || { page: 1, totalPages: 1, totalItems: response.data.length }
    };
  }
  
  // Si la respuesta es un objeto pero no tiene un campo data que sea array
  // Intentamos adaptar la estructura a nuestro formato esperado
  console.warn('Formato de respuesta inesperado en InvestmentService:', response);
  
  let investmentsData = [];
  
  // Buscar cualquier campo que podría ser un array de inversiones
  Object.keys(response).forEach(key => {
    if (Array.isArray(response[key])) {
      investmentsData = response[key];
    }
  });
  
  return {
    data: investmentsData.map(item => normalizeInvestment(item)),
    pagination: { page: 1, totalPages: 1, totalItems: investmentsData.length }
  };
};

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
      console.log(`Creando inversión en proyecto ${projectId}:`, investmentData);
      
      const response = await apiClient.post(
        `/projects/${projectId}/invest`,
        investmentData
      );
      
      console.log('Respuesta de creación de inversión:', response.data);
      
      // Normalizar la inversión creada
      const normalizedInvestment = normalizeInvestment(response.data.data || response.data);
      
      return {
        data: normalizedInvestment,
        message: response.data.message || 'Inversión creada con éxito'
      };
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
      console.log('Obteniendo inversiones del usuario con opciones:', options);
      
      const queryParams = new URLSearchParams();
      
      if (options.status) queryParams.append('status', options.status);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await apiClient.get(`/users/me/investments${query}`);
      
      console.log('Respuesta de inversiones del usuario:', response.data);
      
      // Normalizar la respuesta
      return normalizeResponse(response.data);
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
      console.log(`Obteniendo inversiones del proyecto ${projectId} con opciones:`, options);
      
      const queryParams = new URLSearchParams();
      
      if (options.status) queryParams.append('status', options.status);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const url = `/projects/${projectId}/investments${query}`;
      
      console.log('URL de petición:', url);
      const response = await apiClient.get(url);
      
      console.log('Respuesta completa:', response);
      console.log('Datos de inversiones del proyecto:', response.data);
      
      // Normalizar la respuesta
      return normalizeResponse(response.data);
    } catch (error) {
      console.error(`Error al obtener inversiones del proyecto ${projectId}:`, error);
      if (error.response) {
        console.error('Estado HTTP:', error.response.status);
        console.error('Datos de error:', error.response.data);
      }
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene todas las inversiones (solo administradores)
   * @param {Object} options - Opciones de filtro
   * @param {string} [options.status] - Filtrar por estado
   * @param {number} [options.page=1] - Página para paginación
   * @param {number} [options.limit=10] - Límite por página
   * @returns {Promise<Object>} - Lista paginada de inversiones
   */
  async getAllInvestments(options = {}) {
    try {
      console.log('Obteniendo todas las inversiones con opciones:', options);
      
      const queryParams = new URLSearchParams();
      
      if (options.status) queryParams.append('status', options.status);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const url = `/investments${query}`;
      
      console.log('URL de petición:', url);
      const response = await apiClient.get(url);
      
      console.log('Respuesta completa:', response);
      console.log('Datos de todas las inversiones:', response.data);
      
      // Normalizar la respuesta
      return normalizeResponse(response.data);
    } catch (error) {
      console.error('Error al obtener todas las inversiones:', error);
      if (error.response) {
        console.error('Estado HTTP:', error.response.status);
        console.error('Datos de error:', error.response.data);
      }
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
      console.log(`Obteniendo detalle de inversión ${investmentId}`);
      
      const response = await apiClient.get(`/investments/${investmentId}`);
      
      console.log('Respuesta de detalle de inversión:', response.data);
      
      // Normalizar la inversión
      return {
        data: normalizeInvestment(response.data.data || response.data)
      };
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
      console.log(`Cancelando inversión ${investmentId}`);
      
      const response = await apiClient.delete(`/investments/${investmentId}`);
      
      console.log('Respuesta de cancelación de inversión:', response.data);
      
      return {
        data: normalizeInvestment(response.data.data || response.data),
        message: response.data.message || 'Inversión cancelada con éxito'
      };
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
      console.log(`Actualizando estado de inversión ${investmentId} a:`, statusData);
      
      const response = await apiClient.patch(
        `/investments/${investmentId}/status`,
        statusData
      );
      
      console.log('Respuesta de actualización de estado:', response.data);
      
      return {
        data: normalizeInvestment(response.data.data || response.data),
        message: response.data.message || 'Estado de inversión actualizado con éxito'
      };
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