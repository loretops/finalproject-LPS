import axios from 'axios';
import publicProjectService from '../../services/publicProjectService';
import { apiClient } from '../../services/authService';

// Mock de axios
jest.mock('axios');
// Mock de apiClient
jest.mock('../../services/authService', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn()
  }
}));

describe('publicProjectService', () => {
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

  describe('getPublishedProjects', () => {
    it('debe obtener proyectos publicados con filtros', async () => {
      // Datos de prueba
      const mockResponse = {
        data: {
          data: [
            {
              id: 'project1',
              title: 'Proyecto 1',
              status: 'published',
              minimumInvestment: 10000,
              targetAmount: 100000,
              expectedRoi: 12.5,
              propertyType: 'residential',
              location: 'Madrid',
              createdAt: '2025-05-01T00:00:00Z',
              publishedAt: '2025-05-10T00:00:00Z'
            },
            {
              id: 'project2',
              title: 'Proyecto 2',
              status: 'published',
              minimumInvestment: 15000,
              targetAmount: 200000,
              expectedRoi: 15.0,
              propertyType: 'commercial',
              location: 'Barcelona',
              createdAt: '2025-05-02T00:00:00Z',
              publishedAt: '2025-05-11T00:00:00Z'
            }
          ],
          pagination: {
            totalItems: 2,
            totalPages: 1,
            currentPage: 1
          }
        }
      };

      // Configurar el mock
      apiClient.get.mockResolvedValueOnce(mockResponse);

      // Llamar al servicio con opciones
      const options = {
        property_type: 'residential',
        min_roi: 10,
        location: 'Madrid',
        page: 1,
        limit: 10,
        sort_field: 'published_at',
        sort_direction: 'desc'
      };
      const result = await publicProjectService.getPublishedProjects(options);

      // Verificar que se llama a la API con los parámetros correctos
      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('/projects/public?')
      );
      // Verificar que todos los parámetros están en la URL
      const url = apiClient.get.mock.calls[0][0];
      expect(url).toContain('propertyType=residential');
      expect(url).toContain('minRoi=10');
      expect(url).toContain('location=Madrid');
      expect(url).toContain('page=1');
      expect(url).toContain('limit=10');
      expect(url).toContain('sortField=published_at');
      expect(url).toContain('sortDirection=desc');

      // Verificar que los datos se normalizan correctamente
      expect(result.data.length).toBe(2);
      expect(result.data[0].id).toBe('project1');
      expect(result.data[0].title).toBe('Proyecto 1');
      expect(result.data[0].minimum_investment).toBe(10000);
      expect(result.data[0].property_type).toBe('residential');
      expect(result.pagination.totalItems).toBe(2);
    });

    it('debe manejar errores correctamente', async () => {
      // Simular un error de la API
      apiClient.get.mockRejectedValueOnce({
        response: {
          status: 500,
          data: { message: 'Error del servidor' }
        }
      });

      // Llamar al servicio
      const result = await publicProjectService.getPublishedProjects();

      // Verificar que devuelve un objeto vacío pero con estructura válida
      expect(result.data).toEqual([]);
      expect(result.pagination).toEqual({
        page: 1,
        totalPages: 1,
        totalItems: 0,
      });
    });
  });

  describe('getPublishedProjectById', () => {
    it('debe obtener un proyecto publicado específico', async () => {
      // Datos de prueba
      const mockResponse = {
        data: {
          id: 'project1',
          title: 'Proyecto 1',
          description: 'Descripción del proyecto',
          status: 'published',
          minimumInvestment: 10000,
          targetAmount: 100000,
          currentAmount: 50000,
          expectedRoi: 12.5,
          propertyType: 'residential',
          location: 'Madrid',
          createdAt: '2025-05-01T00:00:00Z',
          publishedAt: '2025-05-10T00:00:00Z',
          documents: [
            {
              id: 'doc1',
              name: 'Documento 1',
              documentType: 'legal',
              accessLevel: 'partner',
              securityLevel: 'view_only',
              url: 'http://example.com/doc1',
              createdAt: '2025-05-01T00:00:00Z'
            }
          ]
        }
      };

      // Configurar el mock
      apiClient.get.mockResolvedValueOnce(mockResponse);

      // Llamar al servicio
      const result = await publicProjectService.getPublishedProjectById('project1');

      // Verificar que se llama a la API con el ID correcto
      expect(apiClient.get).toHaveBeenCalledWith('/projects/public/project1');

      // Verificar que los datos se normalizan correctamente
      expect(result.id).toBe('project1');
      expect(result.title).toBe('Proyecto 1');
      expect(result.minimum_investment).toBe(10000);
      expect(result.property_type).toBe('residential');
      expect(result.documents.length).toBe(1);
      expect(result.documents[0].id).toBe('doc1');
      expect(result.documents[0].document_type).toBe('legal');
    });

    it('debe manejar error 404 correctamente', async () => {
      // Simular un error 404
      apiClient.get.mockRejectedValueOnce({
        response: {
          status: 404,
          data: { message: 'Proyecto no encontrado' }
        }
      });

      // Llamar al servicio debe lanzar un error
      await expect(publicProjectService.getPublishedProjectById('nonexistent'))
        .rejects
        .toThrow('El proyecto no existe o ha sido eliminado');
    });

    it('debe manejar error 403 correctamente', async () => {
      // Simular un error 403
      apiClient.get.mockRejectedValueOnce({
        response: {
          status: 403,
          data: { message: 'No tienes acceso a este proyecto' }
        }
      });

      // Llamar al servicio debe lanzar un error
      await expect(publicProjectService.getPublishedProjectById('restricted'))
        .rejects
        .toThrow('No tienes permisos para ver este proyecto');
    });
  });

  describe('registerInterest', () => {
    it('debe registrar interés en un proyecto correctamente', async () => {
      // Datos de prueba
      const mockResponse = {
        data: {
          success: true,
          message: 'Interés registrado correctamente'
        }
      };

      // Configurar el mock
      apiClient.post.mockResolvedValueOnce(mockResponse);

      // Llamar al servicio
      const result = await publicProjectService.registerInterest('project1');

      // Verificar que se llama a la API con el ID correcto
      expect(apiClient.post).toHaveBeenCalledWith('/projects/public/project1/interest');

      // Verificar que devuelve la respuesta correcta
      expect(result.success).toBe(true);
    });

    it('debe propagar errores', async () => {
      // Simular un error
      apiClient.post.mockRejectedValueOnce(new Error('Error al registrar interés'));

      // Llamar al servicio debe lanzar un error
      await expect(publicProjectService.registerInterest('project1'))
        .rejects
        .toThrow('Error al registrar interés');
    });
  });
}); 