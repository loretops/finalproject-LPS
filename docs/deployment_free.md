# Guía de Despliegue Gratuito para el MVP

Esta guía te ayudará a desplegar tu MVP usando servicios gratuitos y populares, con ejemplos y enlaces útiles. El objetivo es que puedas tener tu plataforma online sin coste inicial y con el menor esfuerzo posible.

---

## Índice
1. [Resumen de la arquitectura](#resumen-de-la-arquitectura)
2. [Servicios gratuitos recomendados](#servicios-gratuitos-recomendados)
3. [Despliegue del Frontend (Vercel)](#despliegue-del-frontend-vercel)
4. [Despliegue del Backend (Render)](#despliegue-del-backend-render)
5. [Base de datos gratuita (Supabase/ElephantSQL)](#base-de-datos-gratuita-supabaseelephantsql)
6. [Almacenamiento de archivos (Cloudinary)](#almacenamiento-de-archivos-cloudinary)
7. [Email transaccional gratuito (Resend/Mailtrap)](#email-transaccional-gratuito-resendmailtrap)
8. [Variables de entorno y configuración](#variables-de-entorno-y-configuración)
9. [Notas y buenas prácticas](#notas-y-buenas-prácticas)
10. [Adaptación del código para despliegue en la nube](#adaptación-del-código-para-despliegue-en-la-nube)

---

## 1. Resumen de la arquitectura
- **Frontend:** Next.js (React) → Vercel
- **Backend:** Node.js/Express → Render
- **Base de datos:** PostgreSQL → Supabase o ElephantSQL
- **Almacenamiento:** Cloudinary (documentos e imágenes)
- **Email:** Resend o Mailtrap (para pruebas)

## 2. Servicios gratuitos recomendados
- **Frontend:** [Vercel](https://vercel.com/) o [Netlify](https://www.netlify.com/)
- **Backend:** [Render](https://render.com/) o [Railway](https://railway.app/)
- **Base de datos:** [Supabase](https://supabase.com/) (500MB gratis) o [ElephantSQL](https://www.elephantsql.com/)
- **Almacenamiento:** [Cloudinary](https://cloudinary.com/) (25GB/mes gratis)
- **Email:** [Resend](https://resend.com/) (plan gratuito) o [Mailtrap](https://mailtrap.io/)

## 3. Despliegue del Frontend (Vercel)
1. Crea una cuenta en [Vercel](https://vercel.com/signup).
2. Conecta tu repositorio de GitHub/GitLab/Bitbucket.
3. Selecciona el proyecto y elige el directorio `frontend` como raíz.
4. Vercel detectará automáticamente Next.js y configurará el build.
5. Añade las variables de entorno necesarias desde el panel de Vercel (`Settings > Environment Variables`).
6. Haz deploy. Obtendrás una URL pública gratuita.
   - **Guía oficial:** https://vercel.com/docs

## 4. Despliegue del Backend (Render)
1. Crea una cuenta en [Render](https://dashboard.render.com/register).
2. Elige "New Web Service" y conecta tu repositorio.
3. Selecciona el directorio `backend` como raíz.
4. Elige entorno Node.js, y configura el comando de build y start (ejemplo: `npm install && npm run build`, `npm start`).
5. Añade las variables de entorno necesarias (`Settings > Environment`).
6. Render te dará una URL pública para tu API (ejemplo: `https://mi-backend.onrender.com`).
   - **Guía oficial:** https://render.com/docs/deploy-node-express-app

## 5. Base de datos gratuita (Supabase/ElephantSQL)
### Opción 1: Supabase
1. Regístrate en [Supabase](https://app.supabase.com/).
2. Crea un nuevo proyecto y toma nota de la URL y la contraseña de la base de datos.
3. Configura la cadena de conexión en tu backend (variable `DATABASE_URL`).
   - **Guía oficial:** https://supabase.com/docs/guides/database

### Opción 2: ElephantSQL
1. Regístrate en [ElephantSQL](https://www.elephantsql.com/).
2. Crea una instancia gratuita (Tiny Turtle).
3. Copia la URL de conexión y configúrala en tu backend.
   - **Guía oficial:** https://www.elephantsql.com/docs/index.html

## 6. Almacenamiento de archivos (Cloudinary)
1. Regístrate en [Cloudinary](https://cloudinary.com/users/register/free).
2. Crea un "Cloud" y toma nota de tu `cloud_name`, `api_key` y `api_secret`.
3. Configura estas variables en tu backend y frontend si es necesario.
   - **Guía oficial:** https://cloudinary.com/documentation/node_integration

## 7. Email transaccional gratuito (Resend/Mailtrap)
### Opción 1: Resend
1. Regístrate en [Resend](https://resend.com/).
2. Crea una API Key y configúrala en tu backend.
   - **Guía oficial:** https://resend.com/docs

### Opción 2: Mailtrap (solo pruebas)
1. Regístrate en [Mailtrap](https://mailtrap.io/).
2. Crea un inbox y copia las credenciales SMTP.
3. Configura estas credenciales en tu backend.
   - **Guía oficial:** https://mailtrap.io/docs/

## 8. Variables de entorno y configuración
- Asegúrate de definir todas las variables necesarias en cada servicio:
  - `DATABASE_URL` (cadena de conexión PostgreSQL)
  - `JWT_SECRET` (clave secreta para autenticación)
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD` (o API Key de Resend)
  - Cualquier otra variable usada en tu `.env.example`

## 9. Notas y buenas prácticas
- **Mantén sincronizados los esquemas de la base de datos** (usa migraciones de Prisma: `npx prisma migrate deploy`).
- **Revisa los logs de cada servicio** para detectar errores de configuración.
- **Configura CORS** correctamente en el backend para aceptar peticiones del frontend desplegado.
- **Protege las variables sensibles**: nunca las subas al repositorio.
- **Haz pruebas en cada entorno** antes de pasar a producción.
- **Documenta las URLs de cada servicio** para que el equipo las tenga localizadas.

## 10. Adaptación del código para despliegue en la nube

Antes de desplegar, asegúrate de:

- **Almacenamiento de archivos:**
  - Implementa y usa un servicio de almacenamiento en Cloudinary (o similar) para la nube.
  - Selecciona el servicio de almacenamiento mediante la variable de entorno `STORAGE_STRATEGY` (`local` para desarrollo, `cloudinary` para la nube).
- **CORS:**
  - Configura los orígenes permitidos dinámicamente usando la variable de entorno `CORS_ORIGIN`.
- **Base de datos:**
  - Usa la variable `DATABASE_URL` para conectar con Supabase o ElephantSQL.
- **Email:**
  - Usa variables de entorno para SMTP, Resend o Mailtrap según el entorno.
- **Variables de entorno:**
  - Prepara un archivo `.env.example.cloud` con ejemplos para cada servicio cloud.

### Ejemplo de archivo `.env.example.cloud`

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

# Email (Resend o Mailtrap)
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=587
EMAIL_USER=api_key_de_resend
EMAIL_PASSWORD=api_key_de_resend
EMAIL_FROM=noreply@tudominio.com

# O para Mailtrap (solo pruebas)
# EMAIL_HOST=smtp.mailtrap.io
# EMAIL_PORT=2525
# EMAIL_USER=usuario_mailtrap
# EMAIL_PASSWORD=contraseña_mailtrap
# EMAIL_FROM=noreply@tudominio.com
```

> **Recuerda:** No subas nunca tus archivos `.env` reales al repositorio. Usa solo los archivos de ejemplo.

### Selección dinámica del servicio de almacenamiento

En el backend, selecciona el servicio de almacenamiento según la variable de entorno `STORAGE_STRATEGY`. Por ejemplo:

```js
// Pseudocódigo para inicializar el servicio de almacenamiento
const strategy = process.env.STORAGE_STRATEGY || 'local';
let storageService;
if (strategy === 'cloudinary') {
  storageService = new CloudinaryStorageService();
} else {
  storageService = new LocalStorageService();
}
```

Asegúrate de que todos los puntos de subida/descarga de archivos usen este servicio.

---

¿Dudas o problemas? Consulta la documentación oficial de cada servicio o pregunta en la comunidad. 