# Guía Completa de Despliegue COOPCO

Esta guía unificada proporciona instrucciones detalladas para desplegar la plataforma COOPCO en diferentes entornos, desde opciones gratuitas para el MVP hasta configuraciones de producción más robustas.

## Índice

1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Opciones de Despliegue](#opciones-de-despliegue)
   - [Entorno de Desarrollo](#entorno-de-desarrollo)
   - [MVP en Servicios Gratuitos](#mvp-en-servicios-gratuitos)
   - [Entorno de Producción](#entorno-de-producción)
3. [Configuración de Servicios](#configuración-de-servicios)
   - [Base de Datos (Supabase)](#base-de-datos-supabase)
   - [Almacenamiento (Cloudinary)](#almacenamiento-cloudinary)
   - [Email (Gmail)](#email-gmail)
4. [Despliegue del Backend (Render)](#despliegue-del-backend-render)
5. [Despliegue del Frontend (Vercel)](#despliegue-del-frontend-vercel)
6. [Variables de Entorno](#variables-de-entorno)
7. [Pruebas Post-Despliegue](#pruebas-post-despliegue)
8. [Resolución de Problemas Comunes](#resolución-de-problemas-comunes)
9. [Consideraciones de Seguridad](#consideraciones-de-seguridad)

## Arquitectura del Sistema

La aplicación COOPCO utiliza una arquitectura moderna de múltiples capas:

- **Frontend**: Next.js (React) - Renderizado híbrido (SSR + SSG)
- **Backend**: Node.js con Express.js - API RESTful
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Almacenamiento**: Cloudinary para documentos e imágenes
- **Email**: Servicio de correo (Gmail, Resend, etc.)

### Componentes Principales

| Componente | Tecnología Sugerida | Comentario |
|------------|---------------------|------------|
| Web pública | Next.js | SSR para SEO (proyectos, blog, contacto) |
| Área de socios | Next.js + Auth por token | Acceso solo tras login + invitación |
| API privada | Node.js + Express.js | Servicios para login, inversiones, documentos, etc. |
| Base de datos | PostgreSQL + Prisma ORM | Fácil de trabajar y escalar |
| Autenticación | JWT con roles | Ligero, seguro, fácilmente ampliable |
| Almacenamiento | Cloudinary | Para documentos, imágenes y videos |
| Email | Gmail/Resend/SendGrid | Para notificaciones y comunicaciones |

## Opciones de Despliegue

### Entorno de Desarrollo

Para desarrollo local:

```bash
# Iniciar backend
cd backend
npm install
npm run dev

# Iniciar frontend en otra terminal
cd frontend
npm install
npm run dev
```

### MVP en Servicios Gratuitos

Para validar rápidamente el producto con usuarios reales con costes mínimos:

| Componente | Servicio | Plan | Limitaciones |
|------------|----------|------|--------------|
| Frontend | Vercel | Hobby (Gratis) | - |
| Backend | Render | Gratis | Se "duerme" tras 15 min de inactividad |
| Base de Datos | Supabase | Gratis | 500MB máximo |
| Almacenamiento | Cloudinary | Gratis | 25GB/mes |
| Email | Resend/Gmail | Gratis | Límites de envío diario |

**Ventajas**:
- Coste cero inicial
- Despliegue rápido (minutos)
- Integración con GitHub
- Dominios temporales incluidos

**Desventajas**:
- Limitaciones de uso
- Sin garantías de disponibilidad (SLA)
- Funcionalidades restringidas
- Migración posterior necesaria

### Entorno de Producción

Para un entorno robusto y escalable:

#### Opción A: Nube Gestionada (DigitalOcean)

| Componente | Configuración | Coste Estimado |
|------------|---------------|----------------|
| Frontend | Droplet (2vCPU/4GB RAM) | ~$24/mes |
| Backend | Droplet (2vCPU/4GB RAM) | ~$24/mes |
| Base de Datos | PostgreSQL gestionado (2vCPU/4GB) | ~$60/mes |
| Almacenamiento | Spaces (S3-compatible) | ~$5/mes |
| Balanceador | Load Balancer | ~$12/mes |
| **Total** | | **~$125/mes** |

#### Opción B: Servicios Gestionados

| Componente | Servicio | Coste Estimado |
|------------|----------|----------------|
| Frontend | Vercel (Pro) | ~$20/mes |
| Backend | DigitalOcean App Platform | ~$24/mes |
| Base de Datos | DigitalOcean DB (1GB) | ~$15/mes |
| Almacenamiento | Cloudinary | ~$89/mes |
| Email | SendGrid | ~$15/mes |
| **Total** | | **~$164/mes** |

#### Opción C: Híbrida Optimizada

Versión optimizada para reducir costes después de validar el MVP:

| Componente | Servicio | Coste Estimado |
|------------|----------|----------------|
| Frontend | Vercel (Pro básico) | ~$20/mes |
| Backend | DigitalOcean Droplet (1GB) | ~$6/mes |
| Base de Datos | DigitalOcean DB (1GB) | ~$15/mes |
| Almacenamiento | Cloudinary + DO Spaces | ~$20/mes |
| Email | Resend/SendGrid | ~$15/mes |
| **Total** | | **~$76/mes** |

## Configuración de Servicios

### Base de Datos (Supabase)

1. **Crear cuenta y proyecto**:
   - Regístrate en [Supabase](https://app.supabase.com/)
   - Crea un nuevo proyecto con PostgreSQL
   - Guarda la URL de conexión y contraseña

2. **Ejecutar migraciones**:
   ```bash
   export DATABASE_URL=postgresql://postgres:[TU-PASSWORD]@[TU-HOST]:[TU-PUERTO]/postgres
   cd backend
   npx prisma migrate deploy
   ```

### Almacenamiento (Cloudinary)

1. **Crear cuenta**:
   - Regístrate en [Cloudinary](https://cloudinary.com/users/register/free)
   - Accede al dashboard y encuentra tus credenciales

2. **Crear estructura de carpetas** (recomendado):
   - Crea carpetas para `documents`, `images` y `thumbnails`

3. **Configuraciones de seguridad recomendadas**:
   - Habilita "Strict Transformations"
   - Configura "Allowed Formats"
   - Activa "Signed Uploads" si es posible

### Email (Gmail)

1. **Obtener contraseña de aplicación**:
   - Ve a [Tu cuenta de Google](https://myaccount.google.com/)
   - Habilita verificación en dos pasos si no está habilitada
   - Crea una contraseña de aplicación específica

2. **Consideraciones**:
   - Límite de ~500 correos diarios
   - Máximo 100 destinatarios por correo
   - Tamaño máximo de adjuntos: 25MB

## Despliegue del Backend (Render)

1. **Crear cuenta**:
   - Regístrate en [Render](https://dashboard.render.com/register)

2. **Crear servicio web**:
   - Elige "New Web Service"
   - Conecta tu repositorio de GitHub
   - Configura el servicio:
     - **Name**: coopco-backend
     - **Root Directory**: backend
     - **Environment**: Node
     - **Build Command**: npm install
     - **Start Command**: npm start

3. **Configurar variables de entorno**:
   - En "Environment" añade todas las variables necesarias
   - **IMPORTANTE**: Añade `FRONTEND_URL` y `CORS_ORIGIN` con la URL de tu frontend
   - **JWT_SECRET**: Genera una clave segura (ej. con `openssl rand -base64 32`)

4. **Configurar CORS** (crítico):
   - Asegúrate que las variables `CORS_ORIGIN` y `FRONTEND_URL` contienen exactamente la URL de tu frontend (ej. `https://coopco.vercel.app`)

## Despliegue del Frontend (Vercel)

1. **Crear cuenta**:
   - Regístrate en [Vercel](https://vercel.com/signup)

2. **Importar proyecto**:
   - Conecta tu repositorio de GitHub
   - Configura el proyecto:
     - **Framework Preset**: Next.js
     - **Root Directory**: frontend
     - **Build Command**: npm run build
     - **Output Directory**: .next

3. **Configurar variables de entorno**:
   - Añade `NEXT_PUBLIC_API_URL` con la URL de tu backend
   - Añade cualquier otra variable necesaria para el frontend

## Variables de Entorno

Usa esta configuración como referencia para tus archivos `.env`:

```env
# Base de datos
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/basededatos

# Configuración de la aplicación
NODE_ENV=production
FRONTEND_URL=https://tu-app-frontend.vercel.app
BACKEND_URL=https://tu-api-backend.onrender.com
CORS_ORIGIN=https://tu-app-frontend.vercel.app
JWT_SECRET=clave_secreta_segura
JWT_EXPIRES_IN=7d

# Almacenamiento (Cloudinary)
STORAGE_STRATEGY=cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_SECURE=false
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña_de_aplicacion 
EMAIL_FROM=noreply@tu-dominio.com

# Configuraciones de seguridad
COOKIE_SECURE=true
COOKIE_HTTP_ONLY=true
COOKIE_SAME_SITE=strict
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## Pruebas Post-Despliegue

Una vez completado el despliegue, verifica:

1. **Registro e inicio de sesión**: Prueba el flujo completo
2. **Funcionalidad principal**: Verifica todas las funciones esenciales
3. **Subida de archivos**: Prueba la subida y visualización de documentos
4. **Envío de correos**: Verifica que las invitaciones y notificaciones funcionan
5. **Rendimiento**: Comprueba los tiempos de carga en diferentes dispositivos

## Resolución de Problemas Comunes

### Backend no responde
- Verifica los logs en Render (puede estar hibernando en plan gratuito)
- Comprueba que las variables de entorno estén correctamente configuradas
- Revisa que la URL de la base de datos sea correcta

### Frontend no se conecta al backend
- Verifica que `NEXT_PUBLIC_API_URL` apunte a la URL correcta del backend
- Comprueba la configuración CORS en el backend
- Revisa los errores en la consola del navegador

### Problemas con archivos o imágenes
- Verifica las credenciales de Cloudinary
- Comprueba que `STORAGE_STRATEGY` esté configurado como `cloudinary`
- Revisa los permisos de las carpetas en Cloudinary

### Correos no se envían
- Verifica las credenciales de email
- Comprueba que la cuenta no haya alcanzado el límite diario
- Revisa que los correos no estén siendo marcados como spam

## Consideraciones de Seguridad

### Protecciones Básicas
- **HTTPS obligatorio** en todos los endpoints
- **Rate limiting** para prevenir ataques de fuerza bruta
- **Cabeceras de seguridad**:
  - Content-Security-Policy
  - X-XSS-Protection
  - X-Frame-Options
  - X-Content-Type-Options

### Configuraciones Críticas
- **JWT_SECRET**: Usa una clave compleja y larga (mínimo 32 caracteres)
- **CORS**: Restringe a solo los dominios necesarios
- **Cookies**: Configura con `Secure`, `HttpOnly` y `SameSite=strict`
- **Acceso a Base de Datos**: Usa credenciales con permisos mínimos necesarios

### CORS
- **IMPORTANTE**: En el backend, configura las variables de entorno `FRONTEND_URL` y `CORS_ORIGIN` con el dominio exacto del frontend (ej. `https://coopco.vercel.app`)
- Verifica que la cabecera 'Access-Control-Allow-Origin' se establezca correctamente para permitir peticiones desde el frontend

### Backups
- Configura respaldos automáticos de la base de datos
- Establece política de retención de respaldos (mínimo 30 días)
- Prueba periódicamente la restauración de respaldos

---

Este documento unifica las mejores prácticas y pasos necesarios para desplegar COOPCO en diferentes entornos. Adapta las instrucciones según tus necesidades específicas y la infraestructura disponible. Para más detalles sobre aspectos específicos, consulta la documentación complementaria. 