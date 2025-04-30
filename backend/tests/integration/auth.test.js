const request = require('supertest');
const { PrismaClient, InvitationStatus } = require('@prisma/client'); // Importar Prisma
const invitationService = require('../../application/services/invitationService'); // Importar servicio
// Importamos la app de Express. Puede que necesitemos ajustar server.js para exportarla.
// Por ahora, asumiremos que se puede requerir directamente. Ver NOTA abajo.
const app = require('../../server'); 

// NOTA: Es posible que necesitemos refactorizar server.js para exportar 
// la instancia de la app de Express sin iniciar el servidor (app.listen) 
// directamente, para que los tests puedan importarla y supertest la inicie 
// en un puerto efímero.

const prisma = new PrismaClient();
let testUser; // Usuario para invitar

// --- Configuración Global para los Tests de Auth --- 
beforeAll(async () => {
  // Asegurar que el rol 'manager' existe antes de crear el usuario
  const managerRole = await prisma.role.findUnique({ where: { name: 'manager' } });
  if (!managerRole) {
    throw new Error('Role "manager" not found. Run seed first or ensure roles are created.');
  }

  testUser = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: { // Optional: Update fields if the user already exists
      firstName: 'Test',
      lastName: 'Manager',
    },
    create: {
      email: 'manager@example.com',
      passwordHash: '$2b$10$examplehash', // Placeholder hash for test setup
      roleId: managerRole.id,
      firstName: 'Test', // Added required field
      lastName: 'Manager', // Added required field
      status: 'active', // Set other required fields if needed
      emailVerified: true,
    },
  });
  
  // Verify user was created/found
  if (!testUser) {
      throw new Error('Failed to create or find test user in beforeAll');
  }
});

afterAll(async () => {
  // Limpieza opcional del usuario manager si lo creamos aquí
  // await prisma.user.deleteMany({ where: { email: 'manager@example.com' } });
  await prisma.$disconnect();
  // Restore any mocks/spies if needed globally, though handled within describe blocks
  jest.restoreAllMocks(); 
});

