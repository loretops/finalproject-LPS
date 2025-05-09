const request = require('supertest');
const app = require('../../server');
const projectService = require('../../application/services/projectService');

// Mock del servicio de proyectos
jest.mock('../../application/services/projectService');

// Mock del middleware de autenticación
jest.mock('../../middleware/jwtAuthMiddleware', () => (req, res, next) => {
  // Simular usuario autenticado
  req.user = {
    id: 'test-user-id',
    role: 'partner'
  };
  next();
});

// Mock del middleware de roles
jest.mock('../../middleware/roleAuthMiddleware', () => () => (req, res, next) => {
  // Permitir acceso para las pruebas
  next();
});

describe('PublicProjectController', () => {
  // Datos de prueba
  const mockProjects = {
    data: [
      { 
        id: 'proj1',
        title: 'Proyecto Publicado 1',
        status: 'published',
        expectedRoi: 12.5,
        location: 'Madrid'
      },
      { 
        id: 'proj2',
        title: 'Proyecto Publicado 2',
        status: 'published',
        expectedRoi: 15.0,
        location: 'Barcelona'
      }
    ],
    pagination: {
      total: 2,
      page: 1,
      limit: 10,
      totalPages: 1
    }
  };

  const mockProject = {
    id: 'proj1',
    title: 'Proyecto Publicado 1',
    description: 'Descripción detallada del proyecto',
    status: 'published',
    expectedRoi: 12.5,
    minimumInvestment: 10000,
    targetAmount: 100000,
    currentAmount: 25000,
    location: 'Madrid',
    propertyType: 'residential',
    documents: []
  };

  // Limpiar mocks después de cada prueba
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/projects/public', () => {
    it('debería devolver un listado de proyectos publicados', async () => {
      // Configurar el mock del servicio
      projectService.getPublishedProjects.mockResolvedValue(mockProjects);

      // Realizar solicitud
      const response = await request(app)
        .get('/api/projects/public')
        .expect('Content-Type', /json/)
        .expect(200);

      // Verificar resultados
      expect(response.body).toEqual(mockProjects);
      expect(projectService.getPublishedProjects).toHaveBeenCalledTimes(1);
    });

    it('debería manejar correctamente los parámetros de filtrado', async () => {
      // Configurar el mock del servicio
      projectService.getPublishedProjects.mockResolvedValue(mockProjects);

      // Realizar solicitud con filtros
      const response = await request(app)
        .get('/api/projects/public?propertyType=residential&minRoi=10&page=1&limit=5')
        .expect('Content-Type', /json/)
        .expect(200);

      // Verificar que se llama al servicio con los parámetros correctos
      expect(projectService.getPublishedProjects).toHaveBeenCalledWith(
        expect.objectContaining({
          propertyType: 'residential',
          minRoi: '10',
          page: 1,
          limit: 5
        })
      );
    });

    it('debería manejar errores correctamente', async () => {
      // Configurar el mock para simular un error
      projectService.getPublishedProjects.mockRejectedValue(new Error('Error de prueba'));

      // Realizar solicitud
      const response = await request(app)
        .get('/api/projects/public')
        .expect('Content-Type', /json/)
        .expect(500);

      // Verificar mensaje de error
      expect(response.body).toHaveProperty('message', 'Error al listar proyectos públicos');
    });
  });

  describe('GET /api/projects/public/:id', () => {
    it('debería devolver un proyecto publicado específico', async () => {
      // Configurar el mock del servicio
      projectService.getProjectById.mockResolvedValue(mockProject);

      // Realizar solicitud
      const response = await request(app)
        .get('/api/projects/public/proj1')
        .expect('Content-Type', /json/)
        .expect(200);

      // Verificar resultados
      expect(response.body).toEqual(mockProject);
      expect(projectService.getProjectById).toHaveBeenCalledWith('proj1');
    });

    it('debería devolver 404 si el proyecto no existe', async () => {
      // Configurar el mock para simular que no se encuentra el proyecto
      projectService.getProjectById.mockResolvedValue(null);

      // Realizar solicitud
      await request(app)
        .get('/api/projects/public/nonexistent')
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it('debería devolver 403 si el proyecto no está publicado', async () => {
      // Configurar el mock para simular un proyecto en borrador
      projectService.getProjectById.mockResolvedValue({
        ...mockProject,
        status: 'draft'
      });

      // Realizar solicitud
      await request(app)
        .get('/api/projects/public/draft-project')
        .expect('Content-Type', /json/)
        .expect(403);
    });
  });
}); 