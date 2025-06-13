require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const { PrismaClient } = require('@prisma/client');

async function fixCurrentAmounts() {
  console.log('🔧 Sincronizando currentAmount de proyectos...');
  
  const prisma = new PrismaClient();
  
  try {
    await prisma.$connect();
    
    // Obtener todos los proyectos
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        currentAmount: true,
        targetAmount: true
      }
    });
    
    console.log(`📊 Procesando ${projects.length} proyectos...`);
    
    for (const project of projects) {
      // Calcular el total real de inversiones confirmadas
      const investments = await prisma.investment.findMany({
        where: {
          projectId: project.id,
          status: {
            in: ['confirmed', 'completed']
          }
        },
        select: {
          amount: true
        }
      });
      
      const realCurrentAmount = investments.reduce(
        (total, inv) => total + parseFloat(inv.amount), 
        0
      );
      
      console.log(`\n🏠 ${project.title}:`);
      console.log(`   - BD actual: ${project.currentAmount}`);
      console.log(`   - Real calculado: ${realCurrentAmount}`);
      console.log(`   - Inversiones: ${investments.length}`);
      
      // Actualizar si hay diferencia
      if (parseFloat(project.currentAmount) !== realCurrentAmount) {
        await prisma.project.update({
          where: { id: project.id },
          data: {
            currentAmount: realCurrentAmount.toString()
          }
        });
        console.log(`   ✅ Actualizado a: ${realCurrentAmount}`);
      } else {
        console.log(`   ✓ Ya está correcto`);
      }
    }
    
    console.log('\n🎉 Sincronización completada');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixCurrentAmounts(); 