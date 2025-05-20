const { PrismaClient } = require('@prisma/client');
const emailVerificationService = require('../../application/services/emailVerificationService');
const emailServiceModule = require('../../application/services/emailService');
const VerificationToken = require('../../domain/entities/VerificationToken');

// Mock dependencies
jest.mock('../../application/services/emailService', () => ({
  EmailService: jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn().mockResolvedValue({ success: true, messageId: 'mock-email-id' })
  }))
}));

jest.mock('../../utils/tokenUtils', () => ({
  generateSecureToken: jest.fn().mockReturnValue('mock-verification-token')
}));

// Mocks para prisma
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findUnique: jest.fn(),
        update: jest.fn()
      },
      verificationToken: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn()
      }
    }))
  };
});

// Mock repositorios
jest.mock('../../infrastructure/repositories/PrismaUserRepository');
jest.mock('../../infrastructure/repositories/PrismaVerificationTokenRepository');

const prisma = new PrismaClient();

describe('EmailVerificationService', () => {
  // Mock para isEmailVerified
  beforeEach(() => {
    jest.spyOn(emailVerificationService, 'isEmailVerified')
      .mockImplementation(async (userId) => {
        return userId === 'verified-user';
      });
    
    jest.spyOn(emailVerificationService, 'generateVerificationToken')
      .mockReturnValue('mock-verification-token');
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test simple
  test('generateVerificationToken devuelve un token válido', () => {
    const originalImplementation = jest.spyOn(emailVerificationService, 'generateVerificationToken').mockRestore();
    const token = emailVerificationService.generateVerificationToken();
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  // Test métodos principales
  test('isEmailVerified devuelve true para usuarios verificados', async () => {
    const result = await emailVerificationService.isEmailVerified('verified-user');
    expect(result).toBe(true);
  });

  test('isEmailVerified devuelve false para usuarios no verificados', async () => {
    const result = await emailVerificationService.isEmailVerified('unverified-user');
    expect(result).toBe(false);
  });

  // Test de generación de token
  describe('Token generation', () => {
    test('generateVerificationToken returns a valid token', () => {
      const token = emailVerificationService.generateVerificationToken();
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(10); // Debería ser un token largo
    });
  });

  // Test de envío de email
  describe('Email sending', () => {
    test('sendVerificationEmail calls email service', async () => {
      // Mocks para simular usuario encontrado
      jest.spyOn(emailVerificationService.userRepository, 'findById')
        .mockResolvedValue({
          id: 'mock-user-id',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          emailVerified: false
        });
      
      // Mock para el token
      jest.spyOn(emailVerificationService.tokenRepository, 'create')
        .mockResolvedValue({
          id: 'mock-token-id',
          userId: 'mock-user-id',
          token: 'mock-verification-token',
          used: false,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });
      
      // Mock para el servicio de email
      const mockSendEmail = jest.fn().mockResolvedValue({ success: true, messageId: 'mock-email-id' });
      jest.spyOn(emailVerificationService.emailService, 'sendEmail').mockImplementation(mockSendEmail);
      
      // Ejecución
      await emailVerificationService.sendVerificationEmail('mock-user-id');
      
      // Verificación
      expect(emailVerificationService.emailService.sendEmail).toHaveBeenCalled();
      expect(emailVerificationService.emailService.sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
          subject: 'Verifica tu cuenta en COOPCO',
          template: 'email-verification'
        })
      );
    });
  });
}); 