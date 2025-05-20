const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno del backend primero
dotenv.config({ path: path.join(__dirname, '../../../.env') });

// Configuración del transporte SMTP desde variables de entorno
console.log('Configurando transporte SMTP con:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465
});

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
 * Generates the HTML content for the invitation email.
 * @param {string} toEmail - Recipient's email.
 * @param {string} invitationLink - The full invitation link.
 * @returns {string} HTML email content.
 */
function getInvitationEmailHtml(toEmail, invitationLink) {
  // Plantilla HTML básica (se puede mejorar con librerías o archivos externos)
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
        <p>Hola ${toEmail},</p>
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
 * Sends an invitation email.
 * @param {string} toEmail - The recipient's email address.
 * @param {string} token - The unique invitation token.
 * @returns {Promise<void>}
 * @throws {Error} If sending fails.
 */
async function sendInvitationEmail(toEmail, token) {
  if (!toEmail || !token) {
    console.error('Error: Email o token faltante', { toEmail, token });
    throw new Error('Recipient email and token are required to send invitation.');
  }

  console.log('Preparando envío de email de invitación:', {
    to: toEmail,
    from: senderEmail,
    frontendUrl,
    token
  });

  const invitationLink = `${frontendUrl}/invitation/${token}`;
  const htmlContent = getInvitationEmailHtml(toEmail, invitationLink);

  const mailOptions = {
    from: senderEmail,
    to: toEmail,
    subject: 'Invitación para unirte a COOPCO',
    html: htmlContent,
  };

  try {
    console.log(`Intentando enviar email de invitación a ${toEmail}...`);
    console.log('Opciones de email:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email de invitación enviado con éxito:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });
    return info;
  } catch (error) {
    console.error(`Error detallado al enviar email de invitación a ${toEmail}:`, {
      error: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    throw new Error(`Failed to send invitation email: ${error.message}`);
  }
}

module.exports = {
  sendInvitationEmail,
}; 