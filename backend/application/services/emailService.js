const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno del backend primero
dotenv.config({ path: path.join(__dirname, '../../../.env') });

// Configuración del transporte SMTP desde variables de entorno
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verificar la configuración del transporte
transporter.verify(function(error, success) {
  if (error) {
    console.error('Error en la configuración del transporte SMTP:', error);
  } else {
    console.log('Servidor SMTP listo para enviar mensajes');
  }
});

const senderEmail = process.env.EMAIL_FROM || 'noreply@example.com';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';

/**
 * Servicio para envío de emails con soporte para múltiples plantillas
 */
class EmailService {
  constructor() {
    this.transporter = transporter;
    this.senderEmail = senderEmail;
    this.frontendUrl = frontendUrl;
  }

  /**
   * Renderiza una plantilla de email basada en el tipo y contexto
   * @param {string} template - Nombre de la plantilla
   * @param {Object} context - Contexto con variables para la plantilla
   * @returns {string} Contenido HTML del email
   */
  renderTemplate(template, context) {
    switch (template) {
      case 'invitation':
        return this.renderInvitationTemplate(context);
      case 'email-verification':
        return this.renderVerificationTemplate(context);
      case 'password-reset':
        return this.renderPasswordResetTemplate(context);
      default:
        return this.renderDefaultTemplate(context);
    }
  }

  /**
   * Sends an email using a specified template and context
   * @param {Object} options - Email options
   * @param {string} options.to - Recipient email
   * @param {string} options.subject - Email subject
   * @param {string} options.template - Template name to use
   * @param {Object} options.context - Context data for the template
   * @returns {Promise<Object>} Result of the email sending operation
   */
  async sendEmail({ to, subject, template, context }) {
    if (!to || !subject || !template) {
      throw new Error('Email recipient, subject, and template are required');
    }

    try {
      // Render HTML content from template
      const html = this.renderTemplate(template, context);

      // Send email
      const result = await this.transporter.sendMail({
        from: this.senderEmail,
        to,
        subject,
        html,
        text: this.extractTextFromHtml(html) // Plain text alternative
      });

      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  /**
   * Extract plain text from HTML content for fallback
   * @param {string} html - HTML content
   * @returns {string} Plain text
   */
  extractTextFromHtml(html) {
    // Simple extraction - removes HTML tags
    return html.replace(/<[^>]*>/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  /**
   * Renderiza plantilla para invitaciones
   * @param {Object} context - Datos para la plantilla
   * @returns {string} HTML
   */
  renderInvitationTemplate({ email, invitationLink }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invitación a COOPCO</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
          .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 3px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>¡Has sido invitado a unirte a COOPCO!</h2>
          <p>Hola ${email},</p>
          <p>Nos complace invitarte a formar parte de nuestro club exclusivo de inversores inmobiliarios.</p>
          <p>Para completar tu registro y acceder a las oportunidades, por favor haz clic en el siguiente enlace:</p>
          <p style="text-align: center; margin: 25px 0;">
            <a href="${invitationLink}" class="button">Aceptar Invitación</a>
          </p>
          <p>Si el botón no funciona, copia y pega la siguiente URL en tu navegador:</p>
          <p><a href="${invitationLink}">${invitationLink}</a></p>
          <p>Esta invitación es válida por 7 días.</p>
          <p>¡Esperamos verte pronto!</p>
          <p>El equipo de COOPCO</p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Renderiza plantilla para verificación de email
   * @param {Object} context - Datos para la plantilla
   * @returns {string} HTML
   */
  renderVerificationTemplate({ name, verificationUrl }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Verifica tu cuenta en COOPCO</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
          .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 3px; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Verifica tu cuenta en COOPCO</h2>
          <p>Hola ${name},</p>
          <p>Gracias por registrarte en COOPCO. Para poder acceder a todas las funcionalidades, necesitamos que verifiques tu correo electrónico.</p>
          <p>Por favor, haz clic en el siguiente botón para verificar tu cuenta:</p>
          <p style="text-align: center; margin: 25px 0;">
            <a href="${verificationUrl}" class="button">Verificar mi cuenta</a>
          </p>
          <p>Si el botón no funciona, copia y pega la siguiente URL en tu navegador:</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <p>Este enlace de verificación expirará en 24 horas.</p>
          <p>Si no has solicitado esta verificación, puedes ignorar este mensaje.</p>
          <div class="footer">
            <p>Este es un mensaje automático, por favor no respondas a este email.</p>
            <p>© ${new Date().getFullYear()} COOPCO. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Renderiza plantilla para restablecimiento de contraseña
   * @param {Object} context - Datos para la plantilla
   * @returns {string} HTML
   */
  renderPasswordResetTemplate({ name, resetUrl }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Restablece tu contraseña en COOPCO</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
          .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 3px; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Restablece tu contraseña en COOPCO</h2>
          <p>Hola ${name},</p>
          <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en COOPCO.</p>
          <p>Por favor, haz clic en el siguiente botón para crear una nueva contraseña:</p>
          <p style="text-align: center; margin: 25px 0;">
            <a href="${resetUrl}" class="button">Restablecer contraseña</a>
          </p>
          <p>Si el botón no funciona, copia y pega la siguiente URL en tu navegador:</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>Este enlace expirará en 24 horas.</p>
          <p>Si no has solicitado este cambio, puedes ignorar este mensaje y tu contraseña no será modificada.</p>
          <div class="footer">
            <p>Este es un mensaje automático, por favor no respondas a este email.</p>
            <p>© ${new Date().getFullYear()} COOPCO. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Renderiza una plantilla por defecto cuando no hay otra específica
   * @param {Object} context - Contexto con contenido
   * @returns {string} HTML
   */
  renderDefaultTemplate({ subject, content }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${subject || 'Mensaje de COOPCO'}</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>${subject || 'Mensaje de COOPCO'}</h2>
          <div>${content || 'No hay contenido disponible'}</div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} COOPCO. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

/**
 * Helper function to send invitation emails
 * @param {string} email - Recipient email
 * @param {string} token - Invitation token
 * @returns {Promise<Object>} Result of sending operation
 */
const sendInvitationEmail = async (email, token) => {
  try {
    const emailService = new EmailService();
    const invitationLink = `${frontendUrl}/register?token=${token}&email=${encodeURIComponent(email)}`;
    
    return await emailService.sendEmail({
      to: email,
      subject: 'Invitación a COOPCO',
      template: 'invitation',
      context: {
        email,
        invitationLink
      }
    });
  } catch (error) {
    console.error(`Error sending invitation email to ${email}:`, error);
    // Note: Don't throw error here to prevent invitation creation from failing
    return { success: false, error: error.message };
  }
};

module.exports = {
  EmailService,
  sendInvitationEmail
}; 