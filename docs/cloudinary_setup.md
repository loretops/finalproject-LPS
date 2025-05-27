# Configuración de Cloudinary para almacenamiento

Esta guía te ayudará a configurar Cloudinary como servicio de almacenamiento para documentos e imágenes del proyecto.

## Paso 1: Crear una cuenta en Cloudinary

1. Ve a [Cloudinary](https://cloudinary.com/users/register/free) y regístrate
2. Confirma tu correo electrónico para activar tu cuenta

## Paso 2: Obtener credenciales de API

1. Una vez dentro del dashboard, ve a "Dashboard" en el menú principal
2. Encontrarás tu "Cloud name", "API Key" y "API Secret" en la sección "Account Details"
3. Copia estas credenciales para configurarlas en tu archivo `.env`

## Paso 3: Crear estructura de carpetas (opcional)

Es recomendable organizar tus recursos en carpetas:

1. Ve a "Media Library" en el menú principal
2. Haz clic en "New folder" y crea las siguientes carpetas:
   - `documents` - Para documentos del proyecto
   - `images` - Para imágenes del proyecto
   - `thumbnails` - Para miniaturas de imágenes

## Paso 4: Configurar variables de entorno

Añade estas variables a tu archivo `.env.cloud`:

```
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
STORAGE_STRATEGY=cloudinary
```

## Paso 5: Configuración de seguridad

Para implementar buenas prácticas de seguridad OWASP:

1. En el dashboard de Cloudinary, ve a "Settings" > "Security"
2. Habilita "Strict Transformations" para prevenir manipulación de URL
3. Configura "Allowed Formats" para limitar los tipos de archivos permitidos
4. Activa "Signed Uploads" para archivos que requieran autenticación

## Limitaciones del plan gratuito de Cloudinary

- 25GB de almacenamiento total
- 25GB de ancho de banda mensual
- 500 transformaciones de imágenes por mes
- Sin firma de URL en plan gratuito (las URLs son públicas)

## Buenas prácticas

1. **Validación de archivos**: Siempre valida el tipo y tamaño del archivo antes de subirlo
2. **Transformaciones automáticas**: Utiliza parámetros en la URL para optimizar imágenes (formato WebP, compresión, etc.)
3. **Cache-Control**: Configura correctamente las cabeceras Cache-Control para mejorar el rendimiento
4. **Evitar información sensible**: Nunca almacenes información confidencial en nombres de archivos o carpetas 