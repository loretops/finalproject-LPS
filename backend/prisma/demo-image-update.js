// Cargar variables de entorno directamente
require('dotenv').config({ path: __dirname + '/../../.env' });

const { PrismaClient } = require('@prisma/client');

// Crear una instancia directa de PrismaClient 
const prisma = new PrismaClient();

async function addImagesToProjects() {
  console.log('🌱 Añadiendo imágenes a proyectos existentes...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

  // Obtener todos los proyectos publicados
  const projects = await prisma.project.findMany({
    where: { status: 'published' }
  });

  console.log(`Encontrados ${projects.length} proyectos para actualizar`);

  // URLs de imágenes disponibles (optimizadas)
  const imageUrls = [
    '/images/optimized/luxury-real-estate.webp',
    '/images/optimized/analytics.webp', 
    '/images/optimized/luxury-interior.webp',
    '/images/optimized/transparency.webp',
    '/images/optimized/exclusivity.webp'
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
      // Crear el documento de imagen
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
  }

  console.log('🎉 Actualización de imágenes completada');
}

// Ejecutar la función y manejar errores
addImagesToProjects()
  .catch((e) => {
    console.error('❌ Error añadiendo imágenes:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 