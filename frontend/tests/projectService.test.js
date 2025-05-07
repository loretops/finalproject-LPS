// tests/projectService.test.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import projectService from '../services/projectService';
import * as authService from '../services/authService';
import sinon from 'sinon';

// Configuración del entorno de pruebas
describe('Project Service Tests', () => {
  let mock;
  let authTokenStub;
  
  beforeEach(() => {
    // Crear un mock para axios
    mock = new MockAdapter(axios);
    
    // Stub para getAuthToken
    authTokenStub = sinon.stub(authService, 'getAuthToken');
    authTokenStub.returns('fake-jwt-token');
  });
  
  afterEach(() => {
    // Restaurar mocks y stubs
    mock.restore();
    authTokenStub.restore();
  });
  
  // Prueba de conversión de datos de camelCase a snake_case
  it('should correctly convert data formats between frontend and backend', () => {
    // Mock de respuesta del servidor
    const mockServerResponse = {
      id: '1',
      title: 'Test Project',
      description: 'A test project',
      minimumInvestment: 10000,
      targetAmount: 60000,
      expectedRoi: 12,
      propertyType: 'residential',
      location: 'Madrid',
      status: 'draft',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    };
    
    // Datos en formato frontend (snake_case)
    const frontendData = {
      id: '1',
      title: 'Test Project',
      description: 'A test project',
      minimum_investment: 10000,
      target_amount: 60000,
      expected_roi: 12,
      property_type: 'residential',
      location: 'Madrid',
      status: 'draft',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    };
    
    // Configurar mock
    mock.onGet('http://localhost:8001/api/projects/1').reply(200, mockServerResponse);
    
    // Ejecutar prueba
    return projectService.getProjectById('1')
      .then(project => {
        // Verificar que los datos se han convertido correctamente
        expect(project).toEqual(frontendData);
      });
  });
  
  // Prueba de error en la creación de proyecto
  it('should handle creation errors correctly', () => {
    // Mock del error del servidor
    mock.onPost('http://localhost:8001/api/projects').reply(500, {
      message: 'Error al procesar la solicitud'
    });
    
    // Datos del proyecto
    const projectData = {
      title: 'Test Project',
      description: 'A test project',
      minimum_investment: 10000,
      target_amount: 60000,
      expected_roi: 12,
      property_type: 'residential',
      location: 'Madrid'
    };
    
    // Ejecutar prueba
    return projectService.createProject(projectData)
      .then(() => {
        // No debería llegar aquí
        fail('Expected error was not thrown');
      })
      .catch(error => {
        // Verificar que el error se maneja correctamente
        expect(error).toBeDefined();
      });
  });
  
  // Prueba para verificar que el servicio maneja correctamente proyectos publicados
  it('should handle attempt to update a published project', () => {
    // Mock del error del servidor
    mock.onPut('http://localhost:8001/api/projects/1').reply(400, {
      message: 'No se puede modificar un proyecto ya publicado'
    });
    
    // Datos del proyecto
    const projectData = {
      title: 'Updated Project',
      description: 'An updated project'
    };
    
    // Ejecutar prueba
    return projectService.updateProject('1', projectData)
      .then(() => {
        // No debería llegar aquí
        fail('Expected error was not thrown');
      })
      .catch(error => {
        // Verificar que el error contiene el mensaje correcto
        expect(error.message).toContain('proyecto ya publicado');
      });
  });
}); 