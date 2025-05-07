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
    status: project.status || 'draft',
    created_at: project.created_at || new Date().toISOString(),
    updated_at: project.updated_at || new Date().toISOString(),
    // Asegurar que otros campos requeridos tengan valores por defecto
    property_type: project.property_type || 'residential',
    location: project.location || ''
  };
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
        console.error('⚠️ No hay token de autenticación');
        throw new Error('No autenticado');
      }

      // Construir query params
      const queryParams = new URLSearchParams();
      // Pasar parámetros en formato que espera la API
      if (options.status) queryParams.append('status', options.status);
      if (options.property_type) queryParams.append('propertyType', options.property_type);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      if (options.sortField) queryParams.append('sortField', options.sortField);
      if (options.sortDirection) queryParams.append('sortDirection', options.sortDirection);
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const apiUrl = `${API_URL}/projects${queryString}`;
      
      console.log('🔍 Consultando API en:', apiUrl);
      console.log('🔑 Token de autenticación disponible:', !!token);
      console.log('🔓 Primeros 20 caracteres del token:', token.substring(0, 20) + '...');
      
      // Intentar primero con fetch para depuración
      try {
        const fetchResponse = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('📊 Estado de respuesta fetch:', fetchResponse.status);
        
        if (!fetchResponse.ok) {
          console.error(`⚠️ Error en fetch: ${fetchResponse.status} ${fetchResponse.statusText}`);
        } else {
          console.log('✅ fetch exitoso');
          
          // Solo para depuración, clonar la respuesta
          const clonedResponse = fetchResponse.clone();
          const textData = await clonedResponse.text();
          
          try {
            // Intentar parsear para ver si es JSON válido
            const jsonData = JSON.parse(textData);
            console.log('🔍 Datos JSON válidos:', jsonData);
          } catch (parseError) {
            console.error('❌ No es JSON válido:', textData);
          }
        }
      } catch (fetchError) {
        console.error('❌ Error al usar fetch:', fetchError);
      }
      
      // Continuar con axios como estaba
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('📊 Respuesta completa de la API:', response);
      console.log('📋 Datos recibidos:', response.data);
      
      // Verificar la estructura de la respuesta
      if (!response.data) {
        console.error('⚠️ No hay datos en la respuesta:', response);
        throw new Error('La respuesta de la API no tiene datos');
      }
      
      if (response.data.data === undefined) {
        console.error('⚠️ No hay campo "data" en la respuesta:', response.data);
        
        // Intentar adaptarse a diferentes formatos de respuesta
        let projectsData = [];
        let paginationInfo = {
          page: 1,
          totalPages: 1,
          totalItems: 0,
        };
        
        // Caso 1: La respuesta es directamente un array de proyectos
        if (Array.isArray(response.data)) {
          console.log('🔄 Adaptando respuesta: array de proyectos');
          projectsData = response.data;
          paginationInfo.totalItems = response.data.length;
        } 
        // Caso 2: La respuesta es un objeto que contiene los proyectos directamente
        else if (typeof response.data === 'object') {
          // Buscar cualquier propiedad que pueda ser un array de proyectos
          for (const key in response.data) {
            if (Array.isArray(response.data[key])) {
              console.log(`🔄 Adaptando respuesta: usando campo "${key}" como datos`);
              projectsData = response.data[key];
              break;
            }
          }
        }
        
        // Usar datos adaptados
        const responseData = {
          data: projectsData.map(project => normalizeProject(camelToSnake(project))),
          pagination: paginationInfo
        };
        
        console.log('🔄 Datos normalizados finales (adaptados):', responseData);
        return responseData;
      }
      
      // Normalizar datos con el formato esperado original
      const responseData = {
        data: Array.isArray(response.data.data) 
          ? response.data.data.map(project => {
              const normalizedProject = normalizeProject(camelToSnake(project));
              console.log('📝 Proyecto normalizado:', normalizedProject);
              return normalizedProject;
            })
          : [],
        pagination: response.data.pagination || {
          page: 1,
          totalPages: 1,
          totalItems: 0,
        }
      };
      
      console.log('🔄 Datos normalizados finales:', responseData);
      
      return responseData;
    } catch (error) {
      console.error('❌ Error al obtener proyectos:', error);
      console.error('Mensaje:', error.message);
      if (error.response) {
        console.error('Detalles de la respuesta:', error.response.data);
        console.error('Estado HTTP:', error.response.status);
      }
      
      // Devolver objeto vacío pero con estructura válida para evitar errores
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
      
      // Normalizar el proyecto antes de devolverlo
      return normalizeProject(camelToSnake(response.data));
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
      
      // Normalizar el proyecto antes de devolverlo
      return normalizeProject(camelToSnake(response.data));
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
      
      // Normalizar el proyecto antes de devolverlo
      return normalizeProject(camelToSnake(response.data));
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
      
      // Normalizar el proyecto antes de devolverlo
      return normalizeProject(camelToSnake(response.data));
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