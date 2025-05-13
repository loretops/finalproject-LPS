const { PrismaClient } = require('@prisma/client');
const interestService = require('../../application/services/interestService');
const projectService = require('../../application/services/projectService');
const notificationService = require('../../application/services/notificationService');

// Mock prisma
jest.mock('@prisma/client', () => {
  const mockCreate = jest.fn().mockResolvedValue({
    id: 'mock-interest-id',
    userId: 'mock-user-id',
    projectId: 'mock-project-id',
    status: 'active',
    notes: 'Test notes',
    createdAt: new Date()
  });
  
  const mockFindUnique = jest.fn().mockImplementation((args) => {
    // Si busca un usuario
    if (args.where && args.where.id === 'mock-user-id') {
      return Promise.resolve({
        id: 'mock-user-id',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      });
    }
    // Si busca un proyecto
    if (args.where && args.where.id === 'mock-project-id') {
      return Promise.resolve({
        id: 'mock-project-id',
        createdBy: 'mock-manager-id',
        title: 'Test Project'
      });
    }
    // Si busca un interés
    if (args.where && args.where.id === 'mock-interest-id') {
      return Promise.resolve({
        id: 'mock-interest-id',
        userId: 'mock-user-id',
        projectId: 'mock-project-id',
        status: 'active',
        notes: 'Test notes'
      });
    }
    // Si no encuentra nada
    return Promise.resolve(null);
  });
  
  const mockUpdate = jest.fn().mockResolvedValue({
    id: 'mock-interest-id',
    status: 'updated-status'
  });
  
  const mockDelete = jest.fn().mockResolvedValue(true);
  
  const mockFindMany = jest.fn().mockResolvedValue([
    {
      id: 'mock-interest-id-1',
      userId: 'mock-user-id',
      projectId: 'mock-project-id-1',
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
        documents: [
          { fileUrl: 'http://example.com/image1.jpg' }
        ]
      }
    }
  ]);
  
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      interest: {
        create: mockCreate,
        findUnique: mockFindUnique,
        update: mockUpdate,
        delete: mockDelete,
        findMany: mockFindMany
      },
      user: {
        findUnique: mockFindUnique
      },
      project: {
        findUnique: mockFindUnique
      },
      notification: {
        create: mockCreate
      }
    }))
  };
});

// Mock repositorio
jest.mock('../../infrastructure/repositories/PrismaInterestRepository');
const PrismaInterestRepository = require('../../infrastructure/repositories/PrismaInterestRepository');

// Mock servicios
jest.mock('../../application/services/projectService');
jest.mock('../../application/services/notificationService');

describe('InterestService', () => {
  let mockRepository;
  
  beforeEach(() => {
    // Resetear todos los mocks
    jest.clearAllMocks();
    
    // Configurar mocks del repositorio
    mockRepository = PrismaInterestRepository.mockImplementation(() => ({
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
            documents: [
              { fileUrl: 'http://example.com/image1.jpg' }
            ]
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
    }));
    
    // Configurar mocks de servicios
    projectService.getProjectById.mockResolvedValue({
      id: 'mock-project-id',
      title: 'Test Project',
      status: 'published'
    });
    
    notificationService.createInterestNotification.mockResolvedValue({
      id: 'mock-notification-id'
    });
  });
  
  describe('registerInterest', () => {
    it('should register a new interest successfully', async () => {
      const result = await interestService.registerInterest('mock-user-id', 'mock-project-id', 'Test notes');
      
      expect(result).toBeDefined();
      expect(result.id).toBe('mock-interest-id');
      expect(result.status).toBe('active');
      expect(projectService.getProjectById).toHaveBeenCalledWith('mock-project-id');
      expect(notificationService.createInterestNotification).toHaveBeenCalled();
    });
    
    it('should throw an error if project is not published', async () => {
      projectService.getProjectById.mockResolvedValueOnce({
        id: 'mock-project-id',
        title: 'Test Project',
        status: 'draft'
      });
      
      await expect(
        interestService.registerInterest('mock-user-id', 'mock-project-id')
      ).rejects.toThrow('Solo se puede mostrar interés en proyectos publicados');
    });
    
    it('should throw an error if project does not exist', async () => {
      projectService.getProjectById.mockResolvedValueOnce(null);
      
      await expect(
        interestService.registerInterest('mock-user-id', 'mock-project-id')
      ).rejects.toThrow('Proyecto no encontrado');
    });
    
    it('should throw an error if user already has active interest', async () => {
      PrismaInterestRepository.mockImplementation(() => ({
        ...mockRepository(),
        findByUserAndProject: jest.fn().mockResolvedValue({
          id: 'existing-interest-id',
          status: 'active'
        })
      }));
      
      await expect(
        interestService.registerInterest('mock-user-id', 'mock-project-id')
      ).rejects.toThrow('Ya has mostrado interés en este proyecto');
    });
  });
  
  describe('getUserInterests', () => {
    it('should return user interests with project data', async () => {
      const results = await interestService.getUserInterests('mock-user-id');
      
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].project).toBeDefined();
      expect(results[0].project.title).toBe('Project 1');
    });
    
    it('should throw error if userId is not provided', async () => {
      await expect(
        interestService.getUserInterests()
      ).rejects.toThrow('El ID del usuario es obligatorio');
    });
  });
  
  describe('removeInterest', () => {
    it('should successfully remove an interest', async () => {
      const result = await interestService.removeInterest('mock-interest-id', 'mock-user-id');
      
      expect(result).toBe(true);
    });
    
    it('should throw error if interest does not exist', async () => {
      // Mock un interés que no existe
      const prisma = new PrismaClient();
      prisma.interest.findUnique.mockResolvedValueOnce(null);
      
      await expect(
        interestService.removeInterest('non-existent-id', 'mock-user-id')
      ).rejects.toThrow('Interés no encontrado');
    });
    
    it('should throw error if user does not own the interest', async () => {
      // Mock un interés que pertenece a otro usuario
      const prisma = new PrismaClient();
      prisma.interest.findUnique.mockResolvedValueOnce({
        id: 'mock-interest-id',
        userId: 'other-user-id',
        projectId: 'mock-project-id'
      });
      
      await expect(
        interestService.removeInterest('mock-interest-id', 'mock-user-id')
      ).rejects.toThrow('No tienes permiso para eliminar este interés');
    });
  });
  
  describe('changeInterestStatus', () => {
    it('should update interest status successfully', async () => {
      const result = await interestService.changeInterestStatus('mock-interest-id', 'converted');
      
      expect(result).toBeDefined();
      expect(result.status).toBe('updated-status');
    });
    
    it('should throw error for invalid status', async () => {
      await expect(
        interestService.changeInterestStatus('mock-interest-id', 'invalid-status')
      ).rejects.toThrow('Estado inválido');
    });
  });
}); 