require('dotenv').config({ path: __dirname + '/../../.env' });
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
    publishedAt: new Date('2024-01-15')
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
    publishedAt: new Date('2024-02-20')
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
    publishedAt: new Date('2024-03-10')
  },
  {
    title: 'Centro Logístico Inteligente',
    description: 'Hub logístico automatizado de 15.000m² con tecnología robótica avanzada. Ubicación estratégica cerca del aeropuerto.',
    location: 'Madrid, Área Metropolitana',
    propertyType: 'industrial',
    minimumInvestment: 85000,
    targetAmount: 6800000,
    currentAmount: 6245000,
    expectedRoi: 9.5,
    status: 'published',
    draft: false,
    publishedAt: new Date('2024-01-28')
  },
  {
    title: 'Apartamentos Exclusivos Marina',
    description: 'Promoción de 36 apartamentos de lujo con vistas panorámicas al puerto deportivo. Piscina infinita y concierge 24h.',
    location: 'Alicante, Puerto Deportivo',
    propertyType: 'residential',
    minimumInvestment: 55000,
    targetAmount: 4200000,
    currentAmount: 3035000,
    expectedRoi: 13.7,
    status: 'published',
    draft: false,
    publishedAt: new Date('2024-02-05')
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
          createdAt: new Date()
        }
      });
      console.log(`✅ Proyecto creado: ${projectData.title}`);
    } else {
      console.log(`⚠️ Proyecto ya existe: ${projectData.title}`);
    }
  }
}

async function createDemoProjectDocuments() {
  console.log('🌱 Creando documentos e imágenes para proyectos...');

  // Obtener todos los proyectos creados
  const projects = await prisma.project.findMany({
    where: { status: 'published' }
  });

  const imageUrls = [
    '/images/luxury-real-estate.jpg',
    '/images/analytics.jpg', 
    '/images/luxury-interior.jpg',
    '/images/transparency.jpg',
    '/images/exclusivity.jpg'
  ];

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const imageUrl = imageUrls[i % imageUrls.length]; // Usamos módulo para no salir del rango

    // Verificar si ya existe un documento de imagen para este proyecto
    const existingImage = await prisma.projectDocument.findFirst({
      where: {
        projectId: project.id,
        documentType: 'image'
      }
    });

    if (!existingImage) {
      await prisma.projectDocument.create({
        data: {
          projectId: project.id,
          fileUrl: imageUrl,
          fileType: 'image/jpeg',
          documentType: 'image',
          accessLevel: 'public',
          title: `Imagen principal de ${project.title}`,
          securityLevel: 'view_only'
        }
      });
      console.log(`✅ Imagen añadida para proyecto: ${project.title}`);
    } else {
      console.log(`⚠️ Ya existe una imagen para: ${project.title}`);
    }

    // También añadir un documento de ejemplo (PDF)
    const existingDoc = await prisma.projectDocument.findFirst({
      where: {
        projectId: project.id,
        documentType: 'legal'
      }
    });

    if (!existingDoc) {
      await prisma.projectDocument.create({
        data: {
          projectId: project.id,
          fileUrl: '/docs/sample-document.pdf', // URL ejemplo
          fileType: 'application/pdf',
          documentType: 'legal',
          accessLevel: 'registered',
          title: 'Documento legal',
          securityLevel: 'view_only'
        }
      });
      console.log(`✅ Documento legal añadido para proyecto: ${project.title}`);
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

  // Obtener los usuarios para asignar como inversores
  const partner = await prisma.user.findUnique({
    where: { email: 'partner@example.com' }
  });
  
  // Si no existe el usuario investor, usaremos solo el partner
  const investor = await prisma.user.findUnique({
    where: { email: 'investor@example.com' }
  }) || partner;

  // Obtener los proyectos
  const projects = await prisma.project.findMany({
    where: { status: 'published' }
  });

  // Definir las inversiones para cada proyecto
  const projectInvestments = {
    'Apartamentos Exclusivos Marina': [
      { amount: 1500000, userId: partner.id, status: 'confirmed' },
      { amount: 1535000, userId: partner.id, status: 'confirmed' }
    ],
    'Torre Oficinas Business Center': [
      { amount: 2600000, userId: partner.id, status: 'confirmed' },
      { amount: 2500000, userId: partner.id, status: 'confirmed' }
    ],
    'Centro Logístico Inteligente': [
      { amount: 3245000, userId: partner.id, status: 'confirmed' },
      { amount: 3000000, userId: partner.id, status: 'confirmed' }
    ]
  };

  if (partner && projects.length > 0) {
    for (const project of projects) {
      // Buscar inversiones predefinidas para este proyecto
      const investments = projectInvestments[project.title] || [];
      
      for (const investment of investments) {
        // Verificar si ya existe una inversión similar
        const existingInvestment = await prisma.investment.findFirst({
          where: {
            userId: investment.userId,
            projectId: project.id,
            amount: investment.amount
          }
        });

        if (!existingInvestment) {
          await prisma.investment.create({
            data: {
              userId: investment.userId,
              projectId: project.id,
              amount: investment.amount.toString(),
              status: investment.status,
              investedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random fecha en el último mes
              notes: `Inversión demo en ${project.title}`
            }
          });
          console.log(`✅ Inversión creada: ${investment.amount}€ en ${project.title}`);
        } else {
          console.log(`⚠️ Ya existe una inversión similar en: ${project.title}`);
        }
      }
      
      // Actualizar currentAmount del proyecto con la suma de las inversiones confirmadas
      const totalInvested = investments
        .filter(inv => inv.status === 'confirmed' || inv.status === 'completed')
        .reduce((sum, inv) => sum + inv.amount, 0);
      
      await prisma.project.update({
        where: { id: project.id },
        data: {
          currentAmount: {
            set: totalInvested.toString()
          }
        }
      });
      
      console.log(`✅ Actualizado currentAmount para ${project.title}: ${totalInvested}€`);
    }
  }
}

async function main() {
  try {
    console.log('🌱 Iniciando seed de datos de demostración...');
    
    await createDemoProjects();
    await createDemoProjectDocuments();
    await createDemoInterests();
    await createDemoInvestments();
    
    console.log('✅ Seed de datos de demostración completado.');
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
  } finally {
    await prisma.$disconnect();
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