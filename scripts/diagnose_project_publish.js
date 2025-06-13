import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializar Prisma
const prisma = new PrismaClient();

// Diagnóstico principal
async function main() {
  console.log('🔍 Herramienta de Diagnóstico de Publicación de Proyectos');
  console.log('===================================================');
  
  // Ver si se proporcionó un ID específico
  const specificId = process.argv[2];
  if (specificId) {
    await diagnoseProjectPublish(specificId);
  } else {
    await findDraftProjects();
  }
  
  // Cerrar conexión Prisma
  await prisma.$disconnect();
}

// Función para encontrar proyectos en borrador
async function findDraftProjects() {
  try {
    const draftProjects = await prisma.project.findMany({
      where: {
        draft: true
      },
      select: {
        id: true,
        title: true,
        status: true,
        created_at: true,
        creator: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        _count: {
          select: {
            documents: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
    
    if (draftProjects.length === 0) {
      console.log('ℹ️ No se encontraron proyectos en borrador.');
      return;
    }
    
    console.log(`📋 Encontrados ${draftProjects.length} proyectos en borrador:`);
    console.log('-------------------------------------------');
    
    draftProjects.forEach((project, index) => {
      console.log(`${index + 1}. "${project.title}" (${project.id})`);
      console.log(`   Creado: ${project.created_at.toISOString().split('T')[0]}`);
      console.log(`   Creador: ${project.creator ? project.creator.firstName + ' ' + project.creator.lastName : 'Desconocido'}`);
      console.log(`   Documentos: ${project._count.documents}`);
      console.log(`   Para diagnosticar: node scripts/diagnose_project_publish.js ${project.id}`);
      console.log('-------------------------------------------');
    });
  } catch (error) {
    console.error('❌ Error al buscar proyectos en borrador:', error);
  }
}

async function diagnoseProjectPublish(projectId) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        documents: true,
        creator: true
      }
    });

    if (!project) {
      console.error('❌ Proyecto no encontrado');
      return;
    }

    console.log('🔍 Diagnóstico de Proyecto para Publicación');
    console.log('-------------------------------------------');
    
    // Validar campos obligatorios
    const checks = {
      title: {
        pass: project.title && project.title.trim().length >= 5,
        message: 'Título debe tener al menos 5 caracteres'
      },
      description: {
              pass: project.description && project.description.trim().length >= 10,
      message: 'Descripción debe tener al menos 10 caracteres'
      },
      minimumInvestment: {
        pass: project.minimumInvestment > 0,
        message: 'Inversión mínima debe ser mayor que 0'
      },
      targetAmount: {
        pass: project.targetAmount > 0,
        message: 'Monto objetivo debe ser mayor que 0'
      },
      location: {
        pass: project.location && project.location.trim().length > 0,
        message: 'Ubicación no puede estar vacía'
      },
      legalDocs: {
        pass: project.documents.some(doc => doc.documentType === 'legal'),
        message: 'Debe tener al menos un documento legal'
      }
    };

    console.log('📋 Verificación de Campos:');
    Object.entries(checks).forEach(([key, check]) => {
      console.log(`- ${key}: ${check.pass ? '✅ Correcto' : `❌ ${check.message}`}`);
    });

    console.log('\n📊 Detalles del Proyecto:');
    console.log(`ID: ${project.id}`);
    console.log(`Estado Actual: ${project.status}`);
    console.log(`Es Borrador: ${project.draft}`);
    console.log(`Creado por: ${project.creator ? project.creator.firstName + ' ' + project.creator.lastName : 'Sin creador'}`);
    console.log(`Documentos: ${project.documents.length}`);
    
    // Calcular si el proyecto puede ser publicado
    const requiredChecks = Object.entries(checks).filter(([key]) => 
      ['title', 'description', 'minimumInvestment', 'targetAmount', 'location'].includes(key)
    );
    
    const failedRequired = requiredChecks.filter(([, check]) => !check.pass);
    const canPublish = failedRequired.length === 0;
    
    console.log('\n🚦 Estado de Publicación:');
    console.log(canPublish 
      ? '✅ El proyecto cumple con los requisitos básicos para ser publicado'
      : '❌ El proyecto NO puede ser publicado todavía');
    
    // Destacar la validación de documentos legales
    const hasLegalDocs = checks.legalDocs.pass;
    console.log(hasLegalDocs 
      ? '✅ El proyecto tiene documentos legales'
      : '⚠️ NOTA: El proyecto no tiene documentos legales. Se recomienda añadir al menos uno antes de publicar en producción, pero puede omitirse durante el desarrollo.');
    
    // Mostrar recomendaciones si hay problemas
    if (!canPublish || !hasLegalDocs) {
      console.log('\n📝 Recomendaciones:');
      
      failedRequired.forEach(([key, check]) => {
        console.log(`❌ Corregir ${key}: ${check.message}`);
      });
      
      if (!hasLegalDocs) {
        console.log('⚠️ Añadir documentos legales al proyecto antes de la publicación en producción');
      }
    }
  } catch (error) {
    console.error('❌ Error al diagnosticar proyecto:', error);
  }
}

// Ejecutar función principal
main()
  .catch((e) => {
    console.error('Error en diagnose_project_publish.js:', e);
    process.exit(1);
  }); 