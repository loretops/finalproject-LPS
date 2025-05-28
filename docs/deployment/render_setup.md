# Configuración y Despliegue en Render

Esta guía unificada te ayudará a desplegar el backend de la aplicación en Render y solucionar problemas comunes como la configuración de CORS.

## Índice
1. [Creación y configuración del servicio](#paso-1-crear-una-cuenta-en-render)
2. [Configuración de variables de entorno](#paso-4-configurar-variables-de-entorno)
3. [Despliegue y verificación](#paso-5-desplegar-el-servicio)
4. [Solución de problemas de CORS](#solución-de-problemas-de-cors)
5. [Seguridad y optimización](#configuración-adicional-de-seguridad-owasp)
6. [Limitaciones y consideraciones](#limitaciones-del-plan-gratuito-de-render)

## Paso 1: Crear una cuenta en Render

1. Ve a [Render](https://dashboard.render.com/register) y regístrate
2. Puedes usar GitHub, GitLab o tu correo electrónico para registrarte

## Paso 2: Conectar repositorio

1. Una vez dentro del dashboard, haz clic en "New +" y selecciona "Web Service"
2. Conecta tu cuenta de GitHub o GitLab si aún no lo has hecho
3. Selecciona el repositorio donde se encuentra tu proyecto

## Paso 3: Configurar el servicio web

Completa el formulario con la siguiente información:

1. **Name**: Nombre para tu servicio (ej. `coopco-backend`)
2. **Environment**: Selecciona `Node`
3. **Region**: Elige la región más cercana a tus usuarios
4. **Branch**: Generalmente `main` o `master`
5. **Build Command**: `cd backend && npm install && npm run build`
6. **Start Command**: `cd backend && npm start`
7. **Plan Type**: Free

## Paso 4: Configurar variables de entorno

1. Desplázate hasta la sección "Environment Variables"
2. Añade todas las variables necesarias basándote en tu archivo `.env.cloud`:
   - `DATABASE_URL` (URL de Supabase)
   - `NODE_ENV=production`
   - `BACKEND_URL` (URL que Render te asignará, puedes actualizar esto después)
   - `FRONTEND_URL` (URL de tu frontend en Vercel)
   - `CORS_ORIGIN` (URL de tu frontend en Vercel)
   - `JWT_SECRET` (genera una clave segura)
   - `JWT_EXPIRES_IN=7d`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `STORAGE_STRATEGY=cloudinary`
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `EMAIL_SECURE=false`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `EMAIL_FROM`
   - `COOKIE_SECURE=true`
   - `COOKIE_HTTP_ONLY=true`
   - `COOKIE_SAME_SITE=strict`
   - `RATE_LIMIT_WINDOW=15`
   - `RATE_LIMIT_MAX=100`

### Variables críticas para CORS

Para evitar problemas de CORS entre el frontend en Vercel y el backend en Render, asegúrate de configurar correctamente estas variables:

| Variable | Valor |
|----------|-------|
| `FRONTEND_URL` | `https://coopco.vercel.app` (o el dominio específico de tu frontend) |
| `CORS_ORIGIN` | `https://coopco.vercel.app` (o el dominio específico de tu frontend) |

> **IMPORTANTE**: El error CORS más común indica que la cabecera `Access-Control-Allow-Origin` no coincide con el dominio del frontend en Vercel. Asegúrate de que estas variables contengan exactamente la URL completa de tu frontend, incluyendo el protocolo `https://`.

## Paso 5: Desplegar el servicio

1. Haz clic en "Create Web Service"
2. Render comenzará a construir y desplegar tu aplicación
3. Espera a que el proceso termine (puede tardar unos minutos)

## Paso 6: Verificar el despliegue

1. Una vez completado el despliegue, haz clic en la URL proporcionada
2. Deberías ver una respuesta del servidor o un mensaje de estado
3. Prueba el endpoint de salud: `https://tu-servicio.onrender.com/api/health`

## Solución de problemas de CORS

Si encuentras errores CORS después del despliegue:

1. Accede al Dashboard de Render
2. Selecciona el servicio del backend
3. Ve a "Environment" o "Variables de Entorno"
4. Verifica que `FRONTEND_URL` y `CORS_ORIGIN` tienen los valores correctos
5. Después de actualizar las variables, Render reiniciará automáticamente el servicio
6. Revisa los logs para confirmar que el servicio se ha iniciado correctamente y busca el mensaje de depuración:
   ```
   DEBUG STARTUP - Reading FRONTEND_URL env var: https://coopco.vercel.app
   ```

## Configuración adicional de seguridad (OWASP)

1. **Habilitar Auto-HTTPS**: Render proporciona HTTPS automáticamente
2. **Configurar cabeceras de seguridad**: Ya implementadas con Helmet
3. **Monitoreo de logs**: En el dashboard de Render, ve a la pestaña "Logs"

## Limitaciones del plan gratuito de Render

- **Tiempo de ejecución**: El servicio se apaga después de 15 minutos de inactividad
- **Recursos**: 512 MB de RAM, CPU compartida
- **Ancho de banda**: 100 GB/mes
- **Builds**: 500 minutos de build por mes

## Optimización de rendimiento

1. **Minimizar dependencias**: Elimina paquetes no utilizados
2. **Habilitar compresión**: Ya configurado con Helmet
3. **Implementar caché**: Considera añadir Redis si es necesario (no disponible en plan gratuito)

## Monitorización y diagnóstico

1. **Logs**: Accede a los logs desde el dashboard de Render
2. **Métricas**: Revisa las métricas básicas proporcionadas
3. **Alertas**: Configura alertas por correo electrónico para fallos del servicio

> **Nota**: Cuando el servicio está en el plan gratuito, se apagará después de 15 minutos de inactividad. La primera solicitud después de este periodo puede tardar hasta 30 segundos en responder mientras el servicio se reinicia. 