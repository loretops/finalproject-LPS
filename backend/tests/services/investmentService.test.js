const { PrismaClient } = require('@prisma/client');
const InvestmentService = require('../../application/services/investmentService');
const { Investment } = require('../../domain/entities/Investment');
const Project = require('../../domain/entities/Project');

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    investment: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      count: jest.fn()
    },
    project: {
      findUnique: jest.fn(),
      update: jest.fn()
    },
    $transaction: jest.fn(callback => callback(mockPrismaClient))
  };
  
  return {
    PrismaClient: jest.fn(() => mockPrismaClient)
  };
});

// Mock NotificationService
jest.mock('../../application/services/notificationService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      createNotification: jest.fn().mockResolvedValue({ id: 'notification-id' })
    };
  });
});

describe('InvestmentService', () => {
  let investmentService;
  let prisma;
  
  beforeEach(() => {
    jest.clearAllMocks();
    investmentService = new InvestmentService();
    prisma = new PrismaClient();
  });
  
  describe('createInvestment', () => {
    it('should create a new investment for a valid project', async () => {
      // Arrange
      const mockProject = {
        id: 'project-id',
        title: 'Test Project',
        status: 'published',
        minimumInvestment: 1000,
        targetAmount: 50000,
        currentAmount: 0,
        draft: false,
        createdBy: 'manager-id'
      };
      
      const investmentData = {
        userId: 'user-id',
        projectId: 'project-id',
        amount: 2000,
        notes: 'Test investment'
      };
      
      const mockCreatedInvestment = {
        id: 'investment-id',
        ...investmentData,
        status: 'pending',
        investedAt: new Date()
      };
      
      // Mock prisma client responses
      prisma.project.findUnique.mockResolvedValue(mockProject);
      prisma.investment.create.mockResolvedValue(mockCreatedInvestment);
      prisma.project.update.mockResolvedValue({
        ...mockProject,
        currentAmount: mockProject.currentAmount + investmentData.amount
      });
      
      // Act
      const result = await investmentService.createInvestment(investmentData);
      
      // Assert
      expect(prisma.project.findUnique).toHaveBeenCalledWith({
        where: { id: investmentData.projectId }
      });
      expect(prisma.investment.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          userId: investmentData.userId,
          projectId: investmentData.projectId,
          amount: investmentData.amount,
          notes: investmentData.notes,
          status: 'pending'
        }),
        include: expect.any(Object)
      }));
      expect(prisma.project.update).toHaveBeenCalledWith({
        where: { id: investmentData.projectId },
        data: {
          currentAmount: {
            increment: parseFloat(investmentData.amount)
          }
        }
      });
      expect(result).toEqual(mockCreatedInvestment);
    });
    
    it('should throw an error if project does not exist', async () => {
      // Arrange
      const investmentData = {
        userId: 'user-id',
        projectId: 'non-existent-project',
        amount: 2000
      };
      
      // Mock prisma client responses
      prisma.project.findUnique.mockResolvedValue(null);
      
      // Act & Assert
      await expect(investmentService.createInvestment(investmentData))
        .rejects.toThrow('El proyecto especificado no existe');
      
      expect(prisma.investment.create).not.toHaveBeenCalled();
      expect(prisma.project.update).not.toHaveBeenCalled();
    });
    
    it('should throw an error if investment amount is below minimum', async () => {
      // Arrange
      const mockProject = {
        id: 'project-id',
        title: 'Test Project',
        status: 'published',
        minimumInvestment: 5000,
        targetAmount: 50000,
        currentAmount: 0,
        draft: false
      };
      
      const investmentData = {
        userId: 'user-id',
        projectId: 'project-id',
        amount: 1000,
        notes: 'Test investment'
      };
      
      // Mock prisma client responses
      prisma.project.findUnique.mockResolvedValue(mockProject);
      
      // Act & Assert
      await expect(investmentService.createInvestment(investmentData))
        .rejects.toThrow(`La inversión debe ser al menos de ${mockProject.minimumInvestment}`);
      
      expect(prisma.investment.create).not.toHaveBeenCalled();
      expect(prisma.project.update).not.toHaveBeenCalled();
    });
  });
  
  describe('getUserInvestments', () => {
    it('should return user investments with pagination', async () => {
      // Arrange
      const userId = 'user-id';
      const options = { status: 'pending', page: 2, limit: 10 };
      const mockInvestments = [
        { id: 'investment-1', userId, projectId: 'project-1', amount: 2000 },
        { id: 'investment-2', userId, projectId: 'project-2', amount: 3000 }
      ];
      const totalCount = 25;
      
      // Mock prisma client responses
      prisma.investment.findMany.mockResolvedValue(mockInvestments);
      prisma.investment.count.mockResolvedValue(totalCount);
      
      // Act
      const result = await investmentService.getUserInvestments(userId, options);
      
      // Assert
      expect(prisma.investment.findMany).toHaveBeenCalledWith({
        where: { userId, status: options.status },
        include: expect.any(Object),
        orderBy: { investedAt: 'desc' },
        skip: 10, // (page - 1) * limit
        take: 10
      });
      expect(prisma.investment.count).toHaveBeenCalledWith({
        where: { userId, status: options.status }
      });
      expect(result).toEqual({
        data: mockInvestments,
        pagination: {
          total: totalCount,
          page: options.page,
          limit: options.limit,
          totalPages: Math.ceil(totalCount / options.limit)
        }
      });
    });
  });
  
  describe('cancelInvestment', () => {
    it('should cancel a pending investment', async () => {
      // Arrange
      const investmentId = 'investment-id';
      const userId = 'user-id';
      const mockInvestment = {
        id: investmentId,
        userId,
        projectId: 'project-id',
        amount: 2000,
        status: 'pending'
      };
      const mockUpdatedInvestment = {
        ...mockInvestment,
        status: 'canceled'
      };
      
      // Mock prisma client responses
      prisma.investment.findFirst.mockResolvedValue(mockInvestment);
      prisma.investment.update.mockResolvedValue(mockUpdatedInvestment);
      
      // Act
      const result = await investmentService.cancelInvestment(investmentId, userId);
      
      // Assert
      expect(prisma.investment.findFirst).toHaveBeenCalledWith({
        where: { id: investmentId, userId }
      });
      expect(result).toBeDefined();
    });
    
    it('should throw an error if investment is not in pending status', async () => {
      // Arrange
      const investmentId = 'investment-id';
      const userId = 'user-id';
      const mockInvestment = {
        id: investmentId,
        userId,
        projectId: 'project-id',
        amount: 2000,
        status: 'confirmed'
      };
      
      // Mock prisma client responses
      prisma.investment.findFirst.mockResolvedValue(mockInvestment);
      
      // Act & Assert
      await expect(investmentService.cancelInvestment(investmentId, userId))
        .rejects.toThrow('Solo se pueden cancelar inversiones en estado pendiente');
    });
  });
}); 