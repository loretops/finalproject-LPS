# Ejemplo de Archivo .env

Copia este contenido a un archivo `.env` en la raíz del proyecto y personaliza los valores según tu entorno:

```
# Base de datos
DATABASE_URL=postgresql://coopco_user:dlqdu92udjlal@localhost:5432/coopco 

# Configuración de la aplicación
NODE_ENV=development
FRONTEND_PORT=3001
BACKEND_PORT=8001
FRONTEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:8001
JWT_SECRET=secreto_para_jwt_cambiame_en_produccion
JWT_EXPIRES_IN=7d

# Servicios externos (si es necesario)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Correo (opcional para desarrollo)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=tu_email
EMAIL_PASSWORD=tu_password
```

## ¿Por qué estas variables?

- **DATABASE_URL**: Conexión a PostgreSQL con formato específico para Prisma
- **NODE_ENV**: Controla el modo de ejecución (development/production)
- **FRONTEND/BACKEND_PORT**: Puertos personalizables para evitar conflictos
- **FRONTEND/BACKEND_URL**: URLs completas para referencias entre servicios y construcción de enlaces
- **JWT_SECRET**: Clave para firmar tokens de autenticación (¡crítica para seguridad!)
- **CLOUDINARY_***: Necesarias para almacenamiento de documentos e imágenes
- **EMAIL_***: Configuración para envío de invitaciones y notificaciones

## Variables Adicionales para Producción

```
# En producción, añade estas variables
NODE_ENV=production
FRONTEND_URL=https://tudominio.com
BACKEND_URL=https://api.tudominio.com
CORS_ORIGIN=https://tudominio.com
COOKIE_SECURE=true
``` 