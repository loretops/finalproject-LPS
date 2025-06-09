import axios from 'axios';
import { apiClient } from './authService';
import interestService from './interestService';

// Usar la variable NEXT_PUBLIC_API_URL que ya debe venir configurada desde next.config.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Control de frecuencia para evitar llamadas excesivas
let lastRequestTime = 0;
const REQUEST_THROTTLE_MS = 2000; // Mínimo 2 segundos entre solicitudes
const MAX_RETRIES = 2; // Máximo número de reintentos

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
  
  // Asegurarnos de que el ID sea un string
  const projectId = project.id ? String(project.id).trim() : '';
  
  // Extraer la primera imagen del proyecto si existe
  let image_url = '';
  if (project.documents && Array.isArray(project.documents)) {
    // Buscar documentos de tipo imagen
    const imageDoc = project.documents.find(doc => 
      doc.document_type === 'image' || 
      (doc.file_type && doc.file_type.startsWith('image/')) ||
      (doc.file_url && /\.(jpe?g|png|gif|webp|svg)$/i.test(doc.file_url))
    );
    
    if (imageDoc && imageDoc.file_url) {
      image_url = imageDoc.file_url;
    }
  }
  
  return {
    id: projectId,
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
    documents: project.documents || [],
    image_url: image_url
  };
};

/**
 * Control de frecuencia para peticiones
 * @returns {Promise<boolean>} Promesa que se resuelve cuando se puede hacer la petición
 */
const throttleRequest = () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < REQUEST_THROTTLE_MS) {
    const waitTime = REQUEST_THROTTLE_MS - timeSinceLastRequest;
    return new Promise(resolve => setTimeout(() => {
      lastRequestTime = Date.now();
      resolve(true);
    }, waitTime));
  }
  
  lastRequestTime = now;
  return Promise.resolve(true);
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
  async getPublishedProjects(options = {}, retryCount = 0) {
    // Aplicar control de frecuencia
    await throttleRequest();
    
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
      
      // Configuración con timeout para evitar solicitudes colgadas
      const config = {
        timeout: 10000 // 10 segundos de timeout
      };
      
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.get(`/projects/public${queryString}`, config);
      
      // Normalizar datos para el frontend, asegurando que los IDs sean strings
      const responseData = {
        data: Array.isArray(response.data.data) 
          ? response.data.data.map(project => {
              // Asegurar que el ID sea un string
              if (project && project.id) {
                project.id = String(project.id);
              }
              return normalizeProject(camelToSnake(project));
            })
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
      
      // Reintentar si no hemos excedido el máximo de intentos y es un error de red
      if (retryCount < MAX_RETRIES && (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED')) {
        console.log(`🔄 Reintentando petición... (${retryCount + 1}/${MAX_RETRIES})`);
        // Exponential backoff: 2s, 4s, 8s...
        const backoffTime = 2000 * Math.pow(2, retryCount);
        
        await new Promise(resolve => setTimeout(resolve, backoffTime));
        return this.getPublishedProjects(options, retryCount + 1);
      }
      
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
    // Aplicar control de frecuencia
    await throttleRequest();
    
    // Validar y normalizar el ID
    if (!id) throw new Error('Se requiere un ID de proyecto válido');
    
    // Asegurar que el ID es una cadena de texto y eliminar espacios
    const sanitizedId = String(id).trim();
    
    console.log('publicProjectService - Fetching project with ID:', sanitizedId);
    
    try {
      // Codificar el ID para la URL
      const encodedId = encodeURIComponent(sanitizedId);
      
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.get(`/projects/public/${encodedId}`, {
        timeout: 10000 // 10 segundos de timeout
      });
      
      // Asegurarnos de que el proyecto tenga un ID como string
      if (response.data && response.data.id) {
        response.data.id = String(response.data.id);
      }
      
      // Normalizar el proyecto antes de devolverlo
      const normalizedProject = normalizeProject(camelToSnake(response.data));
      console.log('publicProjectService - Normalized project:', normalizedProject);
      return normalizedProject;
    } catch (error) {
      console.error(`Error al obtener proyecto público con ID ${sanitizedId}:`, error);
      
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
   * @param {string} [notes] Notas opcionales sobre el interés
   * @returns {Promise<Object>} Confirmación del registro de interés
   */
  async registerInterest(projectId, notes = null) {
    try {
      // Asegurar que el ID sea una cadena
      const sanitizedId = String(projectId).trim();
      
      // Utilizamos el servicio especializado de intereses
      return await interestService.registerInterest(sanitizedId, notes);
    } catch (error) {
      console.error(`Error al registrar interés en proyecto ${projectId}:`, error);
      throw error;
    }
  }
};

export default publicProjectService; 