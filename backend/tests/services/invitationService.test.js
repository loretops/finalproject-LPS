const { PrismaClient, InvitationStatus } = require('@prisma/client');
const invitationService = require('../../application/services/invitationService');
const emailService = require('../../application/services/emailService');

const prisma = new PrismaClient();

// Mock the emailService
jest.mock('../../application/services/emailService', () => ({
  sendInvitationEmail: jest.fn().mockResolvedValue({ messageId: 'mock-email-id' })
}));

let testUser; // Para almacenar el usuario que invita
let createdInvitations = []; // Para llevar registro de qué limpiar

// --- Helper Functions --- 
const createTestUser = async () => {
  // Obtener el rol manager primero para asegurar que existe
  const managerRole = await prisma.role.findUnique({ where: { name: 'manager' } });
  if (!managerRole) {
    throw new Error('Role "manager" not found. Seed roles first.');
  }

  return await prisma.user.upsert({
    where: { email: 'inviter@test.com' },
    update: {
        firstName: 'Inviter',
        lastName: 'Test',
    },
    create: {
      email: 'inviter@test.com',
      passwordHash: 'hashedpassword',
      roleId: managerRole.id,
      firstName: 'Inviter',
      lastName: 'Test',
      status: 'active',
      emailVerified: true,
    },
    include: { role: true },
  });
};

// --- Test Setup & Teardown --- 
beforeAll(async () => {
  // Crear el usuario invitador una vez para toda la suite
  testUser = await createTestUser();
});

afterEach(async () => {
  // Limpiar invitaciones creadas en CADA test
  if (createdInvitations.length > 0) {
    const idsToDelete = createdInvitations.map(inv => inv.id);
    await prisma.invitation.deleteMany({
      where: { id: { in: idsToDelete } },
    });
    createdInvitations = []; // Resetear el array
  }
  // Clear mocks between tests if they were called
  emailService.sendInvitationEmail.mockClear(); 
});

afterAll(async () => {
  // Limpieza final (opcional, por si afterEach falla)
  if (testUser) {
      // Podríamos eliminar invitaciones restantes de este usuario
      await prisma.invitation.deleteMany({ where: { invitedBy: testUser.id } });
      // Y eliminar el usuario de prueba
      await prisma.user.delete({ where: { id: testUser.id } });
  }
  await prisma.$disconnect();
});

