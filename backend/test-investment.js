require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const { PrismaClient } = require('@prisma/client');

async function testInvestmentCreation() {
  console.log('🧪 Probando creación de inversión...');
  
  const prisma = new PrismaClient();
  
  try {
    await prisma.$connect();
    
    // Obtener un proyecto para probar
    const project = await prisma.project.findFirst({
      where: {
        status: 'published',
        draft: false
      }
    });
    
    if (!project) {
      console.error('❌ No hay proyectos disponibles para probar');
      return;
    }
    
    console.log(`📊 Proyecto seleccionado: ${project.title}`);
    console.log(`   - ID: ${project.id}`);
    console.log(`   - Mínimo: ${project.minimumInvestment}`);
    console.log(`   - Target: ${project.targetAmount}`);
    console.log(`   - Current: ${project.currentAmount}`);
    
    // Obtener un usuario para probar
    const user = await prisma.user.findFirst({
      where: {
        role: {
          name: 'partner'
        }
      },
      include: {
        role: true
      }
    });
    
    if (!user) {
      console.error('❌ No hay usuarios partner para probar');
      return;
    }
    
    console.log(`👤 Usuario seleccionado: ${user.firstName} ${user.lastName}`);
    
    // Datos de prueba para la inversión
    const testAmount = parseFloat(project.minimumInvestment);
    
    console.log(`💰 Probando inversión de: ${testAmount}€`);
    
    // Probar creación sin transacción primero
    console.log('📝 Creando inversión...');
    const investment = await prisma.investment.create({
      data: {
        userId: user.id,
        projectId: project.id,
        amount: testAmount.toString(),
        status: 'pending',
        notes: 'Inversión de prueba'
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        project: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
    
    console.log('✅ Inversión creada exitosamente:');
    console.log(`   - ID: ${investment.id}`);
    console.log(`   - Monto: ${investment.amount}€`);
    console.log(`   - Estado: ${investment.status}`);
    
    // Actualizar el proyecto
    console.log('📊 Actualizando currentAmount del proyecto...');
    const updatedProject = await prisma.project.update({
      where: { id: project.id },
      data: {
        currentAmount: {
          increment: testAmount
        }
      }
    });
    
    console.log(`✅ Proyecto actualizado: ${updatedProject.currentAmount}`);
    
    // Limpiar - eliminar la inversión de prueba
    console.log('🧹 Limpiando inversión de prueba...');
    await prisma.investment.delete({
      where: { id: investment.id }
    });
    
    // Restaurar el currentAmount del proyecto
    await prisma.project.update({
      where: { id: project.id },
      data: {
        currentAmount: {
          decrement: testAmount
        }
      }
    });
    
    console.log('✅ Limpieza completada');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
    console.error('Código:', error.code);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testInvestmentCreation(); 