const request = require('supertest');
const app = require('../../server');
const interestService = require('../../application/services/interestService');

// Mock interestService
jest.mock('../../application/services/interestService');

// Mock middleware de autenticación
jest.mock('../../middleware/jwtAuthMiddleware', () => (req, res, next) => {
  // Simular usuario autenticado
  req.user = {
    id: 'test-user-id',
    role: 'partner'
  };
  next();
});

// Mock middleware de roles
jest.mock('../../middleware/roleAuthMiddleware', () => () => (req, res, next) => {
  next();
});

describe('Interest Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/interests', () => {
    it('debería registrar un nuevo interés correctamente', async () => {
      // Mock para el servicio
      interestService.registerInterest.mockResolvedValue({
        id: 'test-interest-id',
        userId: 'test-user-id',
        projectId: 'test-project-id',
        status: 'active',
        notes: 'Test notes',
        createdAt: new Date()
      });

      const response = await request(app)
        .post('/api/interests')
        .send({
          projectId: 'test-project-id',
          notes: 'Test notes'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id', 'test-interest-id');
      expect(interestService.registerInterest).toHaveBeenCalledWith(
        'test-user-id',
        'test-project-id',
        'Test notes'
      );
    });

    it('debería devolver 400 si falta el projectId', async () => {
      const response = await request(app)
        .post('/api/interests')
        .send({
          notes: 'Test notes'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Se requiere el ID del proyecto');
      expect(interestService.registerInterest).not.toHaveBeenCalled();
    });

    it('debería devolver 409 si ya existe un interés activo', async () => {
      interestService.registerInterest.mockRejectedValue(
        new Error('Ya has mostrado interés en este proyecto')
      );

      const response = await request(app)
        .post('/api/interests')
        .send({
          projectId: 'test-project-id'
        });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('message', 'Ya has mostrado interés en este proyecto');
    });
  });

  describe('GET /api/interests/user', () => {
    it('debería devolver los intereses del usuario', async () => {
      interestService.getUserInterests.mockResolvedValue([
        {
          id: 'test-interest-id-1',
          status: 'active',
          notes: 'Interest 1',
          project: {
            id: 'test-project-id-1',
            title: 'Project 1'
          }
        }
      ]);

      const response = await request(app)
        .get('/api/interests/user');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty('id', 'test-interest-id-1');
      expect(interestService.getUserInterests).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/interests/:id', () => {
    it('debería eliminar un interés existente', async () => {
      interestService.removeInterest.mockResolvedValue(true);

      const response = await request(app)
        .delete('/api/interests/test-interest-id');

      expect(response.status).toBe(204);
      expect(interestService.removeInterest).toHaveBeenCalledWith(
        'test-interest-id',
        'test-user-id'
      );
    });

    it('debería devolver 404 si el interés no existe', async () => {
      interestService.removeInterest.mockRejectedValue(
        new Error('Interés no encontrado')
      );

      const response = await request(app)
        .delete('/api/interests/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Interés no encontrado');
    });
  });
}); 