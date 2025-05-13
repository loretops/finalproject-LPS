import { apiClient } from './authService';

/**
 * Servicio para gestionar intereses de socios en proyectos
 */
const interestService = {
  /**
   * Registra un nuevo interés en un proyecto
   * @param {string} projectId - ID del proyecto en el que se muestra interés
   * @param {string} [notes] - Notas opcionales sobre el interés
   * @returns {Promise<Object>} Información del interés registrado
   */
  async registerInterest(projectId, notes = null) {
    try {
      const response = await apiClient.post('/interests', {
        projectId,
        notes
      });
      return response.data;
    } catch (error) {
      console.error('Error al registrar interés:', error);
      throw error;
    }
  },

  /**
   * Obtiene los intereses del usuario autenticado
   * @param {Object} options - Opciones de filtrado y paginación
   * @param {string} [options.status] - Filtrar por estado (active, converted, declined)
   * @param {number} [options.page=1] - Número de página
   * @param {number} [options.limit=10] - Número de elementos por página
   * @returns {Promise<Array<Object>>} Lista de intereses del usuario con información de proyectos
   */
  async getUserInterests(options = {}) {
    try {
      const { status, page = 1, limit = 10 } = options;
      
      const queryParams = new URLSearchParams();
      if (status) queryParams.append('status', status);
      queryParams.append('page', page);
      queryParams.append('limit', limit);
      
      const response = await apiClient.get(`/interests/user?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener intereses del usuario:', error);
      throw error;
    }
  },

  /**
   * Obtiene los intereses registrados en un proyecto específico (solo para gestores)
   * @param {string} projectId - ID del proyecto
   * @param {Object} options - Opciones de filtrado y paginación
   * @param {string} [options.status] - Filtrar por estado (active, converted, declined)
   * @param {number} [options.page=1] - Número de página
   * @param {number} [options.limit=10] - Número de elementos por página  
   * @returns {Promise<Array<Object>>} Lista de intereses en el proyecto con información de usuarios
   */
  async getProjectInterests(projectId, options = {}) {
    try {
      const { status, page = 1, limit = 10 } = options;
      
      const queryParams = new URLSearchParams();
      if (status) queryParams.append('status', status);
      queryParams.append('page', page);
      queryParams.append('limit', limit);
      
      const response = await apiClient.get(`/interests/project/${projectId}?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener intereses del proyecto ${projectId}:`, error);
      throw error;
    }
  },

  /**
   * Elimina un interés existente
   * @param {string} interestId - ID del interés a eliminar
   * @returns {Promise<void>}
   */
  async removeInterest(interestId) {
    try {
      await apiClient.delete(`/interests/${interestId}`);
    } catch (error) {
      console.error(`Error al eliminar interés ${interestId}:`, error);
      throw error;
    }
  },

  /**
   * Verifica si el usuario actual tiene interés en un proyecto específico
   * @param {string} projectId - ID del proyecto a verificar
   * @returns {Promise<boolean>} Verdadero si el usuario tiene interés activo
   */
  async checkUserInterest(projectId) {
    try {
      // Obtenemos los intereses del usuario y filtramos por el proyecto específico
      const interests = await this.getUserInterests({ status: 'active' });
      return interests.some(interest => interest.project?.id === projectId);
    } catch (error) {
      console.error(`Error al verificar interés en proyecto ${projectId}:`, error);
      // Si hay un error, devolvemos false para no bloquear la UI
      return false;
    }
  },

  /**
   * Obtiene un mapa de IDs de proyectos en los que el usuario tiene interés
   * Útil para marcar múltiples proyectos en un listado
   * @returns {Promise<Set<string>>} Conjunto con los IDs de proyectos con interés
   */
  async getUserInterestProjectIds() {
    try {
      const interests = await this.getUserInterests({ status: 'active' });
      return new Set(
        interests
          .filter(interest => interest.project)
          .map(interest => interest.project.id)
      );
    } catch (error) {
      console.error('Error al obtener mapa de intereses:', error);
      // Si hay un error, devolvemos un conjunto vacío para no bloquear la UI
      return new Set();
    }
  }
};

export default interestService; 