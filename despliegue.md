### Despliegue e Infraestructura

1. **Opciones de Despliegue:**

   - **Frontend (Next.js):** Puede desplegarse en plataformas como Vercel o Netlify, que ofrecen planes gratuitos para proyectos pequeños. Estas plataformas proporcionan integración fácil con GitHub para despliegue continuo.
   - **Backend (Node.js/Express):** Puede desplegarse en plataformas como Heroku o Render, que también ofrecen planes gratuitos. Estas plataformas soportan aplicaciones Node.js y proporcionan configuración sencilla para variables de entorno y escalado.
   - **Base de Datos (PostgreSQL):** Puede alojarse en servicios como Heroku Postgres o ElephantSQL, que ofrecen planes gratuitos para bases de datos pequeñas.

2. **Requisitos de Infraestructura:**

   - **Frontend:** Requiere un servicio de hosting que soporte generación de sitios estáticos y renderizado del lado del servidor (SSR).
   - **Backend:** Requiere un entorno Node.js con soporte para Express.js y variables de entorno.
   - **Base de Datos:** Requiere un servicio de base de datos PostgreSQL con soporte para Prisma ORM.
   - **Servicios Externos:** Integración con AWS S3 o Cloudinary para almacenamiento de medios, y un servicio de correo electrónico como SendGrid para notificaciones.

3. **Opciones Gratuitas de Despliegue:**
   - **Vercel/Netlify** para el frontend.
   - **Heroku/Render** para el backend.
   - **Heroku Postgres/ElephantSQL** para la base de datos.

### Hoja de Ruta de Desarrollo para el MVP

Basado en las historias de usuario y tickets proporcionados, aquí hay una hoja de ruta para desarrollar el MVP, adaptada para un desarrollador junior:

1. **Registro y Autenticación de Usuarios:**

   - Implementar el registro de usuarios vía invitación (US01).
   - Configurar la confirmación de correo electrónico después del registro (US02).
   - Desarrollar la funcionalidad de inicio de sesión para acceso autenticado (US03).

2. **Oportunidades de Inversión:**

   - Crear un modelo para las oportunidades de inversión (US04).
   - Desarrollar una interfaz frontend para mostrar las oportunidades de inversión (US04).
   - Implementar la lógica backend para marcar interés e inversión (US05).

3. **Gestión de Inversiones:**

   - Diseñar e implementar el sistema de seguimiento de inversiones (US05).
   - Desarrollar una interfaz frontend para que los usuarios indiquen interés de inversión y monto (US05).

4. **Gestión de Documentos:**

   - Implementar visualización segura de documentos sin descarga (US09).

5. **Comunicación y Notificaciones:**

   - Configurar un sistema básico de notificaciones para actualizaciones de inversión (US13).

6. **Características Administrativas:**
   - Desarrollar la funcionalidad para publicar nuevas oportunidades de inversión (US11).

### Orden Sugerido de Desarrollo:

1. **Configuración del Backend:**

   - Configurar el entorno Node.js/Express.
   - Implementar autenticación y autorización de usuarios.
   - Desarrollar endpoints API para registro e inicio de sesión de usuarios.

2. **Configuración del Frontend:**

   - Configurar el entorno Next.js.
   - Desarrollar las páginas de registro e inicio de sesión de usuarios.
   - Implementar rutas protegidas para usuarios autenticados.

3. **Configuración de la Base de Datos:**

   - Configurar PostgreSQL con Prisma ORM.
   - Definir el esquema para usuarios, invitaciones e inversiones.

4. **Características de Inversión:**

   - Desarrollar el modelo de oportunidad de inversión y API.
   - Implementar la interfaz frontend para ver e invertir en oportunidades.

5. **Características de Documentos y Notificaciones:**

   - Implementar visualización segura de documentos.
   - Configurar el sistema de notificaciones para actualizaciones de inversión.

6. **Pruebas y Despliegue:**
   - Escribir pruebas unitarias e integradas para características críticas.
   - Desplegar la aplicación en las plataformas elegidas.

Esta hoja de ruta proporciona un enfoque estructurado para desarrollar el MVP, asegurando que las funcionalidades principales se prioricen y se construyan en una secuencia lógica.

