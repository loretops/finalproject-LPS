import { apiClient, getAuthToken } from './authService';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

/**
 * Servicio para gestionar documentos de proyectos
 */
const documentService = {
  /**
   * Obtiene todos los documentos de un proyecto
   * @param {string} projectId - ID del proyecto
   * @param {Object} options - Opciones de filtrado (tipo, nivel de acceso)
   * @returns {Promise<Array>} Lista de documentos
   */
  async getProjectDocuments(projectId, options = {}) {
    try {
      // Construir query params para filtros
      const queryParams = new URLSearchParams();
      if (options.documentType) {
        queryParams.append('documentType', options.documentType);
      }
      if (options.accessLevel) {
        queryParams.append('accessLevel', options.accessLevel);
      }
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.get(`/projects/${projectId}/documents${queryString}`);
      
      // Asegurar que la respuesta es un array
      if (!response.data) {
        console.warn('La respuesta de getProjectDocuments no tiene datos');
        return [];
      }
      
      // Si la API devuelve un objeto con propiedad 'data', usar eso
      if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      // Si es directamente un array, usarlo
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      // Si no es ninguno de los formatos esperados, devolver array vacío y loguear
      console.warn('Formato inesperado en getProjectDocuments:', response.data);
      return [];
    } catch (error) {
      console.error('Error al obtener documentos del proyecto:', error);
      throw error;
    }
  },
  
  /**
   * Sube un documento al proyecto
   * @param {string} projectId - ID del proyecto
   * @param {File} file - Archivo a subir
   * @param {Object} metadata - Metadatos del documento
   * @param {Function} onProgress - Callback para el progreso de la carga
   * @returns {Promise<Object>} Documento subido
   */
  async uploadDocument(projectId, file, metadata = {}, onProgress = null) {
    try {
      // Crear objeto para enviar directamente a axios sin FormData
      const directData = {
        projectId,
        documentType: metadata.documentType || 'legal',
        accessLevel: metadata.accessLevel || 'partner',
        securityLevel: metadata.securityLevel || 'view_only',
        title: metadata.title || file.name,
        description: metadata.description || ''
      };
      
      console.log('Intentando método directo JSON primero:', directData);
      
      try {
        // Intentar primero con JSON directo para crear el registro
        const jsonResponse = await apiClient.post(`/projects/${projectId}/document-metadata`, directData);
        console.log('Registro de documento creado correctamente:', jsonResponse.data);
        
        // TODO: Subir archivo para este documento si el backend soporta este método
        return jsonResponse.data;
      } catch (jsonError) {
        console.log('Método JSON no disponible, probando FormData:', jsonError);
        // Continuar con FormData si el método JSON no está disponible
      }
      
      // Estrategia FormData simplificada
      console.log('Intentando subida con FormData simplificada');
      
      // Determinar el endpoint correcto según el tipo de archivo
      let endpoint = `/projects/${projectId}/documents`;
      let fieldName = 'document';
      
      if (file.type.startsWith('image/')) {
        endpoint = `/projects/${projectId}/images`;
        fieldName = 'image';
      } else if (file.type.startsWith('video/')) {
        endpoint = `/projects/${projectId}/videos`;
        fieldName = 'video';
      }
      
      // Crear FormData con el mínimo de campos posible
      const formData = new FormData();
      formData.append(fieldName, file);
      
      // Añadir solo los campos requeridos mínimos
      // NO añadir ningún otro campo para evitar problemas de procesamiento
      formData.append('documentType', metadata.documentType || 'legal');
      formData.append('accessLevel', metadata.accessLevel || 'partner');
      
      console.log('Enviando documento al servidor:');
      console.log('- Endpoint:', endpoint);
      console.log('- Tipo de archivo:', file.type);
      console.log('- Nombre del campo:', fieldName);
      console.log('- Campos en FormData: document, documentType, accessLevel');
      
      // Usar fetch nativo en lugar de axios para máxima compatibilidad
      // Esto evita cualquier transformación que pueda estar haciendo axios
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // NO incluir Content-Type para que el navegador establezca automáticamente el boundary del multipart/form-data
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error del servidor: ${errorData.message || response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al subir documento:', error);
      
      // Reintento final usando axios básico como último recurso
      if (error.message.includes('Error del servidor: Se requieren tipo de documento y nivel de acceso')) {
        console.warn("Haciendo un último intento con axios básico...");
        try {
          // Determinar el endpoint correcto según el tipo de archivo
          let endpoint = `/projects/${projectId}/documents`;
          let fieldName = 'document';
          
          if (file.type.startsWith('image/')) {
            endpoint = `/projects/${projectId}/images`;
            fieldName = 'image';
          } else if (file.type.startsWith('video/')) {
            endpoint = `/projects/${projectId}/videos`;
            fieldName = 'video';
          }
          
          // Crear un FormData mínimo
          const minimalForm = new FormData();
          minimalForm.append(fieldName, file);
          minimalForm.append('documentType', metadata.documentType || 'legal');
          minimalForm.append('accessLevel', metadata.accessLevel || 'partner');
          
          // Usar axios directamente con configuración mínima
          const response = await axios.post(`${API_URL}${endpoint}`, minimalForm, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          
          return response.data;
        } catch (lastError) {
          console.error("El último intento también falló:", lastError);
          throw new Error(`No se pudo subir el documento después de múltiples intentos: ${lastError.message}`);
        }
      }
      
      throw new Error(`Error al subir el documento: ${error.message}`);
    }
  },
  
  /**
   * Elimina un documento
   * @param {string} documentId - ID del documento
   * @returns {Promise<void>}
   */
  async deleteDocument(documentId) {
    try {
      // Usar apiClient que ya tiene configurado el interceptor para el token
      await apiClient.delete(`/documents/${documentId}`);
    } catch (error) {
      console.error(`Error al eliminar documento ${documentId}:`, error);
      throw error;
    }
  },
  
  /**
   * Obtiene la URL de acceso a un documento
   * @param {string} documentId - ID del documento
   * @returns {Promise<string>} URL de acceso
   */
  async getDocumentAccessUrl(documentId) {
    try {
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.get(`/documents/${documentId}/access`);
      
      return response.data.url;
    } catch (error) {
      console.error(`Error al obtener URL del documento ${documentId}:`, error);
      throw error;
    }
  },
  
  /**
   * Actualiza los metadatos de un documento
   * @param {string} documentId - ID del documento
   * @param {Object} metadata - Metadatos a actualizar
   * @returns {Promise<Object>} Documento actualizado
   */
  async updateDocumentMetadata(documentId, metadata) {
    try {
      // Usar apiClient que ya tiene configurado el interceptor para el token
      const response = await apiClient.patch(`/documents/${documentId}`, metadata, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar metadatos del documento ${documentId}:`, error);
      throw error;
    }
  }
};

export default documentService; 