const request = require('supertest');
const app = require('../../server');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

// Test user for authentication
const testUser = {
  id: 'test-user-id',
  email: 'test-user@example.com',
  role: 'partner'
};

// Generate a test token for authentication
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
};

describe('Verification API Endpoints', () => {
  let authToken;
  let testVerificationToken;
  
  // Set up test environment before tests
  beforeAll(async () => {
    // Create JWT token for test
    authToken = generateToken(testUser);
    
    // Clean up test tokens
    await prisma.verificationToken.deleteMany({
      where: { userId: testUser.id }
    });
    
    // Create a test verification token
    testVerificationToken = await prisma.verificationToken.create({
      data: {
        userId: testUser.id,
        token: 'test-verification-token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        used: false
      }
    });
  });
  
  // Clean up after tests
  afterAll(async () => {
    await prisma.verificationToken.deleteMany({
      where: { userId: testUser.id }
    });
    await prisma.$disconnect();
  });
  
  // 1. Test verification token verification
  describe('GET /api/verification/verify/:token', () => {
    it('should verify a valid token', async () => {
      const response = await request(app)
        .get(`/api/verification/verify/${testVerificationToken.token}`);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
    
    it('should return 400 for invalid token', async () => {
      const response = await request(app)
        .get('/api/verification/verify/invalid-token');
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
  
  // 2. Test verification status check
  describe('GET /api/verification/status', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/verification/status');
      
      expect(response.status).toBe(401);
    });
    
    it('should check verification status with auth', async () => {
      const response = await request(app)
        .get('/api/verification/status')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('verified');
      expect(response.body).toHaveProperty('success');
    });
  });
  
  // 3. Test sending verification email
  describe('POST /api/verification/send', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .post('/api/verification/send');
      
      expect(response.status).toBe(401);
    });
    
    it('should send verification email with auth', async () => {
      const response = await request(app)
        .post('/api/verification/send')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
  
  // 4. Test resending verification email
  describe('POST /api/verification/resend', () => {
    it('should require email', async () => {
      const response = await request(app)
        .post('/api/verification/resend')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
    
    it('should resend verification email with valid email', async () => {
      const response = await request(app)
        .post('/api/verification/resend')
        .send({ email: testUser.email });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
    
    it('should handle non-existent email', async () => {
      const response = await request(app)
        .post('/api/verification/resend')
        .send({ email: 'nonexistent@example.com' });
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
}); 