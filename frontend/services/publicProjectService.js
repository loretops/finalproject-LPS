import axios from 'axios';
import { apiClient } from './authService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

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
 * Normaliza un proyecto para asegurar que tenga todos los campos necesarios
 * @param {Object} project - Proyecto a normalizar
 * @returns {Object} - Proyecto normalizado
 */
const normalizeProject = (project) => {
  if (!project) return {};
  
  return {
    id: project.id || '',
    title: project.title || '',
    description: project.description || '',
    minimum_investment: project.minimum_investment || 0,
    target_amount: project.target_amount || 0,
    expected_roi: project.expected_roi || 0,
    status: project.status || 'published',
    created_at: project.created_at || new Date().toISOString(),
    published_at: project.published_at || null,
    property_type: project.property_type || 'residential',
    location: project.location || '',
    documents: project.documents || []
  };
};

/**
 * Servicio para gestionar proyectos públicos de inversión (para socios)
 */
const publicProjectService = {
  /**
   * Obtiene todos los proyectos publicados con opciones de filtrado
   * @param {Object} options Opciones de filtrado
   * @param {string} options.property_type Filtro por tipo de propiedad (residential, commercial, industrial)
   * @param {number} options.min_roi Filtro por ROI mínimo
   * @param {string} options.location Filtro por ubicación
   * @param {number} options.page Número de página
   * @param {number} options.limit Número de elementos por página
   * @param {string} options.sort_field Campo por el que ordenar
   * @param {string} options.sort_direction Dirección de ordenación (asc, desc)
   * @returns {Promise<Object>} Proyectos publicados y metadata de paginación
   */
  async getPublishedProjects(options = {}) {
    try {
      // Construir query params
      const queryParams = new URLSearchParams();
      
      // Pasar parámetros en formato que espera la API
      if (options.property_type) queryParams.append('propertyType', options.property_type);
      if (options.min_roi) queryParams.append('minRoi', options.min_roi);
      if (options.location) queryParams.append('location', options.location);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      if (options.sort_field) queryParams.append('sortField', options.sort_field);
      if (options.sort_direction) queryParams.append('sortDirection', options.sort_direction);
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      
      console.log('🔍 Consultando API pública en:', `${API_URL}/projects/public${queryString}`);
      
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.get(`/projects/public${queryString}`);
      
      // Normalizar datos para el frontend
      const responseData = {
        data: Array.isArray(response.data.data) 
          ? response.data.data.map(project => normalizeProject(camelToSnake(project)))
          : [],
        pagination: response.data.pagination || {
          page: 1,
          totalPages: 1,
          totalItems: 0,
        }
      };
      
      return responseData;
    } catch (error) {
      console.error('❌ Error al obtener proyectos publicados:', error);
      if (error.response) {
        console.error('Detalles de la respuesta:', error.response.data);
        console.error('Estado HTTP:', error.response.status);
      }
      
      // Devolver objeto vacío pero con estructura válida
      return {
        data: [],
        pagination: {
          page: 1,
          totalPages: 1,
          totalItems: 0,
        }
      };
    }
  },
  
  /**
   * Obtiene un proyecto publicado específico por su ID
   * @param {string} id ID del proyecto
   * @returns {Promise<Object>} Datos del proyecto con sus documentos asociados
   */
  async getPublishedProjectById(id) {
    try {
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.get(`/projects/public/${id}`);
      
      // Normalizar el proyecto antes de devolverlo
      return normalizeProject(camelToSnake(response.data));
    } catch (error) {
      console.error(`Error al obtener proyecto público con ID ${id}:`, error);
      
      if (error.response) {
        // Si el error es 404, indicar que el proyecto no fue encontrado
        if (error.response.status === 404) {
          throw new Error('El proyecto no existe o ha sido eliminado');
        }
        
        // Si el error es 403, indicar que no tiene permisos
        if (error.response.status === 403) {
          throw new Error('No tienes permisos para ver este proyecto');
        }
        
        // Otros errores
        if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      
      // Error genérico
      throw new Error('No se pudo obtener el proyecto. Intente más tarde.');
    }
  },
  
  /**
   * Registra el interés de un socio en un proyecto publicado
   * @param {string} projectId ID del proyecto
   * @returns {Promise<Object>} Confirmación del registro de interés
   */
  async registerInterest(projectId) {
    try {
      // Esta función es un placeholder para la implementación futura
      // cuando se desarrolle el ticket correspondiente
      
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.post(`/projects/public/${projectId}/interest`);
      
      return response.data;
    } catch (error) {
      console.error(`Error al registrar interés en proyecto ${projectId}:`, error);
      throw error;
    }
  }
};

export default publicProjectService; 