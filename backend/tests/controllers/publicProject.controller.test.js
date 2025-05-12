const request = require('supertest');
const app = require('../../server');
const projectService = require('../../application/services/projectService');
const publicProjectController = require('../../interfaces/http/controllers/publicProject.controller');

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
  next();
});

// Mock del servicio de proyectos
jest.mock('../../application/services/projectService');

describe('PublicProjectController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('debe devolver un listado de proyectos publicados', async () => {
      // Arrange
      const mockProjects = {
        data: [
          { id: '1', title: 'Project 1', status: 'published' },
          { id: '2', title: 'Project 2', status: 'published' }
        ],
        pagination: {
          totalItems: 2,
          totalPages: 1,
          currentPage: 1
        }
      };

      projectService.getPublishedProjects.mockResolvedValue(mockProjects);

      // Act
      const res = await request(app)
        .get('/api/projects/public')
        .query({ page: 1, limit: 10 });

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockProjects);
      expect(projectService.getPublishedProjects).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          limit: 10
        })
      );
    });

    it('debe aplicar filtros de consulta correctamente', async () => {
      // Arrange
      const mockProjects = {
        data: [{ id: '1', title: 'Filtered Project', propertyType: 'Residential' }],
        pagination: { totalItems: 1, totalPages: 1, currentPage: 1 }
      };

      projectService.getPublishedProjects.mockResolvedValue(mockProjects);

      // Act
      const res = await request(app)
        .get('/api/projects/public')
        .query({
          propertyType: 'Residential',
          minRoi: 10,
          location: 'Madrid',
          sortField: 'createdAt',
          sortDirection: 'desc'
        });

      // Assert
      expect(res.status).toBe(200);
      expect(projectService.getPublishedProjects).toHaveBeenCalledWith(
        expect.objectContaining({
          propertyType: 'Residential',
          minRoi: '10',
          location: 'Madrid',
          sortField: 'createdAt',
          sortDirection: 'desc'
        })
      );
    });

    it('debe manejar errores correctamente', async () => {
      // Arrange
      projectService.getPublishedProjects.mockRejectedValue(new Error('Database error'));

      // Act
      const res = await request(app).get('/api/projects/public');

      // Assert
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('Error');
    });
  });

  describe('getById', () => {
    it('debe devolver un proyecto publicado con documentos filtrados por nivel de acceso', async () => {
      // Arrange
      const mockProject = {
        id: 'test-project-id',
        title: 'Test Project',
        description: 'Test Description',
        status: 'published',
        minimumInvestment: 10000,
        targetAmount: 100000,
        currentAmount: 0,
        expectedRoi: 12.5,
        location: 'Madrid',
        propertyType: 'Residential',
        draft: false,
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        creator: { 
          id: 'test-user-id',
          name: 'John Doe'
        },
        documents: [
          {
            id: 'doc-1',
            name: 'Public Document',
            documentType: 'legal',
            accessLevel: 'public',
            securityLevel: 'view_only',
            url: 'http://example.com/doc1',
            createdAt: new Date().toISOString()
          },
          {
            id: 'doc-2',
            name: 'Partner Document',
            documentType: 'economic',
            accessLevel: 'partner',
            securityLevel: 'view_only',
            url: 'http://example.com/doc2',
            createdAt: new Date().toISOString()
          }
        ]
      };

      // Mock del método getProjectById del servicio
      projectService.getProjectById.mockResolvedValue(mockProject);

      const req = {
        params: { id: 'test-project-id' },
        user: { id: 'test-user-id', role: 'partner' } // Usuario con rol partner
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Act
      await publicProjectController.getById(req, res);

      // Assert
      expect(projectService.getProjectById).toHaveBeenCalledWith('test-project-id', { userRole: 'partner' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: 'test-project-id',
        status: 'published',
        documents: expect.arrayContaining([
          expect.objectContaining({ accessLevel: 'public' }),
          expect.objectContaining({ accessLevel: 'partner' })
        ])
      }));
    });

    it('debe devolver 404 si el proyecto no existe', async () => {
      // Arrange
      projectService.getProjectById.mockResolvedValue(null);

      const req = {
        params: { id: 'non-existent-id' },
        user: { id: 'test-user-id', role: 'partner' }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Act
      await publicProjectController.getById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('no encontrado')
      }));
    });

    it('debe devolver 403 si el proyecto no está publicado', async () => {
      // Arrange
      projectService.getProjectById.mockResolvedValue({
        id: 'draft-project-id',
        status: 'draft',
        title: 'Draft Project'
      });

      const req = {
        params: { id: 'draft-project-id' },
        user: { id: 'test-user-id', role: 'partner' }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Act
      await publicProjectController.getById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('No tienes acceso')
      }));
    });
  });
}); 