import axios from 'axios';
import { getAuthToken } from './authService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

/**
 * Convertir claves en snake_case a camelCase para compatibilidad con el backend
 * @param {Object} data - Datos en formato snake_case
 * @returns {Object} - Datos convertidos a camelCase
 */
const snakeToCamel = (data) => {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => snakeToCamel(item));
  }

  return Object.keys(data).reduce((result, key) => {
    // Convertir snake_case a camelCase
    const camelKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
    
    // Aplicar recursivamente a objetos anidados
    result[camelKey] = snakeToCamel(data[key]);
    return result;
  }, {});
};

/**
 * Convertir claves en camelCase a snake_case para mostrar en la UI
 * @param {Object} data - Datos en formato camelCase
 * @returns {Object} - Datos convertidos a snake_case
 */
const camelToSnake = (data) => {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => camelToSnake(item));
  }

  return Object.keys(data).reduce((result, key) => {
    // Convertir camelCase a snake_case
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    
    // Aplicar recursivamente a objetos anidados
    result[snakeKey] = camelToSnake(data[key]);
    return result;
  }, {});
};

/**
 * Servicio para gestionar proyectos de inversión
 */
const projectService = {
  /**
   * Obtiene todos los proyectos con opciones de filtrado
   * @param {Object} options Opciones de filtrado
   * @param {string} options.status Filtro por estado (draft, published, closed)
   * @param {number} options.page Número de página
   * @param {number} options.limit Número de elementos por página
   * @returns {Promise<Object>} Proyectos y metadata de paginación
   */
  async getProjects(options = {}) {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No autenticado');
      }

      // Construir query params
      const queryParams = new URLSearchParams();
      // Convertir snake_case a camelCase en parámetros de consulta
      if (options.status) queryParams.append('status', options.status);
      if (options.property_type) queryParams.append('propertyType', options.property_type);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      
      const response = await axios.get(`${API_URL}/projects${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Convertir respuesta de camelCase a snake_case para frontend
      const responseData = {
        data: camelToSnake(response.data.data),
        pagination: response.data.pagination
      };
      
      return responseData;
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      throw error;
    }
  },
  
  /**
   * Obtiene un proyecto por su ID
   * @param {string} id ID del proyecto
   * @returns {Promise<Object>} Datos del proyecto
   */
  async getProjectById(id) {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No autenticado');
      }
      
      const response = await axios.get(`${API_URL}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Convertir respuesta de camelCase a snake_case para frontend
      return camelToSnake(response.data);
    } catch (error) {
      console.error(`Error al obtener proyecto con ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Crea un nuevo proyecto
   * @param {Object} projectData Datos del proyecto
   * @returns {Promise<Object>} Proyecto creado
   */
  async createProject(projectData) {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No autenticado');
      }
      
      // Asegurar que los datos estén en camelCase para el backend
      // También asegurar que se incluya targetAmount si no está definido 
      // (podría calcularse como 6x minimumInvestment por defecto)
      const camelCaseData = snakeToCamel(projectData);
      
      // Si no se proporciona targetAmount, calcularlo como 6 veces minimumInvestment (valor razonable por defecto)
      if (!camelCaseData.targetAmount && camelCaseData.minimumInvestment) {
        camelCaseData.targetAmount = camelCaseData.minimumInvestment * 6;
      }
      
      const response = await axios.post(`${API_URL}/projects`, camelCaseData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      
      // Convertir respuesta de camelCase a snake_case para frontend
      return camelToSnake(response.data);
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      throw error;
    }
  },
  
  /**
   * Actualiza un proyecto existente
   * @param {string} id ID del proyecto
   * @param {Object} projectData Datos actualizados del proyecto
   * @returns {Promise<Object>} Proyecto actualizado
   */
  async updateProject(id, projectData) {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No autenticado');
      }
      
      // Convertir a camelCase para el backend
      const camelCaseData = snakeToCamel(projectData);
      
      const response = await axios.put(`${API_URL}/projects/${id}`, camelCaseData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      
      // Convertir respuesta de camelCase a snake_case para frontend
      return camelToSnake(response.data);
    } catch (error) {
      console.error(`Error al actualizar proyecto con ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Publica un proyecto
   * @param {string} id ID del proyecto
   * @returns {Promise<Object>} Proyecto publicado
   */
  async publishProject(id) {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No autenticado');
      }
      
      const response = await axios.post(`${API_URL}/projects/${id}/publish`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Convertir respuesta de camelCase a snake_case para frontend
      return camelToSnake(response.data);
    } catch (error) {
      console.error(`Error al publicar proyecto con ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Elimina un proyecto
   * @param {string} id ID del proyecto
   * @returns {Promise<void>}
   */
  async deleteProject(id) {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No autenticado');
      }
      
      await axios.delete(`${API_URL}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(`Error al eliminar proyecto con ID ${id}:`, error);
      throw error;
    }
  }
};

export default projectService; 