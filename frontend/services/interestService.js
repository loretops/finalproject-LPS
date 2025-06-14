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
    // Verificación previa del ID del proyecto
    if (!projectId) {
      console.error('registerInterest: Se intentó registrar interés con un projectId nulo o vacío');
      throw new Error('ID de proyecto no válido');
    }

    try {
      console.log(`Intentando registrar interés en proyecto: ${projectId}`);
      
      const response = await apiClient.post('/interests', {
        projectId,
        notes
      });
      
      console.log('Interés registrado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      // Si el error es de tipo 409 (Conflict), proporcionar un mensaje más descriptivo
      if (error.response && error.response.status === 409) {
        console.log('Ya has mostrado interés en este proyecto anteriormente');
      } else if (error.response && error.response.status === 500) {
        // Para errores del servidor, intentar extraer información detallada
        console.error('Error 500 del servidor al registrar interés:', {
          projectId,
          errorDetail: error.response?.data,
          statusText: error.response?.statusText
        });
      } else {
        console.error('Error al registrar interés:', error);
      }
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
      
      // Log para depuración
      console.log('DATOS DE INTERESES SIN PROCESAR:', JSON.stringify(response.data, null, 2));
      
      // Procesar y normalizar los datos antes de devolverlos
      if (Array.isArray(response.data)) {
        return response.data.map(interest => {
          // Si el interés tiene un proyecto asociado, normalizar sus valores monetarios
          if (interest.project) {
            // Normalizar los valores monetarios asegurando que sean números
            const project = {
              ...interest.project,
              targetAmount: parseFloat(interest.project.targetAmount || 0),
              currentAmount: parseFloat(interest.project.currentAmount || 0),
              minimumInvestment: parseFloat(interest.project.minimumInvestment || 0),
              expectedRoi: parseFloat(interest.project.expectedRoi || 0)
            };
            
            console.log('Interés normalizado:', {
              id: interest.id,
              projectId: project.id,
              monetaryValues: {
                targetAmount: project.targetAmount,
                currentAmount: project.currentAmount,
                minimumInvestment: project.minimumInvestment
              }
            });
            
            return {
              ...interest,
              project
            };
          }
          return interest;
        });
      }
      
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
    if (!projectId) {
      console.warn('checkUserInterest: Se proporcionó un projectId inválido');
      return false;
    }
    
    try {
      // Obtenemos los intereses del usuario y filtramos por el proyecto específico
      const interests = await this.getUserInterests({ status: 'active' });
      
      if (!Array.isArray(interests)) {
        console.warn('checkUserInterest: La respuesta no es un array válido');
        return false;
      }
      
      // Comprobamos si existe algún interés en este proyecto específico
      const hasInterest = interests.some(interest => 
        interest && interest.project && interest.project.id === projectId
      );
      
      return hasInterest;
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