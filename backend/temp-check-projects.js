require('dotenv').config({ path: '../.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Consultando proyectos...');
    const projects = await prisma.project.findMany();
    console.log(`Proyectos encontrados: ${projects.length}`);
    
    for (const p of projects) {
      console.log(` - ${p.title} (status: ${p.status}, draft: ${p.draft})`);
    }
  } catch (err) {
    console.error('Error al consultar proyectos:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 