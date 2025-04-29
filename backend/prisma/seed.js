const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

  console.log('✅ Datos iniciales cargados con éxito');
}

main()
  .catch((e) => {
    console.error('❌ Error al sembrar datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 