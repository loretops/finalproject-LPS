# Configuración de Supabase para el proyecto

Esta guía te ayudará a configurar tu base de datos PostgreSQL gratuita usando Supabase.

## Paso 1: Crear una cuenta en Supabase

1. Ve a [Supabase](https://app.supabase.com/) y regístrate con GitHub, GitLab o Google
2. Confirma tu correo electrónico si es necesario

## Paso 2: Crear un nuevo proyecto

1. Haz clic en "New Project" en el dashboard
2. Elige un nombre para tu proyecto (ej. `coopco-prod`)
3. Establece una contraseña segura para la base de datos
4. Selecciona la región más cercana a tus usuarios (ej. `eu-west-1` para Europa)
5. Mantén el plan gratuito seleccionado
6. Haz clic en "Create new project"

## Paso 3: Obtener credenciales de conexión

Una vez creado el proyecto, necesitarás estas credenciales:

1. En el menú lateral, ve a "Project Settings" > "Database"
2. Desplázate hasta "Connection string" y selecciona "URI"
3. Copia la cadena de conexión, se verá así:
   ```
   postgresql://postgres:[TU-CONTRASEÑA]@db.[ID-PROYECTO].supabase.co:5432/postgres
   ```
4. Guarda esta cadena para configurarla como `DATABASE_URL` en tu archivo `.env`

## Paso 4: Migrar esquema usando Prisma

1. En tu archivo `.env.cloud` añade la URL de conexión:
   ```
   DATABASE_URL=postgresql://postgres:[TU-CONTRASEÑA]@db.[ID-PROYECTO].supabase.co:5432/postgres
   ```
2. Ejecuta las migraciones para crear el esquema:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

## Paso 5: Configuración de seguridad

1. En Supabase, ve a "Authentication" > "Providers"
2. Desactiva los métodos de autenticación que no uses
3. En "Database" > "Roles", asegúrate de que solo los roles necesarios tengan permisos

## Limitaciones del plan gratuito de Supabase

- 500 MB de almacenamiento de base de datos
- Sin backups automatizados (realiza backups manuales periódicamente)
- Proyectos inactivos pueden ser pausados después de 1 semana
- Limitado a 2 proyectos gratuitos por cuenta

## Monitorización

1. En el dashboard de Supabase, ve a "Database" > "Insights" para monitorizar el rendimiento
2. Vigila el uso de almacenamiento en "Project Settings" > "Usage" 