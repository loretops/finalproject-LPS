# Configuración de Gmail para envío de correos

Esta guía te ayudará a configurar Gmail como servicio de correo electrónico para tu aplicación.

## Paso 1: Habilitar acceso de aplicaciones menos seguras o Contraseñas de aplicación

### Opción A: Contraseñas de aplicación (recomendado)

1. Ve a [Tu cuenta de Google](https://myaccount.google.com/)
2. Haz clic en "Seguridad" en el menú lateral
3. En la sección "Iniciar sesión en Google", habilita la verificación en dos pasos si aún no lo has hecho
4. Una vez habilitada, aparecerá la opción "Contraseñas de aplicación"
5. Selecciona "Contraseñas de aplicación"
6. En "Seleccionar app", elige "Otra (nombre personalizado)"
7. Nombra la aplicación (ej. "CoopCo App")
8. Haz clic en "Generar"
9. Copia la contraseña de 16 caracteres que se genera (sin espacios)

### Opción B: Permitir el acceso de aplicaciones menos seguras (no recomendado para cuentas personales)

1. Ve a [Configuración de seguridad de Google](https://myaccount.google.com/security)
2. Desplázate hacia abajo hasta "Acceso de aplicaciones menos seguras"
3. Activa "Permitir el acceso de aplicaciones menos seguras"

## Paso 2: Configurar variables de entorno

Añade estas variables a tu archivo `.env.cloud`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_SECURE=false
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=tu_contraseña_de_aplicacion
EMAIL_FROM=tu_correo@gmail.com
```

## Paso 3: Probar la configuración

Es recomendable probar la configuración enviando un correo de prueba:

```javascript
// Ejemplo de código para probar el envío
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "correo_de_prueba@example.com",
      subject: "Prueba de configuración",
      text: "Si recibes este correo, la configuración es correcta."
    });
    console.log("Email enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar email:", error);
  }
}

testEmail();
```

## Limitaciones de Gmail para envío de correos

- **Límite diario**: Aproximadamente 500 correos por día para cuentas personales
- **Límite de destinatarios**: Máximo 100 destinatarios por correo
- **Tamaño de adjuntos**: Máximo 25MB por correo

## Consideraciones de seguridad (OWASP)

1. **No expongas las credenciales**: Nunca incluyas credenciales en el código o en repositorios
2. **Rota contraseñas periódicamente**: Cambia la contraseña de aplicación cada cierto tiempo
3. **Monitoriza actividad**: Revisa periódicamente la actividad de la cuenta en Google
4. **Limita el alcance**: Usa una cuenta de correo específica para la aplicación, no tu cuenta personal
5. **Implementa verificación de dominio**: Para evitar que tus correos sean marcados como spam

## Alternativas para entornos de producción

Cuando tu aplicación crezca, considera migrar a servicios específicos para correo transaccional:

- SendGrid (2,000 correos gratis al mes)
- Mailgun (5,000 correos gratis durante 3 meses)
- Amazon SES (62,000 correos gratis al mes si usas EC2) 