## Instalación y Despliegue

### Desarrollo Local

1. Clonar el repositorio:

   ```
   git clone <url-del-repositorio>
   cd coopco
   ```

2. Instalar dependencias del servidor:

   ```
   npm install
   ```

3. Instalar dependencias del cliente:

   ```
   cd client
   npm install
   cd ..
   ```

4. Configurar variables de entorno:

   - Duplicar el archivo `.env.example` a `.env`
   - Editar `.env` con tus configuraciones

5. Iniciar en modo desarrollo:
   ```
   npm run dev
   ```

### Despliegue en Producción

#### Frontend (Vercel/Netlify)

1. Conectar repositorio a Vercel o Netlify
2. Configurar:
   - Directorio de construcción: `client`
   - Comando de construcción: `npm run build`
   - Directorio de salida: `.next`

#### Backend (Heroku/Render)

1. Conectar repositorio a Heroku o Render
2. Configurar variables de entorno
3. Desplegar automáticamente desde la rama principal

#### Base de Datos (Heroku Postgres/ElephantSQL)

1. Crear una base de datos en el proveedor
2. Obtener la URL de conexión
3. Configurar la variable de entorno `DATABASE_URL`

### Seguridad y Confidencialidad de Datos

Para garantizar la seguridad y confidencialidad de los datos en el proyecto COOPCO, se han implementado las siguientes medidas:

#### 1. Seguridad en la Autenticación y Autorización

- **JWT con caducidad**: Los tokens de acceso caducan después de un tiempo definido.
- **Sistema de roles**: Acceso restringido según el tipo de usuario (visitante, socio, gestor, inversor).
- **Middleware de protección**: Rutas protegidas que verifican permisos.
- **Almacenamiento seguro de contraseñas**: Utilizando bcrypt para hash de contraseñas.

#### 2. Protección de Documentos Sensibles

- **Visualización sin descarga**: Los documentos se muestran en visores embebidos que evitan la descarga.
- **Marcas de agua dinámicas**: Los documentos se muestran con marcas de agua que indican el usuario y fecha.
- **URLs temporales**: Los enlaces a documentos son temporales y generados por usuario.
- **Encriptación de documentos**: Los documentos confidenciales se almacenan encriptados en la base de datos.

#### 3. Registro de Actividad y Auditoría

- **Log de acceso**: Registro de cada acceso a documentos sensibles.
- **Historial de cambios**: Seguimiento de modificaciones en inversiones.
- **Registro de IP y dispositivo**: Para detectar actividades sospechosas.

#### 4. Seguridad en las Comunicaciones

- **HTTPS obligatorio**: Todas las comunicaciones están cifradas.
- **CORS configurado**: Restricción de dominios que pueden acceder a la API.
- **Headers de seguridad**: Configurados con helmet para evitar vulnerabilidades comunes.
- **Rate limiting**: Protección contra ataques de fuerza bruta.

#### 5. Seguridad en la Base de Datos

- **Datos sensibles encriptados**: La información confidencial se guarda encriptada.
- **Acceso restringido**: La base de datos sólo es accesible desde la aplicación.
- **Validación de datos**: Para prevenir inyecciones SQL.

#### 6. Consideraciones para el Despliegue Seguro

**En Backend (Heroku/Render)**:

- Configurar variables de entorno para secretos
- Habilitar HTTPS y certificados SSL
- Configurar políticas de firewall para limitar accesos

**En Base de Datos (ElephantSQL)**:

- Usar contraseñas robustas
- Habilitar SSL para conexiones
- Configurar backups automáticos cifrados

**En Frontend (Vercel/Netlify)**:

- Configurar CSP (Content Security Policy)
- Implementar SRI (Subresource Integrity) para recursos externos
- Habilitar HSTS para forzar HTTPS

#### 7. Cumplimiento de Normativas

- El sistema está diseñado considerando principios de GDPR/RGPD:
  - Consentimiento para datos personales
  - Derecho al olvido (eliminación de datos)
  - Limitación del propósito de recogida de datos
  - Registro de acceso a datos sensibles

### Configuración de Despliegue Automático

#### Despliegue Automático en Vercel (Frontend)

