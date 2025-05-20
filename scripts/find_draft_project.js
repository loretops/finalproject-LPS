const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://coopco_user:dlqdu92udjlal@localhost:5432/coopco'
    }
  }
});

async function findDraftProject() {
  try {
    const project = await prisma.project.findFirst({
      where: { status: 'draft' },
      select: { id: true }
    });

    if (project) {
      console.log(project.id);
    } else {
      console.log('No draft project found');
    }
  } catch (error) {
    console.error('Error finding draft project:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findDraftProject(); 