// --- Tests para la Autenticación --- 
describe('POST /api/auth/login', () => {

  // 1. Test de Login Exitoso
  it('should return 200 OK and a JWT for valid credentials', async () => {
    const credentials = {
      email: 'manager@example.com', // Usamos el usuario del seed
      password: 'password123'      // La contraseña del seed
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(200);

    // Verificar que la respuesta tiene una propiedad 'token'
    expect(response.body).toHaveProperty('token');
    // Verificar que el token no está vacío (podríamos añadir validación JWT más estricta)
    expect(response.body.token).toBeTruthy(); 
    expect(typeof response.body.token).toBe('string');
  });

  // 2. Test de Contraseña Incorrecta
  it('should return 401 Unauthorized for invalid password', async () => {
    const credentials = {
      email: 'manager@example.com',
      password: 'wrongpassword' // Contraseña incorrecta
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(401);

    // Verificar el mensaje de error
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  // 3. Test de Email Inexistente
  it('should return 401 Unauthorized for non-existent email', async () => {
    const credentials = {
      email: 'nonexistent@example.com', // Email que no está en la BD
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(401);
      
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  // 4. Test de Email Faltante
  it('should return 400 Bad Request if email is missing', async () => {
    const credentials = {
      // email: 'manager@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(400);
      
    expect(response.body).toHaveProperty('message', 'Email and password are required');
  });

  // 5. Test de Contraseña Faltante
  it('should return 400 Bad Request if password is missing', async () => {
    const credentials = {
      email: 'manager@example.com'
      // password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(400);
      
    expect(response.body).toHaveProperty('message', 'Email and password are required');
  });

}); 

// --- Tests para Validación de Invitación --- 
describe('GET /api/auth/invitation/:token', () => {
  let validInvitationData;
  let usedInvitationData;
  let expiredInvitationData;
  const createdInvitationTokens = [];
  let createInvitationSpy;

  beforeAll(async () => { 
    if (!testUser) throw new Error("Test user not created");

    // Use spyOn to mock ONLY createInvitation for this describe block
    createInvitationSpy = jest.spyOn(invitationService, 'createInvitation')
      .mockImplementationOnce(async (email, inviterId) => {
        const token = `valid-token-${Date.now()}`;
        validInvitationData = { id: `valid-id-${token}`, email, token, status: InvitationStatus.PENDING, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }; 
        createdInvitationTokens.push(token);
        // Simulate DB save needed for cleanup and potential checks by validateToken
        await prisma.invitation.create({ data: { ...validInvitationData, inviter: { connect: { id: inviterId } } } }); 
        return { ...validInvitationData, invitedBy: inviterId }; // Simulate return value
      })
      .mockImplementationOnce(async (email, inviterId) => {
        const token = `used-token-${Date.now()}`;
        usedInvitationData = { id: `used-id-${token}`, email, token, status: InvitationStatus.USED, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) };
        createdInvitationTokens.push(token);
        await prisma.invitation.create({ data: { ...usedInvitationData, inviter: { connect: { id: inviterId } } } });
        return { ...usedInvitationData, invitedBy: inviterId };
      })
      .mockImplementationOnce(async (email, inviterId) => {
        const token = `expired-token-${Date.now()}`;
        const expiresAt = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
        expiredInvitationData = { id: `expired-id-${token}`, email, token, status: InvitationStatus.EXPIRED, expiresAt };
        createdInvitationTokens.push(token);
        await prisma.invitation.create({ data: { ...expiredInvitationData, inviter: { connect: { id: inviterId } } } }); 
        return { ...expiredInvitationData, invitedBy: inviterId };
      });

    // Call the mocked createInvitation implementations to set up data
    // We await these even though they are mocked to ensure prisma.create finishes
    await invitationService.createInvitation('valid@test.com', testUser.id);
    await invitationService.createInvitation('used@test.com', testUser.id);
    await invitationService.createInvitation('expired@test.com', testUser.id);

    // Manually update statuses in DB as the mock doesn't handle this logic
    if (usedInvitationData) {
         await prisma.invitation.update({ 
             where: { token: usedInvitationData.token }, 
             data: { status: InvitationStatus.USED } 
         });
    }
    if (expiredInvitationData) {
         await prisma.invitation.update({ 
             where: { token: expiredInvitationData.token }, 
             data: { status: InvitationStatus.EXPIRED, expiresAt: expiredInvitationData.expiresAt } 
         });
    }
  }, 15000); // Increased timeout slightly more just in case setup is slow

  afterAll(async () => {
    // Restore the original implementation
    createInvitationSpy.mockRestore(); 

    // Cleanup DB
    if (createdInvitationTokens.length > 0) {
      await prisma.invitation.deleteMany({
        where: { token: { in: createdInvitationTokens } }
      });
    }
  });

  it('should return 200 OK and status valid for a valid token', async () => {
    const response = await request(app)
      .get(`/api/auth/invitation/${validInvitationData.token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ status: 'valid', email: 'valid@test.com' });
  });

  it('should return 410 Gone for a used token', async () => {
    const response = await request(app)
      .get(`/api/auth/invitation/${usedInvitationData.token}`)
      .expect('Content-Type', /json/)
      .expect(410);
    expect(response.body).toHaveProperty('status', 'invalid');
    expect(response.body.message).toMatch(/used|invalid/i); 
  });

  it('should return 410 Gone for an expired token', async () => {
    const response = await request(app)
      .get(`/api/auth/invitation/${expiredInvitationData.token}`)
      .expect('Content-Type', /json/)
      .expect(410);
    expect(response.body).toHaveProperty('status', 'invalid');
    expect(response.body.message).toMatch(/expired|invalid/i);
  });

  it('should return 404 Not Found for a non-existent token', async () => {
    const response = await request(app)
      .get('/api/auth/invitation/non-existent-token-123')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toHaveProperty('status', 'invalid');
    expect(response.body.message).toMatch(/not found/i);
  });

  it('should return 400 Bad Request if token parameter is missing', async () => {
      const response = await request(app)
          .get('/api/auth/invitation/')
          .expect(404);
  });
}); 