1. **Conectar con GitHub**:

   - Inicia sesión en [Vercel](https://vercel.com)
   - Ve a "Add New" → "Project"
   - Selecciona tu repositorio de GitHub
   - Otorga los permisos necesarios si es la primera vez

2. **Configurar proyecto**:

   - **Framework Preset**: Next.js
   - **Root Directory**: `client` (donde está tu código Next.js)
   - **Build Command**: `npm run build` (o el que uses)
   - **Output Directory**: `.next`

3. **Configurar despliegue automático**:
   - Ve a la pestaña "Git" en la configuración del proyecto
   - En "Production Branch", establece tu rama principal (normalmente `main`)
   - Activa "Build & Deploy on Push" si no está activado
   - Opcionalmente, configura "Preview Deployments" para ramas de desarrollo

#### Despliegue Automático en Render (Backend)

1. **Conectar con GitHub**:

   - Inicia sesión en [Render](https://render.com)
   - Ve a "New" → "Web Service"
   - Conecta con GitHub y selecciona tu repositorio

2. **Configurar el servicio**:

   - **Name**: nombre de tu servicio (ej. "coopco-api")
   - **Root Directory**: Deja en blanco si el código está en la raíz, o especifica la carpeta del backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Configurar despliegue automático**:
   - En la sección "Deploy Hooks", está activado por defecto
   - En "Auto-Deploy", asegúrate de que está configurado como "Yes"
   - Especifica la rama para despliegue automático (normalmente `main`)

#### Configuración de Variables de Entorno

Para ambos servicios, configura las variables de entorno necesarias:

- **Vercel**: En la sección "Settings" → "Environment Variables"
- **Render**: En la sección "Environment" del servicio

Variables críticas:

```
# Para Next.js (Vercel)
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com

# Para Express (Render)
DATABASE_URL=postgres://...
JWT_SECRET=tu_clave_secreta
CLIENT_URL=https://tu-frontend.vercel.app
```

#### Prueba de Despliegue Automático

1. Haz un pequeño cambio en tu repositorio
2. Haz commit y push a la rama principal
3. Observa en el dashboard de Vercel y Render cómo se inician automáticamente nuevos builds
4. Verifica el resultado del despliegue automático

https://finalproject-lps.onrender.com
https://finalproject-lps-eight.vercel.app/
postgresql://neondb_owner:npg_pMCHAcv5n4yK@ep-fragrant-poetry-abqndpay-pooler.eu-west-2.aws.neon.tech/coopco?sslmode=require

### Flujo de Trabajo con Cursor y la App en la Nube

Cursor es un IDE potenciado por IA que puede utilizarse efectivamente para el desarrollo de aplicaciones desplegadas en la nube. A continuación se detalla un flujo de trabajo eficiente:

#### Configuración del Entorno de Desarrollo

1. **Configurar Cursor para el proyecto**:

   - Abre Cursor y clona tu repositorio Git
   - Configura el proyecto como workspace
   - Asegúrate de tener las extensiones necesarias instaladas (ESLint, Prettier, etc.)

2. **Configuración de variables de entorno locales**:
   - Crea un archivo `.env.local` en la raíz del proyecto que contenga:
   ```
   # Variables para desarrollo local
   PORT=5000
   DATABASE_URL=postgres://... # URL de Neon para desarrollo
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
   - Añade `.env.local` a tu `.gitignore` para no exponer credenciales

#### Flujo de Trabajo de Desarrollo

1. **Desarrollo local**:

   - Ejecuta el servidor Next.js (frontend): `cd client && npm run dev`
   - Ejecuta el servidor Express (backend): `npm run dev`
   - Realiza los cambios en Cursor y prueba localmente

2. **Commit y push de cambios**:

   - Una vez probados los cambios localmente, haz commit:

   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push origin main
   ```

   - Esto activará el despliegue automático en Vercel y Render

3. **Verificación del despliegue**:
   - Verifica el estado del despliegue en los dashboards de Vercel y Render
   - Prueba la aplicación en producción visitando las URLs proporcionadas

#### Depuración y Monitorización

1. **Logs en tiempo real**:

   - **Vercel**: Dashboard → Proyecto → Deployments → Selecciona el despliegue → Logs
   - **Render**: Dashboard → Selecciona el servicio → Logs
   - Estos logs son cruciales para detectar problemas en producción

2. **Solución de problemas**:

   - Si detectas errores en producción que no ocurren localmente:
     - Verifica las variables de entorno en Vercel/Render
     - Consulta los logs para errores específicos
     - Considera las diferencias entre entornos (Node.js version, etc.)

3. **Versiones y rollback**:
   - **Vercel**: Permite ver todas las versiones desplegadas y hacer rollback fácilmente
   - **Render**: También permite volver a versiones anteriores

#### Pruebas en Diferentes Entornos

Para mantener un flujo de trabajo profesional, puedes configurar tres entornos:

1. **Desarrollo** (local en Cursor)
2. **Staging** (rama `develop` en Vercel/Render para pruebas previas)
3. **Producción** (rama `main` en Vercel/Render)

Esto permite probar cambios en un entorno similar a producción antes de afectar a usuarios reales.

### Limitaciones de Servicios en Planes Gratuitos

Es importante conocer las limitaciones de los planes gratuitos para evitar sorpresas durante el desarrollo y despliegue de tu aplicación.

#### Limitaciones de Vercel (Plan Hobby/Gratuito)

El plan gratuito de Vercel ofrece una experiencia bastante generosa, pero incluye estas limitaciones:

1. **Despliegues y Builds**:

   - **Límite de 100 despliegues por día** por cuenta (no por proyecto)
   - **Tiempo máximo de build: 45 minutos**
   - **Tiempo máximo de ejecución de funciones serverless: 10 segundos**

2. **Almacenamiento y Ancho de Banda**:

   - **Almacenamiento total: 15GB** (compartido entre todos tus proyectos)
   - **Ancho de banda: 100GB/mes**

3. **Rendimiento**:

   - **Regiones de despliegue limitadas** (no puedes elegir regiones específicas)
   - Sin SLA de disponibilidad garantizada
   - No hay opciones de escalado automático

4. **Colaboración**:

   - **Máximo de 3 miembros** por equipo en plan gratuito

5. **Dominios**:
   - Subdominio gratuito `.vercel.app`
   - Puedes añadir dominios personalizados ilimitados

#### Limitaciones de Render (Plan Free)

1. **Disponibilidad**:

   - **Hibernación después de 15 minutos de inactividad** para Web Services
   - El primer request después de hibernación puede tardar ~30 segundos en responder

2. **Recursos**:

   - **RAM: 512MB**
   - **CPU: Compartida**
   - **Tiempo de ejecución: Limitado** (no especificado exactamente)

3. **Builds**:

   - **400 horas de build por mes**
   - **Tiempo máximo por build: 30 minutos**

4. **Bases de Datos PostgreSQL**:
   - **Almacenamiento: 1GB**
   - Sin backups automáticos
   - Sin alta disponibilidad

#### Limitaciones de Neon (Plan Free)

1. **Almacenamiento**:

   - **10GB de datos**
   - **3GB de almacenamiento lógico**

2. **Computación**:

   - **Tiempo de CPU: Limitado** (mode "serverless" con auto-scaling)
   - **Conexiones concurrentes: Hasta 15**

3. **Proyectos**:

   - Proyectos ilimitados
   - Sin restricción en ramas de base de datos

4. **Inactividad**:
   - La instancia se suspende después de períodos de inactividad
   - No hay garantía de disponibilidad 24/7

#### Estrategias para Trabajar con Estas Limitaciones

1. **Evitar la hibernación** en Render:

   - Utiliza servicios de monitorización como UptimeRobot para hacer ping a tu aplicación
   - Implementa un cron job para mantener el servicio activo

2. **Optimizar builds** en Vercel:

   - Usa caché eficientemente para reducir tiempos de build
   - Limita los despliegues innecesarios (no hagas push de cada pequeño cambio)

3. **Gestionar base de datos** con Neon:

   - Implementa lógica de limpieza de datos para mantener el tamaño bajo control
   - Utiliza eficientemente las conexiones a la base de datos

4. **Plan de escalado**:
   - Ten un plan claro para migrar a planes pagos cuando tu aplicación crezca
   - Monitoriza el uso para anticipar cuándo necesitarás escalar
