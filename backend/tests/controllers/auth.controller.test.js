const authController = require('../../interfaces/http/controllers/auth.controller');
const invitationService = require('../../application/services/invitationService');
const registerUser = require('../../application/use_cases/registerUser');
const loginUser = require('../../application/use_cases/loginUser');

// Mock the dependencies
jest.mock('../../application/services/invitationService');
jest.mock('../../application/use_cases/registerUser');
jest.mock('../../application/use_cases/loginUser');

describe('AuthController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('register', () => {
    const mockValidToken = 'valid-token';
    const mockEmail = 'test@example.com';
    const mockPassword = 'Password123';
    const mockName = 'Test User';
    const mockJwtToken = 'jwt-token-123';

    it('should return 400 if required fields are missing', async () => {
      // Arrange
      req.body = { email: mockEmail, password: mockPassword }; // Missing name and token

      // Act
      await authController.register(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('All fields are required')
      }));
    });

    it('should validate the invitation token', async () => {
      // Arrange
      req.body = {
        name: mockName,
        email: mockEmail,
        password: mockPassword,
        token: mockValidToken
      };
      invitationService.validateInvitationToken.mockResolvedValue({
        isValid: true,
        email: mockEmail
      });

      // Act
      await authController.register(req, res);

      // Assert
      expect(invitationService.validateInvitationToken).toHaveBeenCalledWith(mockValidToken);
    });

    it('should return 410 if invitation token is expired', async () => {
      // Arrange
      req.body = {
        name: mockName,
        email: mockEmail,
        password: mockPassword,
        token: 'expired-token'
      };
      invitationService.validateInvitationToken.mockResolvedValue({
        isValid: false,
        reason: 'expired'
      });

      // Act
      await authController.register(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(410);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('expired')
      }));
    });

    it('should return 400 if email does not match invitation', async () => {
      // Arrange
      req.body = {
        name: mockName,
        email: 'wrong@example.com',
        password: mockPassword,
        token: mockValidToken
      };
      invitationService.validateInvitationToken.mockResolvedValue({
        isValid: true,
        email: mockEmail
      });

      // Act
      await authController.register(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('email does not match')
      }));
    });

    it('should register user and mark invitation as used on success', async () => {
      // Arrange
      req.body = {
        name: mockName,
        email: mockEmail,
        password: mockPassword,
        token: mockValidToken
      };
      
      invitationService.validateInvitationToken.mockResolvedValue({
        isValid: true,
        email: mockEmail
      });
      
      registerUser.mockResolvedValue({ id: '123', name: mockName, email: mockEmail });
      loginUser.mockResolvedValue(mockJwtToken);

      // Act
      await authController.register(req, res);

      // Assert
      expect(registerUser).toHaveBeenCalledWith(expect.objectContaining({
        name: mockName,
        email: mockEmail,
        password: mockPassword,
        role: 'partner'
      }));
      
      expect(invitationService.markInvitationAsUsed).toHaveBeenCalledWith(mockValidToken);
      
      expect(loginUser).toHaveBeenCalledWith({ email: mockEmail, password: mockPassword });
      
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Registration successful.',
        token: mockJwtToken
      }));
    });

    it('should handle user already exists error', async () => {
      // Arrange
      req.body = {
        name: mockName,
        email: mockEmail,
        password: mockPassword,
        token: mockValidToken
      };
      
      invitationService.validateInvitationToken.mockResolvedValue({
        isValid: true,
        email: mockEmail
      });
      
      registerUser.mockRejectedValue(new Error('A user with this email already exists'));

      // Act
      await authController.register(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'A user with this email already exists.'
      }));
    });
  });
}); 