import axios from 'axios';
import * as authService from '../services/authService';

// URL de la API (idéntica a la que usa el frontend)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

// Obtener un token válido - esto debería configurarse como variable de entorno para CI/CD
const getTestToken = async () => {
  try {
    // Intentar obtener un token a través del servicio de autenticación
    // Si esto falla, se usará un token de prueba (si está disponible)
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: process.env.TEST_USER_EMAIL || 'admin@example.com',
      password: process.env.TEST_USER_PASSWORD || 'password123'
    });
    return response.data.token;
  } catch (error) {
    console.warn('No se pudo obtener un token de prueba mediante login:', error.message);
    
    // Usar un token de prueba si está disponible como variable de entorno
    const testToken = process.env.TEST_AUTH_TOKEN;
    if (testToken) {
      return testToken;
    }
    
    // Si no hay token, lanzar error
    throw new Error('No se pudo obtener un token para pruebas. Configure TEST_AUTH_TOKEN o credenciales válidas.');
  }
};

// Test de la API real (solo debe ejecutarse en entorno de desarrollo)
describe('API Diagnostics Tests', () => {
  let authToken;
  
  // Obtener token antes de las pruebas
  beforeAll(async () => {
    try {
      authToken = await getTestToken();
      console.log('Token de autenticación obtenido para pruebas');
    } catch (error) {
      console.error('Error obteniendo token para pruebas:', error.message);
      // No fallar aquí, dejar que los tests fallen individualmente
    }
  });
  
  // Test básico de conectividad
  it('should connect to the API server', async () => {
    try {
      const response = await axios.get(`${API_URL}/health`);
      expect(response.status).toBe(200);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.error('No se pudo conectar al servidor API. Asegúrese de que esté en ejecución.');
      }
      throw error;
    }
  });
  
  // Verificar acceso autenticado a proyectos
  it('should fetch projects with authentication', async () => {
    // Skip si no hay token
    if (!authToken) {
      console.warn('Skip: No hay token de autenticación disponible');
      return;
    }
    
    const response = await axios.get(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    
    expect(response.status).toBe(200);
    // Validar estructura de respuesta
    expect(response.data).toBeDefined();
  });
  
  // Test específico para diagnosticar el error 500
  it('should diagnose project update process', async () => {
    // Skip si no hay token
    if (!authToken) {
      console.warn('Skip: No hay token de autenticación disponible');
      return;
    }
    
    // 1. Crear un proyecto de prueba
    const newProject = {
      title: 'Proyecto de Diagnóstico',
      description: 'Proyecto para detectar errores en la API',
      minimumInvestment: 10000,
      targetAmount: 60000,
      expectedRoi: 12,
      propertyType: 'residential',
      location: 'Test Location'
    };
    
    let projectId;
    
    try {
      // Crear proyecto
      const createResponse = await axios.post(`${API_URL}/projects`, newProject, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      expect(createResponse.status).toBe(201);
      projectId = createResponse.data.id;
      console.log(`Proyecto de prueba creado con ID: ${projectId}`);
      
      // 2. Intentar actualizarlo para reproducir el error 500
      const updateData = {
        title: 'Proyecto Actualizado',
        description: 'Descripción actualizada para diagnóstico'
      };
      
      // Mostrar datos exactos que se envían
      console.log('Datos enviados para actualización:', JSON.stringify(updateData));
      
      try {
        const updateResponse = await axios.put(`${API_URL}/projects/${projectId}`, updateData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        expect(updateResponse.status).toBe(200);
        console.log('Actualización exitosa:', updateResponse.data);
      } catch (updateError) {
        console.error('Error al actualizar proyecto:', updateError.message);
        if (updateError.response) {
          console.error('Detalles del error:', {
            status: updateError.response.status,
            statusText: updateError.response.statusText,
            data: updateError.response.data
          });
        }
        throw updateError;
      }
    } finally {
      // 3. Limpiar: eliminar el proyecto de prueba si se creó
      if (projectId) {
        try {
          await axios.delete(`${API_URL}/projects/${projectId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          });
          console.log('Proyecto de prueba eliminado correctamente');
        } catch (deleteError) {
          console.warn('No se pudo eliminar el proyecto de prueba:', deleteError.message);
        }
      }
    }
  });
}); 