import { apiClient } from './authService';

/**
 * Servicio para obtener estadísticas del dashboard
 */
const dashboardService = {
  /**
   * Obtiene las estadísticas principales del dashboard
   * @returns {Promise<Object>} Estadísticas del dashboard
   */
  async getDashboardStats() {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas del dashboard:', error);
      
      // Devolver datos por defecto en caso de error
      return {
        activePartners: 0,
        activeProjects: 0,
        totalInvested: 0,
        totalInvestments: 0,
        error: true
      };
    }
  },

  /**
   * Obtiene estadísticas específicas para gestores
   * @returns {Promise<Object>} Estadísticas adicionales para gestores
   */
  async getManagerStats() {
    try {
      const response = await apiClient.get('/dashboard/manager-stats');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas de gestor:', error);
      
      // Devolver datos por defecto en caso de error
      return {
        totalUsers: 0,
        pendingInvitations: 0,
        pendingInvestments: 0,
        error: true
      };
    }
  },

  /**
   * Obtiene estadísticas específicas para socios/inversores
   * @returns {Promise<Object>} Estadísticas para usuarios normales
   */
  async getUserStats() {
    try {
      const response = await apiClient.get('/dashboard/user-stats');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas de usuario:', error);
      
      // Devolver datos por defecto en caso de error
      return {
        myInterests: 0,
        myInvestments: 0,
        totalInvested: 0,
        error: true
      };
    }
  }
};

export default dashboardService; 