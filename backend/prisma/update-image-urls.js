require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const { PrismaClient } = require('@prisma/client');

// Crear una instancia directa de PrismaClient 
const prisma = new PrismaClient();

async function updateImageUrls() {
  console.log('🔄 Actualizando URLs de imágenes a versiones optimizadas...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

  // Mapeo de URLs antiguas a nuevas
  const urlMapping = {
    '/images/luxury-real-estate.jpg': '/images/optimized/luxury-real-estate.webp',
    '/images/analytics.jpg': '/images/optimized/analytics.webp',
    '/images/luxury-interior.jpg': '/images/optimized/luxury-interior.webp',
    '/images/transparency.jpg': '/images/optimized/transparency.webp',
    '/images/exclusivity.jpg': '/images/optimized/exclusivity.webp'
  };

  // Obtener todos los documentos de tipo imagen
  const imageDocuments = await prisma.projectDocument.findMany({
    where: { 
      documentType: 'image',
      fileType: 'image/jpeg'
    },
    include: {
      project: {
        select: { title: true }
      }
    }
  });

  console.log(`Encontrados ${imageDocuments.length} documentos de imagen para actualizar`);

  let updatedCount = 0;

  for (const doc of imageDocuments) {
    const oldUrl = doc.fileUrl;
    const newUrl = urlMapping[oldUrl];

    if (newUrl) {
      // Actualizar la URL y el tipo de archivo
      await prisma.projectDocument.update({
        where: { id: doc.id },
        data: {
          fileUrl: newUrl,
          fileType: 'image/webp'
        }
      });

      console.log(`✅ Actualizado: ${doc.project.title}`);
      console.log(`   ${oldUrl} -> ${newUrl}`);
      updatedCount++;
    } else {
      console.log(`⚠️ No se encontró mapeo para: ${oldUrl}`);
    }
  }

  console.log(`\n🎉 Actualización completada: ${updatedCount} imágenes actualizadas`);
}

// Ejecutar la actualización
updateImageUrls()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  }); 