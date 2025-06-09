const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class DashboardController {
  /**
   * Obtiene estadísticas generales del dashboard
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async getStats(req, res) {
    try {
      const [
        activePartners,
        activeProjects,
        totalInvested,
        totalInvestments
      ] = await Promise.all([
        // Contar socios activos (usuarios con rol 'partner' o 'investor' verificados)
        prisma.user.count({
          where: {
            role: {
              name: {
                in: ['partner', 'investor']
              }
            },
            status: 'active',
            emailVerified: true
          }
        }),

        // Contar proyectos publicados
        prisma.project.count({
          where: {
            status: 'published',
            draft: false
          }
        }),

        // Sumar el total invertido
        prisma.investment.aggregate({
          where: {
            status: {
              in: ['confirmed', 'completed']
            }
          },
          _sum: {
            amount: true
          }
        }),

        // Contar el total de inversiones
        prisma.investment.count({
          where: {
            status: {
              in: ['confirmed', 'completed']
            }
          }
        })
      ]);

      const stats = {
        activePartners: activePartners || 0,
        activeProjects: activeProjects || 0,
        totalInvested: totalInvested._sum.amount || 0,
        totalInvestments: totalInvestments || 0
      };

      res.status(200).json(stats);
    } catch (error) {
      console.error('Error al obtener estadísticas del dashboard:', error);
      res.status(500).json({
        message: 'Error al obtener estadísticas',
        error: error.message
      });
    }
  }

  /**
   * Obtiene estadísticas específicas para gestores
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async getManagerStats(req, res) {
    try {
      const [
        totalUsers,
        pendingInvitations,
        pendingInvestments,
        draftsProjects
      ] = await Promise.all([
        // Total de usuarios registrados
        prisma.user.count(),

        // Invitaciones pendientes
        prisma.invitation.count({
          where: {
            status: 'PENDING',
            expiresAt: {
              gt: new Date()
            }
          }
        }),

        // Inversiones pendientes de revisión
        prisma.investment.count({
          where: {
            status: 'pending'
          }
        }),

        // Proyectos en borrador
        prisma.project.count({
          where: {
            OR: [
              { status: 'draft' },
              { draft: true }
            ]
          }
        })
      ]);

      const stats = {
        totalUsers: totalUsers || 0,
        pendingInvitations: pendingInvitations || 0,
        pendingInvestments: pendingInvestments || 0,
        draftsProjects: draftsProjects || 0
      };

      res.status(200).json(stats);
    } catch (error) {
      console.error('Error al obtener estadísticas de gestor:', error);
      res.status(500).json({
        message: 'Error al obtener estadísticas de gestor',
        error: error.message
      });
    }
  }

  /**
   * Obtiene estadísticas específicas para usuarios (socios/inversores)
   * @param {Object} req - Objeto de petición Express
   * @param {Object} res - Objeto de respuesta Express
   */
  async getUserStats(req, res) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: 'Usuario no autenticado'
        });
      }

      const [
        myInterests,
        myInvestments,
        totalInvested
      ] = await Promise.all([
        // Intereses activos del usuario
        prisma.interest.count({
          where: {
            userId: userId,
            status: 'active'
          }
        }),

        // Inversiones del usuario
        prisma.investment.count({
          where: {
            userId: userId
          }
        }),

        // Total invertido por el usuario
        prisma.investment.aggregate({
          where: {
            userId: userId,
            status: {
              in: ['confirmed', 'completed']
            }
          },
          _sum: {
            amount: true
          }
        })
      ]);

      const stats = {
        myInterests: myInterests || 0,
        myInvestments: myInvestments || 0,
        totalInvested: totalInvested._sum.amount || 0
      };

      res.status(200).json(stats);
    } catch (error) {
      console.error('Error al obtener estadísticas de usuario:', error);
      res.status(500).json({
        message: 'Error al obtener estadísticas de usuario',
        error: error.message
      });
    }
  }
}

module.exports = new DashboardController(); 