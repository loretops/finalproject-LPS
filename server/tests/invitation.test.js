const assert = require('assert');
const sinon = require('sinon');
const { v4: uuidv4 } = require('uuid');
const {
  createInvitation,
  getInvitations,
  verifyInvitation,
} = require('../controllers/invitation.controller');

// Mock del cliente Prisma
const prisma = {
  invitation: {
    create: sinon.stub(),
    findMany: sinon.stub(),
    findUnique: sinon.stub(),
    update: sinon.stub(),
  },
  user: {
    findUnique: sinon.stub(),
  },
};

describe('Controlador de Invitaciones', () => {
  beforeEach(() => {
    // Limpia los mocks antes de cada test
    sinon.reset();
  });

  describe('createInvitation', () => {
    it('debería crear una invitación con un token único y fecha de expiración', async () => {
      // Preparar
      const req = {
        body: { email: 'nuevo@ejemplo.com' },
        user: { id: 'user-id-1' },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 3); // Expiración en 3 días

      const mockInvitation = {
        id: uuidv4(),
        email: 'nuevo@ejemplo.com',
        token: 'some-token',
        invitedById: 'user-id-1',
        status: 'pending',
        expiresAt: tomorrow,
      };

      prisma.invitation.create.resolves(mockInvitation);

      // Actuar
      await createInvitation(req, res, prisma);

      // Verificar
      assert(prisma.invitation.create.calledOnce);
      assert(res.status.calledWith(201));
      assert(res.json.calledOnce);

      // Verificar que los datos pasados a create son correctos
      const createCall = prisma.invitation.create.getCall(0);
      assert.strictEqual(createCall.args[0].data.email, 'nuevo@ejemplo.com');
      assert.strictEqual(createCall.args[0].data.invitedById, 'user-id-1');
      assert(typeof createCall.args[0].data.token === 'string');
      assert(createCall.args[0].data.expiresAt instanceof Date);
    });

    it('debería devolver un error cuando falta el email', async () => {
      // Preparar
      const req = {
        body: {},
        user: { id: 'user-id-1' },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Actuar
      await createInvitation(req, res, prisma);

      // Verificar
      assert(!prisma.invitation.create.called);
      assert(res.status.calledWith(400));
      assert(res.json.calledOnce);
      const jsonCall = res.json.getCall(0);
      assert(jsonCall.args[0].error);
    });
  });

  describe('getInvitations', () => {
    it('debería listar todas las invitaciones del usuario actual', async () => {
      // Preparar
      const req = {
        user: { id: 'user-id-1' },
      };
      const res = {
        json: sinon.stub(),
      };

      const mockInvitations = [
        {
          id: uuidv4(),
          email: 'invitado1@ejemplo.com',
          status: 'pending',
        },
        {
          id: uuidv4(),
          email: 'invitado2@ejemplo.com',
          status: 'accepted',
        },
      ];

      prisma.invitation.findMany.resolves(mockInvitations);

      // Actuar
      await getInvitations(req, res, prisma);

      // Verificar
      assert(prisma.invitation.findMany.calledOnce);
      assert(
        prisma.invitation.findMany.calledWith({
          where: { invitedById: 'user-id-1' },
        })
      );
      assert(res.json.calledWith(mockInvitations));
    });
  });

  describe('verifyInvitation', () => {
    it('debería verificar un token válido y no expirado', async () => {
      // Preparar
      const req = {
        params: { token: 'valid-token' },
      };
      const res = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const mockInvitation = {
        id: uuidv4(),
        email: 'invitado@ejemplo.com',
        token: 'valid-token',
        status: 'pending',
        expiresAt: tomorrow,
      };

      prisma.invitation.findUnique.resolves(mockInvitation);

      // Actuar
      await verifyInvitation(req, res, prisma);

      // Verificar
      assert(prisma.invitation.findUnique.calledOnce);
      assert(
        res.json.calledWith({
          valid: true,
          invitation: mockInvitation,
        })
      );
    });

    it('debería rechazar un token expirado', async () => {
      // Preparar
      const req = {
        params: { token: 'expired-token' },
      };
      const res = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const mockInvitation = {
        id: uuidv4(),
        email: 'invitado@ejemplo.com',
        token: 'expired-token',
        status: 'pending',
        expiresAt: yesterday,
      };

      prisma.invitation.findUnique.resolves(mockInvitation);
      prisma.invitation.update.resolves({ ...mockInvitation, status: 'expired' });

      // Actuar
      await verifyInvitation(req, res, prisma);

      // Verificar
      assert(prisma.invitation.findUnique.calledOnce);
      assert(prisma.invitation.update.calledOnce);
      assert(res.status.calledWith(400));
      assert(res.json.calledOnce);
      const jsonCall = res.json.getCall(0);
      assert.strictEqual(jsonCall.args[0].valid, false);
      assert(jsonCall.args[0].error);
    });

    it('debería rechazar un token no encontrado', async () => {
      // Preparar
      const req = {
        params: { token: 'non-existent-token' },
      };
      const res = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      prisma.invitation.findUnique.resolves(null);

      // Actuar
      await verifyInvitation(req, res, prisma);

      // Verificar
      assert(prisma.invitation.findUnique.calledOnce);
      assert(res.status.calledWith(404));
      assert(res.json.calledOnce);
      const jsonCall = res.json.getCall(0);
      assert.strictEqual(jsonCall.args[0].valid, false);
      assert(jsonCall.args[0].error);
    });
  });
});
