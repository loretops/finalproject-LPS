import axios from 'axios';
import { apiClient, getAuthToken } from './authService';

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
 * Normaliza textos eliminando caracteres acentuados y caracteres especiales problemáticos
 * @param {string} text - Texto a normalizar
 * @returns {string} - Texto normalizado
 */
const normalizeText = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  // Convertir acentos y caracteres especiales a sus equivalentes ASCII
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[ñÑ]/g, 'n'); // Convertir ñ/Ñ a n
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
      
      console.log('🔍 Consultando API en:', `${API_URL}/projects${queryString}`);
      console.log('🔑 Token de autenticación disponible:', !!token);
      console.log('🔓 Primeros 20 caracteres del token:', token.substring(0, 20) + '...');
      
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.get(`/projects${queryString}`);
      
      console.log('📊 Respuesta completa de la API:', response);
      console.log('📋 Datos recibidos:', response.data);
      
      // Verificar la estructura de la respuesta
      if (!response.data) {
        console.error('⚠️ No hay datos en la respuesta:', response);
        throw new Error('La respuesta de la API no tiene datos');
      }
      
      // Verificar explícitamente si los datos están en el formato esperado
      if (response.data.data === undefined) {
        console.error('⚠️ No hay campo "data" en la respuesta:', response.data);
        
        // Log específico para depuración
        console.log('⚠️ Tipo de response.data:', typeof response.data);
        if (typeof response.data === 'object') {
          console.log('⚠️ Claves disponibles en response.data:', Object.keys(response.data));
        }
        
        // Intentar adaptar la respuesta
        let projectsData = [];
        let paginationInfo = {
          page: 1,
          totalPages: 1,
          totalItems: 0,
        };
        
        // Si la respuesta es un array directamente
        if (Array.isArray(response.data)) {
          console.log('🔄 Adaptando respuesta: array de proyectos directo');
          projectsData = response.data;
          paginationInfo.totalItems = response.data.length;
        } 
        // Si la respuesta es un objeto
        else if (typeof response.data === 'object') {
          // Buscar cualquier propiedad que pueda ser un array
          Object.keys(response.data).forEach(key => {
            if (Array.isArray(response.data[key])) {
              console.log(`🔄 Adaptando respuesta: usando propiedad "${key}" como datos`);
              projectsData = response.data[key];
              
              // Actualizar paginación si está disponible
              if (response.data.pagination) {
                paginationInfo = response.data.pagination;
              } else {
                paginationInfo.totalItems = projectsData.length;
              }
            }
          });
        }
        
        // Normalizar cada proyecto individualmente
        const normalizedProjects = projectsData.map(project => {
          const normalized = normalizeProject(camelToSnake(project));
          console.log('🔄 Proyecto normalizado individual:', normalized);
          return normalized;
        });
        
        const responseData = {
          data: normalizedProjects,
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
      console.log('🔄 ¿Es un array data?', Array.isArray(responseData.data));
      console.log('🔄 Longitud de data:', responseData.data.length);
      
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
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.get(`/projects/${id}`);
      
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
      // Asegurar que los datos estén en camelCase para el backend
      const camelCaseData = snakeToCamel(projectData);
      
      // Si no se proporciona targetAmount, calcularlo como 6 veces minimumInvestment (valor razonable por defecto)
      if (!camelCaseData.targetAmount && camelCaseData.minimumInvestment) {
        camelCaseData.targetAmount = camelCaseData.minimumInvestment * 6;
      }
      
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.post(`/projects`, camelCaseData, {
        headers: {
          'Content-Type': 'application/json'
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
   * Actualiza un proyecto existente enviando solo los campos esenciales y modificados
   * @param {string} id ID del proyecto
   * @param {Object} projectData Datos actualizados del proyecto
   * @returns {Promise<Object>} Proyecto actualizado
   */
  async updateProject(id, projectData) {
    try {
      // Verificar primero si el proyecto está publicado
      try {
        const existingProject = await this.getProjectById(id);
        if (existingProject && existingProject.status === 'published') {
          throw new Error('No se pueden modificar proyectos ya publicados. Solo los proyectos en borrador pueden ser editados.');
        }
        
        // Si llegamos aquí, intentaremos una estrategia incremental
        // En lugar de enviar todos los campos, enviamos solo los esenciales y los que han cambiado
        
        // 1. Comparar con el proyecto existente para identificar qué campos han cambiado
        const changedFields = {};
        const essentialFields = ['title', 'description', 'minimum_investment', 'target_amount', 'expected_roi', 'property_type', 'location'];
        
        // Solo incluir campos esenciales que han cambiado
        essentialFields.forEach(field => {
          const snakeCaseField = field; // Ya está en snake_case
          const camelCaseField = snakeToCamel({ [snakeCaseField]: '' })[Object.keys(snakeToCamel({ [snakeCaseField]: '' }))[0]];
          
          if (projectData[snakeCaseField] !== undefined && 
              JSON.stringify(projectData[snakeCaseField]) !== JSON.stringify(existingProject[snakeCaseField])) {
            
            // Normalizar el valor según el tipo de campo
            let normalizedValue = projectData[snakeCaseField];
            
            // Normalizar campos numéricos
            if (['minimum_investment', 'target_amount', 'expected_roi'].includes(snakeCaseField)) {
              normalizedValue = typeof normalizedValue === 'string' ? Number(normalizedValue) : normalizedValue;
            }
            
            // Normalizar property_type
            if (snakeCaseField === 'property_type') {
              const type = normalizedValue?.toLowerCase();
              if (propertyTypeMap[type]) normalizedValue = propertyTypeMap[type];
              else if (['residential', 'commercial', 'industrial', 'land', 'mixed'].includes(type)) normalizedValue = type;
              else normalizedValue = 'residential';
            }
            
            // Normalizar textos para eliminar caracteres especiales
            if (['title', 'description', 'location'].includes(snakeCaseField)) {
              normalizedValue = normalizeText(normalizedValue);
            }
            
            // Añadir al objeto de campos cambiados (en camelCase para el backend)
            changedFields[camelCaseField] = normalizedValue;
          }
        });
        
        // Incluir siempre el ID para asegurar que actualizamos el proyecto correcto
        changedFields.id = id;
        
        // Si no hay cambios, no hay nada que actualizar
        if (Object.keys(changedFields).length <= 1) { // Solo contiene el ID
          console.log('No se detectaron cambios en el proyecto');
          return existingProject; // Devolver el proyecto sin cambios
        }
        
        console.log('Campos modificados a enviar:', changedFields);
        
        // 2. Realizar la actualización solo con los campos esenciales y modificados
        // Usar apiClient que ya tiene configurado el interceptor para el token
        const response = await apiClient.put(`/projects/${id}`, changedFields, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        // Si hay algún error en la respuesta pero no lanzó excepción
        if (response.status >= 400) {
          console.error('Error del servidor:', response.data);
          throw new Error(response.data.message || 'Error al actualizar el proyecto');
        }
        
        // Normalizar el proyecto antes de devolverlo
        return normalizeProject(camelToSnake(response.data));
      } catch (checkError) {
        // Si el error es específicamente sobre el proyecto publicado, propagarlo
        if (checkError.message.includes('publicados')) {
          throw checkError;
        }
        
        // Si hay otro tipo de error (como problemas en la actualización incremental),
        // intentamos con el método original como fallback
        console.warn('Error en actualización incremental, intentando método tradicional:', checkError.message);
        
        // Normalizar valores específicos que deben tener un formato concreto
        // Asegurar que property_type se envía en minúsculas y con el formato correcto
        const propertyTypeMap = {
          'residencial': 'residential',
          'comercial': 'commercial',
          'industrial': 'industrial',
          'terreno': 'land',
          'uso mixto': 'mixed'
        };
        
        // Asegurar que se incluyen campos críticos
        const normalizedData = {
          ...projectData,
          // Convertir a número si es necesario
          minimum_investment: typeof projectData.minimum_investment === 'string' 
            ? Number(projectData.minimum_investment) 
            : projectData.minimum_investment,
          target_amount: typeof projectData.target_amount === 'string' 
            ? Number(projectData.target_amount) 
            : projectData.target_amount,
          expected_roi: typeof projectData.expected_roi === 'string' 
            ? Number(projectData.expected_roi) 
            : projectData.expected_roi,
          // Normalizar property_type 
          property_type: (() => {
            const type = projectData.property_type?.toLowerCase();
            // Si es una clave del mapa español->inglés, usamos la traducción
            if (propertyTypeMap[type]) return propertyTypeMap[type];
            // Si coincide directamente con uno de los valores válidos, lo usamos
            if (['residential', 'commercial', 'industrial', 'land', 'mixed'].includes(type)) return type;
            // Si es un nombre en español con primera letra mayúscula
            if (propertyTypeMap[type?.toLowerCase()]) return propertyTypeMap[type?.toLowerCase()];
            // Por defecto, residential
            return 'residential';
          })(),
          // Normalizar text fields para evitar problemas con caracteres especiales
          title: normalizeText(projectData.title),
          description: normalizeText(projectData.description),
          location: normalizeText(projectData.location)
        };
        
        // Convertir a camelCase para el backend
        const camelCaseData = snakeToCamel(normalizedData);
        
        // Solo cambios más importantes
        const minimalUpdate = {
          id: camelCaseData.id,
          title: camelCaseData.title,
          description: camelCaseData.description,
          minimumInvestment: camelCaseData.minimumInvestment,
          targetAmount: camelCaseData.targetAmount,
          expectedRoi: camelCaseData.expectedRoi,
          propertyType: camelCaseData.propertyType,
          location: camelCaseData.location
        };
        
        console.log(`Enviando solo campos principales para actualizar proyecto ${id}:`, minimalUpdate);
        
        try {
          // Usar apiClient que ya tiene configurado el interceptor para el token
          const response = await apiClient.put(`/projects/${id}`, minimalUpdate, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          // Si hay algún error en la respuesta pero no lanzó excepción
          if (response.status >= 400) {
            console.error('Error del servidor:', response.data);
            throw new Error(response.data.message || 'Error al actualizar el proyecto');
          }
          
          // Normalizar el proyecto antes de devolverlo
          return normalizeProject(camelToSnake(response.data));
        } catch (axiosError) {
          // Si es un error 500, intentar identificar qué campos están causando problemas
          if (axiosError.response?.status === 500) {
            console.error('Error 500 al actualizar. Intentando última solución...');
            
            // La actualización con datos mínimos, pero separada en dos pasos
            try {
              // Paso 1: Actualizar solo campos básicos de texto
              const step1Data = {
                id: camelCaseData.id,
                title: camelCaseData.title, 
                description: camelCaseData.description,
                location: camelCaseData.location
              };
              
              console.log('Intento #1: Actualizando solo campos de texto:', step1Data);
              
              // Usar apiClient que ya tiene configurado el interceptor para el token
              await apiClient.put(`/projects/${id}`, step1Data, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
              // Paso 2: Actualizar campos numéricos
              const step2Data = {
                id: camelCaseData.id,
                minimumInvestment: camelCaseData.minimumInvestment,
                targetAmount: camelCaseData.targetAmount,
                expectedRoi: camelCaseData.expectedRoi,
                propertyType: camelCaseData.propertyType
              };
              
              console.log('Intento #2: Actualizando campos numéricos:', step2Data);
              
              // Usar apiClient que ya tiene configurado el interceptor para el token
              const finalResponse = await apiClient.put(`/projects/${id}`, step2Data, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
              return normalizeProject(camelToSnake(finalResponse.data));
            } catch (lastError) {
              console.error('Todos los intentos de actualización fallaron:', lastError);
              throw new Error('No se pudo actualizar el proyecto después de múltiples intentos. Contacte con soporte técnico.');
            }
          }
          
          // Continuar con el log normal y propagar el error original
          console.error('Respuesta completa del servidor:', axiosError.response || 'No hay datos de respuesta');
          console.error('Error detallado:', {
            status: axiosError.response?.status,
            statusText: axiosError.response?.statusText,
            data: axiosError.response?.data,
            headers: axiosError.response?.headers,
            config: {
              url: axiosError.config?.url,
              method: axiosError.config?.method,
              data: axiosError.config?.data
            }
          });
          throw axiosError; // Propagar el error original
        }
      }
    } catch (error) {
      console.error(`Error al actualizar proyecto con ID ${id}:`, error);
      
      // Detallar el error si hay información de respuesta
      if (error.response) {
        console.error('Detalles del error:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
        
        // Si hay un error específico del backend con un mensaje, utilizarlo
        if (error.response.data && typeof error.response.data === 'object' && error.response.data.message) {
          console.error('Mensaje específico del backend:', error.response.data.message);
          throw new Error(error.response.data.message);
        }
        
        // Manejar específicamente el error 500 cuando se intenta editar un proyecto publicado
        if (error.response.status === 500) {
          // Verificar si hay mensaje del backend o usar uno genérico
          const message = error.response.data?.message || 
                         'Error en el servidor. Verifica que los datos enviados tengan el formato correcto.';
          throw new Error(message);
        }
        
        // Lanzar error con mensaje más específico
        throw new Error(error.response.data?.message || `Error (${error.response.status}): No se pudo actualizar el proyecto`);
      }
      
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
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.post(`/projects/${id}/publish`, {});
      
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
      try {
        // Verificar primero si el proyecto existe para proporcionar un mejor mensaje de error
        await this.getProjectById(id);
      } catch (checkError) {
        // Si el proyecto no existe, lanzar un error personalizado más claro
        if (checkError.response?.status === 404) {
          console.warn(`El proyecto con ID ${id} no existe o ya ha sido eliminado`);
          // Devolver éxito en este caso, ya que el objetivo (que el proyecto no exista) ya se cumplió
          return;
        }
        // Para otros errores, continuar con la eliminación por si es solo un problema temporal de la API
      }
      
      try {
        // Usar apiClient que ya tiene configurado el interceptor para el token
        await apiClient.delete(`/projects/${id}`);
        console.log(`Proyecto con ID ${id} eliminado con éxito`);
      } catch (deleteError) {
        // Si es un 404, no es realmente un error crítico, el proyecto ya no existe
        if (deleteError.response?.status === 404) {
          console.warn(`El proyecto con ID ${id} no existe o ya ha sido eliminado`);
          // No propagar el error, ya que el objetivo de la operación (que el proyecto no exista) se ha cumplido
          return;
        }
        
        // Para cualquier otro error, registrarlo y propagarlo
        console.error(`Error al eliminar proyecto con ID ${id}:`, deleteError);
        
        // Proporcionar un mensaje de error más descriptivo
        if (deleteError.response?.status === 403) {
          throw new Error('No tienes permisos para eliminar este proyecto.');
        } else if (deleteError.response?.status === 401) {
          throw new Error('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
        } else {
          throw new Error(`Error ${deleteError.response?.status || ''}: No se pudo eliminar el proyecto.`);
        }
      }
    } catch (error) {
      console.error(`Error al eliminar proyecto con ID ${id}:`, error);
      throw error;
    }
  }
};

export default projectService; 