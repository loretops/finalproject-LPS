import axios from 'axios';
import interestService from '../../services/interestService';
import { apiClient } from '../../services/authService';

// Mock de apiClient
jest.mock('../../services/authService', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }
}));

describe('interestService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock de localStorage para simular un token de autenticación
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'test-token'),
        setItem: jest.fn(),
        removeItem: jest.fn()
      },
      writable: true
    });
  });

  describe('registerInterest', () => {
    it('debe registrar correctamente un interés en un proyecto', async () => {
      // Datos de prueba
      const mockResponse = {
        data: {
          id: 'interest1',
          projectId: 'project1',
          userId: 'user1',
          status: 'active',
          notes: 'Me interesa este proyecto',
          createdAt: '2025-05-15T12:00:00Z'
        }
      };

      // Configurar el mock
      apiClient.post.mockResolvedValueOnce(mockResponse);

      // Llamar al servicio
      const result = await interestService.registerInterest('project1', 'Me interesa este proyecto');

      // Verificar que se llama a la API con los parámetros correctos
      expect(apiClient.post).toHaveBeenCalledWith('/interests', {
        projectId: 'project1',
        notes: 'Me interesa este proyecto'
      });

      // Verificar resultado
      expect(result).toEqual(mockResponse.data);
    });

    it('debe manejar errores al registrar interés', async () => {
      // Simular un error
      const error = {
        response: {
          status: 400,
          data: { message: 'Ya has mostrado interés en este proyecto' }
        }
      };
      
      apiClient.post.mockRejectedValueOnce(error);

      // Verificar que se lanza el error
      await expect(interestService.registerInterest('project1'))
        .rejects
        .toBeTruthy();
    });
  });

  describe('getUserInterests', () => {
    it('debe obtener los intereses del usuario correctamente', async () => {
      // Datos de prueba
      const mockResponse = {
        data: [
          {
            id: 'interest1',
            status: 'active',
            notes: 'Me interesa este proyecto',
            createdAt: '2025-05-15T12:00:00Z',
            project: {
              id: 'project1',
              title: 'Proyecto 1',
              description: 'Descripción del proyecto 1',
              status: 'published',
              expectedRoi: 12.5,
              minimumInvestment: 10000,
              location: 'Madrid',
              propertyType: 'residential',
              imageUrl: 'https://example.com/image1.jpg'
            }
          },
          {
            id: 'interest2',
            status: 'active',
            notes: null,
            createdAt: '2025-05-16T14:30:00Z',
            project: {
              id: 'project2',
              title: 'Proyecto 2',
              description: 'Descripción del proyecto 2',
              status: 'published',
              expectedRoi: 15.0,
              minimumInvestment: 15000,
              location: 'Barcelona',
              propertyType: 'commercial',
              imageUrl: null
            }
          }
        ]
      };

      // Configurar el mock
      apiClient.get.mockResolvedValueOnce(mockResponse);

      // Llamar al servicio
      const result = await interestService.getUserInterests({
        status: 'active',
        page: 1,
        limit: 10
      });

      // Verificar que se llama a la API con los parámetros correctos
      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('/interests/user?status=active&page=1&limit=10')
      );

      // Verificar resultado
      expect(result).toEqual(mockResponse.data);
      expect(result.length).toBe(2);
      expect(result[0].project.title).toBe('Proyecto 1');
    });
  });

  describe('removeInterest', () => {
    it('debe eliminar un interés correctamente', async () => {
      // Configurar el mock
      apiClient.delete.mockResolvedValueOnce({});

      // Llamar al servicio
      await interestService.removeInterest('interest1');

      // Verificar que se llama a la API con el ID correcto
      expect(apiClient.delete).toHaveBeenCalledWith('/interests/interest1');
    });
  });

  describe('checkUserInterest', () => {
    it('debe verificar si el usuario tiene interés en un proyecto', async () => {
      // Datos de prueba
      const mockResponse = {
        data: [
          {
            id: 'interest1',
            status: 'active',
            project: { id: 'project1', title: 'Proyecto 1' }
          }
        ]
      };

      // Configurar el mock
      apiClient.get.mockResolvedValueOnce(mockResponse);

      // Llamar al servicio para un proyecto con interés
      const hasInterest = await interestService.checkUserInterest('project1');

      // Verificar que se llama a la API
      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('/interests/user?status=active')
      );

      // Verificar resultado
      expect(hasInterest).toBe(true);
    });

    it('debe devolver false si el usuario no tiene interés en el proyecto', async () => {
      // Datos de prueba
      const mockResponse = {
        data: [
          {
            id: 'interest1',
            status: 'active',
            project: { id: 'project1', title: 'Proyecto 1' }
          }
        ]
      };

      // Configurar el mock
      apiClient.get.mockResolvedValueOnce(mockResponse);

      // Llamar al servicio para un proyecto sin interés
      const hasInterest = await interestService.checkUserInterest('project2');

      // Verificar resultado
      expect(hasInterest).toBe(false);
    });

    it('debe manejar errores y devolver false', async () => {
      // Simular un error
      apiClient.get.mockRejectedValueOnce(new Error('Error de red'));

      // Llamar al servicio
      const hasInterest = await interestService.checkUserInterest('project1');

      // Verificar que devuelve false en caso de error
      expect(hasInterest).toBe(false);
    });
  });

  describe('getUserInterestProjectIds', () => {
    it('debe obtener un conjunto de IDs de proyectos con interés', async () => {
      // Datos de prueba
      const mockResponse = {
        data: [
          {
            id: 'interest1',
            status: 'active',
            project: { id: 'project1', title: 'Proyecto 1' }
          },
          {
            id: 'interest2',
            status: 'active',
            project: { id: 'project2', title: 'Proyecto 2' }
          }
        ]
      };

      // Configurar el mock
      apiClient.get.mockResolvedValueOnce(mockResponse);

      // Llamar al servicio
      const projectIds = await interestService.getUserInterestProjectIds();

      // Verificar que se llama a la API
      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('/interests/user?status=active')
      );

      // Verificar resultado
      expect(projectIds).toBeInstanceOf(Set);
      expect(projectIds.size).toBe(2);
      expect(projectIds.has('project1')).toBe(true);
      expect(projectIds.has('project2')).toBe(true);
    });
  });
}); 