// --- Tests para InvitationService ---
describe('InvitationService', () => {

  describe('createInvitation', () => {
    it('should create a new invitation and attempt to send email', async () => {
      const testEmail = 'new_invitee@test.com';
      const invitation = await invitationService.createInvitation(testEmail, testUser.id);
      createdInvitations.push(invitation);

      // Verificaciones
      expect(invitation).toBeDefined();
      expect(invitation.email).toBe(testEmail);
      expect(invitation.invitedBy).toBe(testUser.id);
      expect(invitation.token).toBeDefined();
      expect(invitation.token.length).toBe(64); // 32 bytes en hex
      expect(invitation.status).toBe(InvitationStatus.PENDING);
      expect(invitation.expiresAt).toBeInstanceOf(Date);
      
      // Verificar que la fecha de expiración sea aprox 7 días en el futuro
      const now = new Date();
      const expectedExpiration = new Date(now.setDate(now.getDate() + 7));
      // Comparamos solo día, mes y año (margen de 1 día por si acaso)
      expect(invitation.expiresAt.toISOString().split('T')[0]).toBe(expectedExpiration.toISOString().split('T')[0]);

      // Opcional: verificar que existe en la BD
      const dbInvitation = await prisma.invitation.findUnique({ where: { id: invitation.id } });
      expect(dbInvitation).not.toBeNull();
      expect(dbInvitation.token).toBe(invitation.token);

      // Check if the mocked email function was called
      expect(emailService.sendInvitationEmail).toHaveBeenCalledTimes(1);
      expect(emailService.sendInvitationEmail).toHaveBeenCalledWith(testEmail, expect.any(String)); // Check email and token presence
    });

    it('should throw an error if an active invitation already exists (and not send email)', async () => {
      const testEmail = 'duplicate_invitee@test.com';
      
      // 1. Crear una primera invitación (exitosa)
      const firstInvitation = await invitationService.createInvitation(testEmail, testUser.id);
      createdInvitations.push(firstInvitation); // Registrar para limpieza
      emailService.sendInvitationEmail.mockClear(); // Clear previous call

      // 2. Intentar crear OTRA invitación para el MISMO email
      // Usamos expect().rejects para verificar que la promesa sea rechazada con un error
      await expect(invitationService.createInvitation(testEmail, testUser.id))
        .rejects
        .toThrow('An active invitation already exists for this email address.');
        
      // Ensure email was NOT sent on the failed attempt
      expect(emailService.sendInvitationEmail).not.toHaveBeenCalled();
    });

    it('should throw an error if email is missing', async () => {
      await expect(invitationService.createInvitation(null, testUser.id))
        .rejects
        .toThrow('Email and inviter ID are required.');
      expect(emailService.sendInvitationEmail).not.toHaveBeenCalled(); 
    });
    
    it('should throw an error if invitedById is missing', async () => {
      await expect(invitationService.createInvitation('another@test.com', null))
        .rejects
        .toThrow('Email and inviter ID are required.');
      expect(emailService.sendInvitationEmail).not.toHaveBeenCalled();
    });
  });

  describe('validateInvitationToken', () => {
    let validInvitation;

    beforeEach(async () => {
      // Crear una invitación válida antes de cada test de validación
      validInvitation = await invitationService.createInvitation('valid_token@test.com', testUser.id);
      createdInvitations.push(validInvitation);
    });

    it('should return isValid: true for a valid, pending, non-expired token', async () => {
      const result = await invitationService.validateInvitationToken(validInvitation.token);
      expect(result.isValid).toBe(true);
      expect(result.reason).toBeUndefined();
      expect(result.email).toBe('valid_token@test.com');
      expect(result.invitation.id).toBe(validInvitation.id);
    });

    it('should return isValid: false for a used token', async () => {
      // Marcar como usada
      await invitationService.markInvitationAsUsed(validInvitation.token);
      
      const result = await invitationService.validateInvitationToken(validInvitation.token);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('used');
      expect(result.invitation.status).toBe(InvitationStatus.USED);
    });

    it('should return isValid: false for an expired token', async () => {
      // Modificar la fecha de expiración en la BD para que esté en el pasado
      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() - 1); // Ayer
      await prisma.invitation.update({
        where: { id: validInvitation.id },
        data: { expiresAt: expiredDate }
      });

      const result = await invitationService.validateInvitationToken(validInvitation.token);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('expired');
      
      // Verificar que el servicio también la marca como EXPIRED en la BD
      const dbInvitation = await prisma.invitation.findUnique({ where: { id: validInvitation.id } });
      expect(dbInvitation.status).toBe(InvitationStatus.EXPIRED);
    });

    it('should return isValid: false for a non-existent token', async () => {
      const result = await invitationService.validateInvitationToken('non_existent_token');
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('not_found');
    });

    it('should return isValid: false if token is missing or null', async () => {
      let result = await invitationService.validateInvitationToken(null);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('Token is required');

      result = await invitationService.validateInvitationToken('');
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('Token is required'); // O podría ser not_found dependiendo de la implementación de findByToken
    });

  });

  describe('markInvitationAsUsed', () => {
    let invitationToUse;

    beforeEach(async () => {
      // Crear una invitación válida para marcar como usada
      invitationToUse = await invitationService.createInvitation('to_be_used@test.com', testUser.id);
      createdInvitations.push(invitationToUse);
    });

    it('should update the invitation status to USED', async () => {
      const updatedInvitation = await invitationService.markInvitationAsUsed(invitationToUse.token);
      expect(updatedInvitation).toBeDefined();
      expect(updatedInvitation.id).toBe(invitationToUse.id);
      expect(updatedInvitation.status).toBe(InvitationStatus.USED);

      // Verificar en la BD
      const dbInvitation = await prisma.invitation.findUnique({ where: { id: invitationToUse.id } });
      expect(dbInvitation.status).toBe(InvitationStatus.USED);
    });

    it('should throw an error if trying to mark a non-existent token as used', async () => {
      await expect(invitationService.markInvitationAsUsed('non_existent_token'))
        .rejects
        .toThrow(); // O un error más específico si el repositorio lo lanza
    });
  });

  describe('markInvitationAsExpired', () => {
    let invitationToExpire;

    beforeEach(async () => {
      // Crear una invitación válida para marcar como expirada
      invitationToExpire = await invitationService.createInvitation('to_be_expired@test.com', testUser.id);
      createdInvitations.push(invitationToExpire);
    });

    it('should update the invitation status to EXPIRED', async () => {
      const updatedInvitation = await invitationService.markInvitationAsExpired(invitationToExpire.token);
      expect(updatedInvitation).toBeDefined();
      expect(updatedInvitation.id).toBe(invitationToExpire.id);
      expect(updatedInvitation.status).toBe(InvitationStatus.EXPIRED);

      // Verificar en la BD
      const dbInvitation = await prisma.invitation.findUnique({ where: { id: invitationToExpire.id } });
      expect(dbInvitation.status).toBe(InvitationStatus.EXPIRED);
    });

    it('should throw an error if trying to mark a non-existent token as expired', async () => {
      await expect(invitationService.markInvitationAsExpired('non_existent_token'))
        .rejects
        .toThrow(); // O un error más específico
    });
  });

}); 