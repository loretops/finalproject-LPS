const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');

// Instancia de Prisma para uso con inyección de dependencias en tests
let prismaClient;
// Solo inicializar en entorno de producción/desarrollo, no en tests
if (process.env.NODE_ENV !== 'test') {
  prismaClient = new PrismaClient();
}

/**
 * Crea una nueva invitación enviada por el usuario actual
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Object} prisma - Instancia de Prisma (inyectable para tests)
 */
async function createInvitation(req, res, prisma = prismaClient) {
  try {
    const { email } = req.body;
    const userId = req.user.id;

    // Validar email
    if (!email) {
      return res.status(400).json({ error: 'El email es obligatorio' });
    }

    // Validar formato de email con expresión regular simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'El formato del email no es válido' });
    }

    // Generar token único
    const token = uuidv4();

    // Fecha de expiración (3 días)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3);

    // Crear invitación en la base de datos
    const invitation = await prisma.invitation.create({
      data: {
        email,
        token,
        invitedById: userId,
        status: 'pending',
        expiresAt,
      },
    });

    // En un entorno real, aquí enviaríamos un email con el enlace de invitación
    // await sendInvitationEmail(email, token);

    return res.status(201).json(invitation);
  } catch (error) {
    console.error('Error al crear invitación:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

/**
 * Obtiene todas las invitaciones enviadas por el usuario actual
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Object} prisma - Instancia de Prisma (inyectable para tests)
 */
async function getInvitations(req, res, prisma = prismaClient) {
  try {
    const userId = req.user.id;

    const invitations = await prisma.invitation.findMany({
      where: {
        invitedById: userId,
      },
    });

    return res.json(invitations);
  } catch (error) {
    console.error('Error al obtener invitaciones:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

/**
 * Verifica si un token de invitación es válido y no ha expirado
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Object} prisma - Instancia de Prisma (inyectable para tests)
 */
async function verifyInvitation(req, res, prisma = prismaClient) {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        valid: false,
        error: 'Token no proporcionado',
      });
    }

    // Buscar invitación por token
    const invitation = await prisma.invitation.findUnique({
      where: { token },
    });

    // Verificar si la invitación existe
    if (!invitation) {
      return res.status(404).json({
        valid: false,
        error: 'Invitación no encontrada',
      });
    }

    // Verificar si la invitación ya fue utilizada
    if (invitation.status === 'accepted') {
      return res.status(400).json({
        valid: false,
        error: 'Esta invitación ya ha sido utilizada',
      });
    }

    // Verificar si la invitación ya expiró
    if (invitation.status === 'expired') {
      return res.status(400).json({
        valid: false,
        error: 'Esta invitación ha expirado',
      });
    }

    // Verificar la fecha de expiración
    const now = new Date();
    if (invitation.expiresAt < now) {
      // Marcar como expirada en la base de datos
      await prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: 'expired' },
      });

      return res.status(400).json({
        valid: false,
        error: 'Esta invitación ha expirado',
      });
    }

    // Si llegamos aquí, la invitación es válida
    return res.json({
      valid: true,
      invitation,
    });
  } catch (error) {
    console.error('Error al verificar invitación:', error);
    return res.status(500).json({
      valid: false,
      error: 'Error interno del servidor',
    });
  }
}

module.exports = {
  createInvitation,
  getInvitations,
  verifyInvitation,
};
