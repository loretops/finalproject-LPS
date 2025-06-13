require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const { PrismaClient } = require('@prisma/client');

async function testDatabaseConnection() {
  console.log('🔍 Probando conexión a la base de datos...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configurada' : 'NO CONFIGURADA');
  
  const prisma = new PrismaClient();
  
  try {
    // Probar conexión básica
    console.log('📡 Intentando conectar...');
    await prisma.$connect();
    console.log('✅ Conexión exitosa');
    
    // Probar consulta simple
    console.log('📊 Probando consulta de proyectos...');
    const projectCount = await prisma.project.count();
    console.log(`✅ Proyectos encontrados: ${projectCount}`);
    
    // Probar consulta de inversiones
    console.log('💰 Probando consulta de inversiones...');
    const investmentCount = await prisma.investment.count();
    console.log(`✅ Inversiones encontradas: ${investmentCount}`);
    
    // Probar un proyecto específico con sus inversiones
    console.log('🏠 Probando proyecto con inversiones...');
    const projectWithInvestments = await prisma.project.findFirst({
      include: {
        investments: {
          where: {
            status: {
              in: ['confirmed', 'completed']
            }
          }
        }
      }
    });
    
    if (projectWithInvestments) {
      const totalInvested = projectWithInvestments.investments.reduce(
        (total, inv) => total + parseFloat(inv.amount), 
        0
      );
      console.log(`✅ Proyecto: ${projectWithInvestments.title}`);
      console.log(`   - Target: ${projectWithInvestments.targetAmount}`);
      console.log(`   - Current: ${projectWithInvestments.currentAmount}`);
      console.log(`   - Calculado: ${totalInvested}`);
      console.log(`   - Inversiones: ${projectWithInvestments.investments.length}`);
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error('Código de error:', error.code);
    
    if (error.code === 'P1001') {
      console.error('🔧 Posibles soluciones:');
      console.error('   1. Verificar que la URL de la base de datos sea correcta');
      console.error('   2. Verificar conectividad a internet');
      console.error('   3. Verificar que Supabase esté funcionando');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection(); 