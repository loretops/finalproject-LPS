// Crear una instancia única de PrismaClient para toda la aplicación
const { PrismaClient } = require('@prisma/client');

// Crear una instancia única de PrismaClient para toda la aplicación
const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

// Manejadores de cierre adecuado
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Exportar la instancia para su uso en toda la aplicación
module.exports = prisma; 