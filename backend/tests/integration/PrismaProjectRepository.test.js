const { PrismaClient } = require('@prisma/client');
const PrismaProjectRepository = require('../../infrastructure/repositories/PrismaProjectRepository');
const { generateUUID } = require('../../utils/uuid');

const prisma = new PrismaClient();
const projectRepository = new PrismaProjectRepository();

describe('PrismaProjectRepository', () => {
  let testUser;
  let testProject;
  let testInvestments = [];
  let investorRole;

  beforeAll(async () => {
    // Obtener el rol de inversor
    investorRole = await prisma.role.findUnique({
      where: { name: 'investor' }
    });

    if (!investorRole) {
      throw new Error("El rol 'investor' no existe en la base de datos");
    }

    // Crear un usuario de prueba
    testUser = await prisma.user.create({
      data: {
        email: `test.user.${Date.now()}@example.com`,
        passwordHash: 'hashedPassword123',
        firstName: 'Test',
        lastName: 'User',
        roleId: investorRole.id,
        status: 'active',
        emailVerified: false
      }
    });

    // Crear un proyecto de prueba usando el método del repositorio
    testProject = await projectRepository.create({
      title: `Test Project ${Date.now()}`,
      description: 'A test project for investment calculation',
      location: 'Test Location',
      propertyType: 'residential',
      status: 'active',
      targetAmount: 1000000,
      minimumInvestment: 50000,
      expectedRoi: 12.5,
      estimatedTime: 24
    }, testUser.id);

    // Crear algunas inversiones para el proyecto
    const investment1 = await prisma.investment.create({
      data: {
        amount: '100000',
        status: 'confirmed',
        project: {
          connect: { id: testProject.id }
        },
        user: {
          connect: { id: testUser.id }
        }
      }
    });

    const investment2 = await prisma.investment.create({
      data: {
        amount: '75000',
        status: 'completed',
        project: {
          connect: { id: testProject.id }
        },
        user: {
          connect: { id: testUser.id }
        }
      }
    });

    const investment3 = await prisma.investment.create({
      data: {
        amount: '50000',
        status: 'pending', // Esta no debe contarse
        project: {
          connect: { id: testProject.id }
        },
        user: {
          connect: { id: testUser.id }
        }
      }
    });

    testInvestments = [investment1, investment2, investment3];
  });

  afterAll(async () => {
    // Limpiar datos de prueba
    if (testInvestments.length > 0) {
      for (const investment of testInvestments) {
        if (investment && investment.id) {
          await prisma.investment.delete({ where: { id: investment.id } });
        }
      }
    }
    
    if (testProject && testProject.id) {
      await prisma.project.delete({ where: { id: testProject.id } });
    }
    
    if (testUser && testUser.id) {
      await prisma.user.delete({ where: { id: testUser.id } });
    }
    
    await prisma.$disconnect();
  });

  test('findById should return project with correct investment amount', async () => {
    // Obtener el proyecto
    const project = await projectRepository.findById(testProject.id);
    
    // Verificar que el proyecto se obtuvo correctamente
    expect(project).toBeDefined();
    expect(project.id).toBe(testProject.id);
    
    // Verificar que el monto invertido es correcto (suma de inversiones confirmed y completed)
    // 100000 + 75000 = 175000
    expect(project.currentAmount).toBe('175000');
    
    // Verificar que NO incluye inversiones pendientes
    const totalWithPending = parseFloat(project.currentAmount) + 50000;
    expect(project.currentAmount).not.toBe(totalWithPending.toString());
  });

  test('findAll should return projects with correct investment amounts', async () => {
    // Obtener todos los proyectos
    const result = await projectRepository.findAll();
    
    // Verificar que hay resultados
    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    
    // Encontrar nuestro proyecto de prueba
    const foundProject = result.data.find(p => p.id === testProject.id);
    
    // Verificar que está en los resultados
    expect(foundProject).toBeDefined();
    
    // Verificar que tiene el monto invertido correcto
    expect(foundProject.currentAmount).toBe('175000');
  });
}); 