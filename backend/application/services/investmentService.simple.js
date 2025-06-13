const { PrismaClient } = require('@prisma/client');
const prisma = require('../../utils/prismaClient');
const Project = require('../../domain/entities/Project');

class SimpleInvestmentService {
  async createInvestment(investmentData) {
    console.log('🔄 Iniciando creación de inversión simple...');
    
    const { userId, projectId, amount, notes } = investmentData;

    // Validaciones básicas
    if (!userId || !projectId || !amount) {
      throw new Error('Datos de inversión incompletos');
    }

    if (isNaN(amount) || amount <= 0) {
      throw new Error('El monto debe ser un valor numérico positivo');
    }

    try {
      console.log('📊 Obteniendo datos del proyecto...');
      
      // Obtener el proyecto
      const projectData = await prisma.project.findUnique({
        where: { id: projectId }
      });

      if (!projectData) {
        throw new Error('El proyecto especificado no existe');
      }

      console.log(`✅ Proyecto encontrado: ${projectData.title}`);

      // Convertir Decimal a Number para evitar problemas de comparación
      const normalizedProjectData = {
        ...projectData,
        currentAmount: projectData.currentAmount?.toNumber ? projectData.currentAmount.toNumber() : Number(projectData.currentAmount || 0),
        targetAmount: projectData.targetAmount?.toNumber ? projectData.targetAmount.toNumber() : Number(projectData.targetAmount || 0),
        minimumInvestment: projectData.minimumInvestment?.toNumber ? projectData.minimumInvestment.toNumber() : Number(projectData.minimumInvestment || 0),
        expectedRoi: projectData.expectedRoi?.toNumber ? projectData.expectedRoi.toNumber() : Number(projectData.expectedRoi || 0)
      };

      console.log('🔧 Conversión aplicada:', {
        currentAmount: normalizedProjectData.currentAmount,
        targetAmount: normalizedProjectData.targetAmount,
        currentAmountType: typeof normalizedProjectData.currentAmount,
        targetAmountType: typeof normalizedProjectData.targetAmount
      });

      // Crear instancia de la entidad proyecto
      const project = new Project(normalizedProjectData);

      // Verificar que el proyecto está disponible para inversión
      if (!project.isAvailableForInvestment()) {
        throw new Error('El proyecto no está disponible para inversiones en este momento');
      }

      // Verificar que el monto cumple con la inversión mínima
      if (!project.meetsMinimumInvestment(amount)) {
        throw new Error(`La inversión debe ser al menos de ${project.minimumInvestment}`);
      }

      console.log('💰 Creando registro de inversión...');

      // Crear la inversión
      const newInvestment = await prisma.investment.create({
        data: {
          userId,
          projectId,
          amount: amount.toString(),
          status: 'pending',
          notes: notes || null
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
              title: true,
              createdBy: true
            }
          }
        }
      });

      console.log(`✅ Inversión creada: ${newInvestment.id}`);

      // Actualizar el monto actual del proyecto
      console.log('📊 Actualizando currentAmount del proyecto...');
      await prisma.project.update({
        where: { id: projectId },
        data: {
          currentAmount: {
            increment: parseFloat(amount)
          }
        }
      });

      console.log('✅ Proyecto actualizado exitosamente');

      return newInvestment;

    } catch (error) {
      console.error('❌ Error en createInvestment:', error);
      throw error;
    }
  }
}

module.exports = SimpleInvestmentService; 