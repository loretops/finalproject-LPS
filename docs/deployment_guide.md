# Guía de Despliegue Completa

Esta guía te ayudará a desplegar la aplicación completa en entornos gratuitos, permitiendo que el Product Owner pueda probar el MVP antes de invertir en un entorno de producción.

## Requisitos previos

- Cuenta de GitHub/GitLab para almacenar el código
- Acceso a los siguientes servicios (todos tienen planes gratuitos):
  - Supabase (base de datos PostgreSQL)
  - Cloudinary (almacenamiento de archivos)
  - Gmail (envío de correos)
  - Render (hosting del backend)
  - Vercel (hosting del frontend)

## Resumen del proceso

El despliegue completo se realiza en 5 etapas:

1. **Base de datos**: Configurar Supabase como base de datos PostgreSQL
2. **Almacenamiento**: Configurar Cloudinary para documentos e imágenes
3. **Email**: Configurar Gmail para envío de correos
4. **Backend**: Desplegar el servicio de API en Render
5. **Frontend**: Desplegar la interfaz de usuario en Vercel

## Paso 1: Configuración de la base de datos en Supabase

Sigue la guía detallada en [supabase_setup.md](supabase_setup.md) para:
1. Crear una cuenta en Supabase
2. Crear un nuevo proyecto
3. Obtener la URL de conexión
4. Ejecutar las migraciones de Prisma

## Paso 2: Configuración de almacenamiento en Cloudinary

Sigue la guía detallada en [cloudinary_setup.md](cloudinary_setup.md) para:
1. Crear una cuenta en Cloudinary
2. Obtener las credenciales de API
3. Configurar la estructura de carpetas
4. Implementar medidas de seguridad recomendadas

## Paso 3: Configuración de servicio de correo con Gmail

Sigue la guía detallada en [gmail_setup.md](gmail_setup.md) para:
1. Crear una contraseña de aplicación en Gmail
2. Configurar las variables de entorno para el envío de correos
3. Realizar pruebas de envío

## Paso 4: Despliegue del backend en Render

Sigue la guía detallada en [render_backend_setup.md](render_backend_setup.md) para:
1. Crear una cuenta en Render
2. Configurar un nuevo servicio web
3. Conectar tu repositorio
4. Configurar variables de entorno
5. Iniciar el despliegue

## Paso 5: Despliegue del frontend en Vercel

Sigue la guía detallada en [vercel_frontend_setup.md](vercel_frontend_setup.md) para:
1. Crear una cuenta en Vercel
2. Importar tu repositorio
3. Configurar el directorio raíz y comandos de construcción
4. Configurar variables de entorno
5. Iniciar el despliegue

## Consideraciones de seguridad

Para asegurar tu despliegue, verifica estos puntos:

1. **Variables de entorno**: Asegúrate de que todas las claves secretas estén configuradas como variables de entorno y no en el código
2. **CORS**: Verifica que la configuración CORS del backend permita solo el origen de tu frontend
3. **Cabeceras HTTP**: Revisa que las cabeceras de seguridad estén correctamente configuradas
4. **Rate limiting**: Comprueba que el rate limiting esté activo para prevenir ataques de fuerza bruta
5. **Permisos de base de datos**: Configura los permisos mínimos necesarios en Supabase

## Pruebas post-despliegue

Una vez completado el despliegue, verifica:

1. **Registro e inicio de sesión**: Prueba el flujo completo de registro e inicio de sesión
2. **Funcionalidad principal**: Verifica que todas las funciones principales del MVP funcionen
3. **Subida de archivos**: Prueba la subida y visualización de documentos e imágenes
4. **Envío de correos**: Verifica que las invitaciones y notificaciones por correo funcionen
5. **Rendimiento**: Comprueba que los tiempos de carga sean aceptables

## Resolución de problemas comunes

### Backend no responde
- Verifica los logs en Render (puede estar hibernando en plan gratuito)
- Comprueba que las variables de entorno estén correctamente configuradas
- Revisa que la URL de la base de datos sea correcta

### Frontend no se conecta al backend
- Verifica que `NEXT_PUBLIC_BACKEND_URL` apunte a la URL correcta del backend
- Comprueba la configuración CORS en el backend
- Revisa los errores en la consola del navegador

### Problemas con archivos o imágenes
- Verifica las credenciales de Cloudinary
- Comprueba que `STORAGE_STRATEGY` esté configurado como `cloudinary`
- Revisa los permisos de las carpetas en Cloudinary

### Correos no se envían
- Verifica las credenciales de Gmail
- Comprueba que la cuenta no haya alcanzado el límite diario
- Revisa que los correos no estén siendo marcados como spam 