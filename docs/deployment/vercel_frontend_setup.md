# Despliegue del Frontend en Vercel

Esta guía te ayudará a desplegar el frontend de la aplicación en Vercel, una plataforma optimizada para aplicaciones Next.js.

## Paso 1: Crear una cuenta en Vercel

1. Ve a [Vercel](https://vercel.com/signup) y regístrate
2. Recomendamos registrarte con GitHub para facilitar la integración

## Paso 2: Importar proyecto

1. Una vez dentro del dashboard, haz clic en "Add New..." > "Project"
2. Selecciona el repositorio de GitHub donde se encuentra tu proyecto
3. Si no ves tu repositorio, puede que necesites configurar el acceso de Vercel a tu cuenta de GitHub

## Paso 3: Configurar el proyecto

Completa el formulario con la siguiente información:

1. **Framework Preset**: Selecciona "Next.js"
2. **Root Directory**: Si tu frontend está en una subcarpeta, especifícala (ej. `frontend`)
3. **Build Command**: Deja el valor predeterminado (`next build`) o personalízalo si es necesario
4. **Install Command**: Deja el valor predeterminado (`npm install`) o personalízalo si es necesario
5. **Output Directory**: Deja el valor predeterminado (`.next`) o personalízalo si es necesario

## Paso 4: Configurar variables de entorno

Añade las variables de entorno necesarias para tu frontend:

1. Expande la sección "Environment Variables"
2. Añade la siguiente variable esencial:
   - `NEXT_PUBLIC_API_URL`: URL completa de tu backend (ej. `https://coopco-backend.onrender.com/api`)
3. También puedes añadir otras variables específicas para tu aplicación:
   - `NEXT_PUBLIC_APP_ENV`: `production`
   - `NEXT_PUBLIC_SITE_URL`: URL de tu frontend (se completará automáticamente)

## Paso 5: Desplegar

1. Haz clic en "Deploy"
2. Vercel comenzará el proceso de construcción y despliegue
3. Espera a que termine el proceso (suele ser rápido, entre 1-3 minutos)

## Paso 6: Configurar dominio personalizado (opcional)

1. Una vez desplegado, ve a la pestaña "Domains"
2. Haz clic en "Add" para añadir un dominio personalizado
3. Sigue las instrucciones para configurar los registros DNS

## Configuraciones adicionales recomendadas

### Despliegue continuo

Por defecto, Vercel desplegará automáticamente cada vez que se haga push a la rama principal:

1. Ve a "Settings" > "Git"
2. En "Production Branch", confirma que está seleccionada tu rama principal (generalmente `main` o `master`)
3. Puedes configurar despliegues de vista previa para pull requests en la sección "Preview Branches"

### Monitoreo y análisis

1. En la pestaña "Analytics", puedes habilitar Analytics para monitorizar:
   - Rendimiento de la aplicación
   - Rutas más visitadas
   - Métricas de Core Web Vitals
   - Experiencia del usuario

### Optimización de rendimiento

1. Vercel optimiza automáticamente imágenes y assets
2. Puedes configurar opciones adicionales en "Settings" > "Functions" para ajustar el rendimiento

## Limitaciones del plan gratuito

- Despliegues limitados por mes
- Sin dominios personalizados verificados por SSL para cuentas hobby
- Métricas de analítica básicas
- Restricciones en el número de proyectos

## Solución de problemas comunes

### Error de construcción

1. Revisa los logs de construcción para identificar el error
2. Asegúrate de que tu aplicación se construye correctamente en local
3. Verifica que las variables de entorno estén correctamente configuradas

### Problemas de CORS

1. Asegúrate de que `NEXT_PUBLIC_API_URL` apunta a la URL correcta del backend
2. Verifica que tu backend tiene configuradas correctamente las cabeceras CORS

### Rutas de API no funcionan

1. Si usas las API routes de Next.js, asegúrate de que están en la carpeta correcta
2. Verifica que las rutas de API están correctamente configuradas 