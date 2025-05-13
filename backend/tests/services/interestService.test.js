const interestService = require('../../application/services/interestService');
const projectService = require('../../application/services/projectService');
const notificationService = require('../../application/services/notificationService');
const PrismaInterestRepository = require('../../infrastructure/repositories/PrismaInterestRepository');

// Mock de dependencias
jest.mock('../../application/services/projectService');
jest.mock('../../application/services/notificationService');
jest.mock('../../infrastructure/repositories/PrismaInterestRepository');
jest.mock('@prisma/client');

describe('InterestService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock del repositorio
    const mockInterestRepo = {
      create: jest.fn().mockResolvedValue({
        id: 'mock-interest-id',
        userId: 'mock-user-id',
        projectId: 'mock-project-id',
        status: 'active',
        notes: 'Test notes',
        createdAt: new Date()
      }),
      findByUserAndProject: jest.fn().mockResolvedValue(null),
      findByUser: jest.fn().mockResolvedValue([
        {
          id: 'mock-interest-id-1',
          status: 'active',
          notes: 'Test notes 1',
          createdAt: new Date(),
          project: {
            id: 'mock-project-id-1',
            title: 'Project 1',
            description: 'Description 1',
            status: 'published',
            expectedRoi: 15.5,
            minimumInvestment: 1000,
            location: 'Madrid',
            propertyType: 'residential',
            documents: [{ fileUrl: 'http://example.com/image1.jpg' }]
          }
        }
      ]),
      findByProject: jest.fn().mockResolvedValue([
        {
          id: 'mock-interest-id-1',
          status: 'active',
          notes: 'Test notes 1',
          createdAt: new Date(),
          user: {
            id: 'mock-user-id',
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com'
          }
        }
      ]),
      updateStatus: jest.fn().mockResolvedValue({
        id: 'mock-interest-id',
        status: 'updated-status'
      }),
      delete: jest.fn().mockResolvedValue(true)
    };
    
    // Reemplazar el constructor con una función que devuelve el mock
    PrismaInterestRepository.mockImplementation(() => mockInterestRepo);
    
    // Mock de Prisma Client para la inyección directa
    const { PrismaClient } = require('@prisma/client');
    PrismaClient.mockImplementation(() => ({
      interest: {
        findUnique: jest.fn().mockImplementation((args) => {
          if (args.where.id === 'mock-interest-id') {
            return Promise.resolve({
              id: 'mock-interest-id',
              userId: 'mock-user-id',
              projectId: 'mock-project-id',
              status: 'active',
              notes: 'Test notes'
            });
          } else if (args.where.id === 'non-existent-id') {
            return Promise.resolve(null);
          } else if (args.where.userId_projectId) {
            return Promise.resolve(null);
          }
          return Promise.resolve(null);
        }),
        update: jest.fn().mockResolvedValue({
          id: 'mock-interest-id',
          status: 'updated-status',
          notes: 'Updated notes'
        })
      },
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'mock-user-id',
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com'
        })
      },
      project: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'mock-project-id',
          createdBy: 'mock-manager-id',
          title: 'Test Project'
        })
      }
    }));
    
    // Mock de servicios dependientes
    projectService.getProjectById.mockResolvedValue({
      id: 'mock-project-id',
      title: 'Test Project',
      status: 'published'
    });
    
    notificationService.createInterestNotification.mockResolvedValue({
      id: 'mock-notification-id'
    });
  });
  
  describe('Tests básicos de funcionalidad', () => {
    test('registerInterest - proyecto válido y usuario sin interés previo', async () => {
      // El setup ya incluye un mock de getProjectById que devuelve un proyecto publicado
      // y findByUserAndProject devuelve null (sin interés previo)
      
      const result = await interestService.registerInterest('mock-user-id', 'mock-project-id', 'Test notes');
      
      expect(projectService.getProjectById).toHaveBeenCalledWith('mock-project-id');
      expect(PrismaInterestRepository.mock.instances[0].findByUserAndProject).toHaveBeenCalledWith('mock-user-id', 'mock-project-id');
      expect(PrismaInterestRepository.mock.instances[0].create).toHaveBeenCalled();
      expect(notificationService.createInterestNotification).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.id).toBe('mock-interest-id');
    });
    
    test('registerInterest - error si proyecto no está publicado', async () => {
      // Modificar el mock para este test
      projectService.getProjectById.mockResolvedValueOnce({
        id: 'mock-project-id',
        title: 'Test Project',
        status: 'draft' // Proyecto en borrador, no publicado
      });
      
      await expect(
        interestService.registerInterest('mock-user-id', 'mock-project-id')
      ).rejects.toThrow('Solo se puede mostrar interés en proyectos publicados');
    });
    
    test('registerInterest - error si proyecto no existe', async () => {
      projectService.getProjectById.mockResolvedValueOnce(null);
      
      await expect(
        interestService.registerInterest('mock-user-id', 'mock-project-id')
      ).rejects.toThrow('Proyecto no encontrado');
    });
    
    test('registerInterest - error si usuario ya tiene interés activo', async () => {
      // Modificar el mock para devolver un interés existente
      PrismaInterestRepository.mock.instances[0].findByUserAndProject.mockResolvedValueOnce({
        id: 'existing-interest-id',
        userId: 'mock-user-id',
        projectId: 'mock-project-id',
        status: 'active'
      });
      
      await expect(
        interestService.registerInterest('mock-user-id', 'mock-project-id')
      ).rejects.toThrow('Ya has mostrado interés en este proyecto');
    });
    
    test('getUserInterests - devuelve intereses de usuario con datos de proyecto', async () => {
      const results = await interestService.getUserInterests('mock-user-id');
      
      expect(PrismaInterestRepository.mock.instances[0].findByUser).toHaveBeenCalledWith('mock-user-id', {});
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].project).toBeDefined();
      expect(results[0].project.title).toBe('Project 1');
    });
    
    test('changeInterestStatus - actualiza estado correctamente', async () => {
      const result = await interestService.changeInterestStatus('mock-interest-id', 'converted');
      
      expect(PrismaInterestRepository.mock.instances[0].updateStatus).toHaveBeenCalledWith('mock-interest-id', 'converted');
      expect(result).toBeDefined();
      expect(result.status).toBe('updated-status');
    });
    
    test('changeInterestStatus - error con estado inválido', async () => {
      await expect(
        interestService.changeInterestStatus('mock-interest-id', 'invalid-status')
      ).rejects.toThrow('Estado inválido');
      
      expect(PrismaInterestRepository.mock.instances[0].updateStatus).not.toHaveBeenCalled();
    });
  });
}); 