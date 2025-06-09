require('dotenv').config({ path: __dirname + '/../../.env' });
const { PrismaClient, InvitationStatus } = require('@prisma/client');
const bcrypt = require('bcrypt'); // Importar bcrypt
const invitationService = require('../application/services/invitationService');
const prisma = new PrismaClient();

const saltRounds = 10; // Cost factor para bcrypt

async function main() {
  // Crear roles iniciales del sistema
  const roles = [
    {
      name: 'visitor',
      description: 'Usuario visitante con acceso limitado a contenido público'
    },
    {
      name: 'partner',
      description: 'Socio con acceso a oportunidades de inversión'
    },
    {
      name: 'investor',
      description: 'Socio que ha invertido en al menos un proyecto'
    },
    {
      name: 'manager',
      description: 'Gestor del sistema con capacidad para administrar proyectos y usuarios'
    }
  ];

  console.log('🌱 Sembrando roles iniciales...');

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: role,
      create: role,
    });
  }

  console.log('✅ Roles iniciales creados/asegurados.'); // Log más específico

  console.log('🌱 Sembrando usuario Manager de prueba...');

  // --- Datos del Usuario Manager ---
  const managerEmail = 'manager@example.com';
  const managerPassword = 'password123';
  const managerFirstName = 'Admin';
  const managerLastName = 'User';
  // ---------------------------------

  const hashedPassword = bcrypt.hashSync(managerPassword, saltRounds);

  // Obtener el rol 'manager'
  const managerRole = await prisma.role.findUnique({
    where: { name: 'manager' },
  });

  if (!managerRole) {
    console.error('❌ No se encontró el rol "manager". Asegúrate de que se cree primero.');
    // Considera no salir si es parte de un flujo más grande
    // process.exit(1);
    throw new Error('Rol "manager" no encontrado durante el seeding.');
  }

  await prisma.user.upsert({
    where: { email: managerEmail },
    update: {
      firstName: managerFirstName,
      lastName: managerLastName,
    },
    create: {
      email: managerEmail,
      passwordHash: hashedPassword,
      firstName: managerFirstName,
      lastName: managerLastName,
      roleId: managerRole.id,
      status: 'active',
      emailVerified: true,
    },
  });

  // Asegurémonos de tener el ID del manager para usarlo como invitador
  const managerUser = await prisma.user.findUnique({ where: { email: managerEmail } });
  if (!managerUser) {
    throw new Error('Usuario Manager no encontrado después de upsert, algo falló.');
  }
  console.log(`✅ Usuario Manager (${managerFirstName} ${managerLastName} - ${managerEmail}) creado/asegurado.`);

  // --- Crear Usuario Socio de prueba ---
  console.log('🌱 Sembrando usuario Socio (Partner) de prueba...');

  const partnerEmail = 'partner@example.com';
  const partnerPassword = 'password123';
  const partnerFirstName = 'Socio';
  const partnerLastName = 'Prueba';

  // Obtener el rol 'partner'
  const partnerRole = await prisma.role.findUnique({
    where: { name: 'partner' },
  });

  if (!partnerRole) {
    console.error('❌ No se encontró el rol "partner". Asegúrate de que se cree primero.');
    throw new Error('Rol "partner" no encontrado durante el seeding.');
  }

  await prisma.user.upsert({
    where: { email: partnerEmail },
    update: {
      firstName: partnerFirstName,
      lastName: partnerLastName,
    },
    create: {
      email: partnerEmail,
      passwordHash: bcrypt.hashSync(partnerPassword, saltRounds),
      firstName: partnerFirstName,
      lastName: partnerLastName,
      roleId: partnerRole.id,
      status: 'active',
      emailVerified: true,
    },
  });

  console.log(`✅ Usuario Socio (${partnerFirstName} ${partnerLastName} - ${partnerEmail}) creado/asegurado.`);

  // --- Crear Invitación de Prueba --- 
  console.log('🌱 Creando invitación de prueba...');
  const testInviteeEmail = 'test.invitee@example.com';
  try {
    // Limpiar invitación PENDING anterior para este email si existe
    // Esto permite re-ejecutar el seed sin el error de duplicado activo.
    const existing = await prisma.invitation.findFirst({
      where: {
        email: testInviteeEmail,
        status: InvitationStatus.PENDING,
        expiresAt: { gt: new Date() }
      }
    });
    if (existing) {
      console.log(`🧹 Limpiando invitación PENDING existente para ${testInviteeEmail}`);
      await prisma.invitation.delete({ where: { id: existing.id } });
    }

    // Usar el servicio para crear la invitación
    const testInvitation = await invitationService.createInvitation(
      testInviteeEmail, 
      managerUser.id // Usamos el ID del manager creado/asegurado antes
    );
    console.log('✅ Invitación de prueba creada con éxito.');
    console.log('✨ Token de invitación de prueba:', testInvitation.token);
    console.log(`🔗 Enlace de prueba: http://localhost:3001/invitation/${testInvitation.token}`);

  } catch (error) {
    // Manejar el caso donde createInvitation falla (podría ser un duplicado si no limpiamos bien)
    console.error(`❌ Error al crear la invitación de prueba para ${testInviteeEmail}:`, error.message);
    // No salimos necesariamente, el resto del seed pudo funcionar
  }

  // Mover este log al final si quieres confirmar TODO el seeding
  // console.log('✅ Datos iniciales cargados con éxito');
}

main()
  .then(() => {
    console.log('✅✅ Seeding completado con éxito.'); // Log final de éxito
  })
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 