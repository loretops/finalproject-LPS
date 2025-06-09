require('dotenv').config({ path: __dirname + '/../.env' });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const saltRounds = 10;

const DEMO_PROJECTS = [
  {
    title: 'Residencial Villa Exclusiva',
    description: 'Desarrollo inmobiliario de lujo con 24 viviendas unifamiliares en zona premium. Acabados de alta calidad, jardines privados y sistemas de domótica integrados.',
    location: 'Madrid, Pozuelo de Alarcón',
    propertyType: 'residential', 
    minimumInvestment: 75000,
    targetAmount: 3500000,
    currentAmount: 1750000,
    expectedRoi: 14.5,
    status: 'published',
    draft: false,
    publishedAt: new Date('2024-01-15'),
    imageUrl: '/images/luxury-real-estate.jpg'
  },
  {
    title: 'Torre Oficinas Business Center',
    description: 'Edificio de oficinas de 12 plantas en distrito financiero. Certificación LEED Gold, espacios flexibles y tecnología de vanguardia.',
    location: 'Barcelona, Diagonal',
    propertyType: 'commercial',
    minimumInvestment: 100000,
    targetAmount: 8500000,
    currentAmount: 5100000,
    expectedRoi: 11.2,
    status: 'published',
    draft: false,
    publishedAt: new Date('2024-02-20'),
    imageUrl: '/images/analytics.jpg'
  },
  {
    title: 'Resort Marina Premium',
    description: 'Complejo turístico de lujo en primera línea de costa. 80 apartamentos con vistas al mar, club náutico privado y spa.',
    location: 'Valencia, Puerto Sagunto',
    propertyType: 'tourist',
    minimumInvestment: 65000,
    targetAmount: 12000000,
    currentAmount: 7200000,
    expectedRoi: 16.8,
    status: 'published',
    draft: false,
    publishedAt: new Date('2024-03-10'),
    imageUrl: '/images/luxury-interior.jpg'
  },
  {
    title: 'Centro Logístico Inteligente',
    description: 'Hub logístico automatizado de 15.000m² con tecnología robótica avanzada. Ubicación estratégica cerca del aeropuerto.',
    location: 'Madrid, Área Metropolitana',
    propertyType: 'industrial',
    minimumInvestment: 85000,
    targetAmount: 6800000,
    currentAmount: 6120000,
    expectedRoi: 9.5,
    status: 'published',
    draft: false,
    publishedAt: new Date('2024-01-28'),
    imageUrl: '/images/transparency.jpg'
  },
  {
    title: 'Apartamentos Exclusivos Marina',
    description: 'Promoción de 36 apartamentos de lujo con vistas panorámicas al puerto deportivo. Piscina infinita y concierge 24h.',
    location: 'Alicante, Puerto Deportivo',
    propertyType: 'residential',
    minimumInvestment: 55000,
    targetAmount: 4200000,
    currentAmount: 2940000,
    expectedRoi: 13.7,
    status: 'published',
    draft: false,
    publishedAt: new Date('2024-02-05'),
    imageUrl: '/images/exclusivity.jpg'
  }
];

async function createDemoProjects() {
  console.log('🌱 Creando proyectos de demostración...');

  // Obtener el usuario manager para asignar como creador
  const manager = await prisma.user.findUnique({
    where: { email: 'manager@example.com' }
  });

  if (!manager) {
    console.error('❌ No se encontró el usuario manager. Ejecuta el seed principal primero.');
    return;
  }

  for (const projectData of DEMO_PROJECTS) {
    const existingProject = await prisma.project.findFirst({
      where: { title: projectData.title }
    });

    if (!existingProject) {
      await prisma.project.create({
        data: {
          ...projectData,
          createdBy: manager.id,
          publishedBy: manager.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      console.log(`✅ Proyecto creado: ${projectData.title}`);
    } else {
      console.log(`⚠️ Proyecto ya existe: ${projectData.title}`);
    }
  }
}

async function createDemoInterests() {
  console.log('🌱 Creando intereses de demostración...');

  // Obtener el usuario partner
  const partner = await prisma.user.findUnique({
    where: { email: 'partner@example.com' }
  });

  // Obtener algunos proyectos
  const projects = await prisma.project.findMany({
    take: 3,
    where: { status: 'published' }
  });

  if (partner && projects.length > 0) {
    for (const project of projects) {
      const existingInterest = await prisma.interest.findFirst({
        where: {
          userId: partner.id,
          projectId: project.id
        }
      });

      if (!existingInterest) {
        await prisma.interest.create({
          data: {
            userId: partner.id,
            projectId: project.id,
            status: 'active',
            notes: 'Interesado en conocer más detalles sobre el proyecto',
            createdAt: new Date()
          }
        });
        console.log(`✅ Interés creado para proyecto: ${project.title}`);
      }
    }
  }
}

async function createDemoInvestments() {
  console.log('🌱 Creando inversiones de demostración...');

  // Obtener el usuario partner
  const partner = await prisma.user.findUnique({
    where: { email: 'partner@example.com' }
  });

  // Obtener algunos proyectos
  const projects = await prisma.project.findMany({
    take: 2,
    where: { status: 'published' }
  });

  if (partner && projects.length > 0) {
    const investmentAmounts = [125000, 95000];
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const amount = investmentAmounts[i];

      const existingInvestment = await prisma.investment.findFirst({
        where: {
          userId: partner.id,
          projectId: project.id
        }
      });

      if (!existingInvestment) {
        await prisma.investment.create({
          data: {
            userId: partner.id,
            projectId: project.id,
            amount: amount,
            status: 'confirmed',
            investedAt: new Date(),
            notes: `Inversión de ${amount}€ en el proyecto ${project.title}`,
            contractReference: `CONTRACT-${project.id.substring(0, 8).toUpperCase()}-${Date.now()}`
          }
        });

        // Actualizar el current_amount del proyecto
        await prisma.project.update({
          where: { id: project.id },
          data: {
            currentAmount: {
              increment: amount
            }
          }
        });

        console.log(`✅ Inversión creada: ${amount}€ en ${project.title}`);
      }
    }
  }
}

async function main() {
  try {
    await createDemoProjects();
    await createDemoInterests(); 
    await createDemoInvestments();
    console.log('🎉 Datos de demostración creados exitosamente');
  } catch (error) {
    console.error('❌ Error creando datos de demo:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 