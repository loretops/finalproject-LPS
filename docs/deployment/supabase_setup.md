# Configuración de Supabase para Base de Datos

Esta guía te ayudará a configurar Supabase como servicio de base de datos PostgreSQL para la aplicación.

## Paso 1: Crear una cuenta en Supabase

1. Ve a [Supabase](https://app.supabase.com/) y regístrate
2. Puedes usar GitHub, GitLab o tu correo electrónico para registrarte

## Paso 2: Crear un nuevo proyecto

1. Una vez dentro del dashboard, haz clic en "New Project"
2. Asigna un nombre al proyecto (ej. `coopco-prod`)
3. Establece una contraseña segura para la base de datos
4. Selecciona la región más cercana a tus usuarios
5. Selecciona el plan gratuito para comenzar (se puede actualizar después)
6. Haz clic en "Create new project"

## Paso 3: Obtener credenciales de conexión

1. Espera a que se cree el proyecto (puede tardar unos minutos)
2. Ve a "Settings" > "Database" en el menú lateral
3. En la sección "Connection string", selecciona "URI" y copia la cadena de conexión
4. Reemplaza `[YOUR-PASSWORD]` con la contraseña que estableciste al crear el proyecto

## Paso 4: Configurar variables de entorno

Añade esta variable a tu archivo `.env.cloud`:

```
DATABASE_URL=postgresql://postgres:[TU-PASSWORD]@[TU-HOST]:[TU-PUERTO]/postgres
```

## Paso 5: Ejecutar migraciones de Prisma

Una vez configurada la conexión a la base de datos, debes ejecutar las migraciones para crear las tablas:

```bash
cd backend
npx prisma migrate deploy
```

## Limitaciones del plan gratuito de Supabase

- Máximo 500MB de almacenamiento en base de datos
- Máximo 2GB de ancho de banda por mes
- Limitado a 50MB de almacenamiento por tabla
- Sin backups automáticos (debes hacerlos manualmente)

## Consejos para optimización

1. **Índices**: Asegúrate de que todos los campos de búsqueda frecuente tengan índices
2. **Consultas optimizadas**: Evita seleccionar campos innecesarios (`SELECT *`)
3. **Paginación**: Implementa paginación para grandes conjuntos de datos
4. **Relaciones**: Utiliza correctamente las relaciones y joins en Prisma

## Monitorización

1. Desde el panel de Supabase, puedes monitorizar:
   - Uso de almacenamiento
   - Conexiones activas
   - Rendimiento de consultas
   - Uso de ancho de banda

## Seguridad

1. **Rotación de contraseñas**: Cambia la contraseña de la base de datos periódicamente
2. **Control de acceso**: Utiliza roles y permisos para limitar el acceso
3. **Auditoría**: Activa el registro de consultas para auditoría en entornos de producción
4. **Backups**: Realiza copias de seguridad regulares de tus datos 