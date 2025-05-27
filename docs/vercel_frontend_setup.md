# Despliegue del Frontend en Vercel

Esta guía te ayudará a desplegar el frontend de la aplicación en Vercel, una plataforma de hosting especializada en aplicaciones Next.js.

## Paso 1: Crear una cuenta en Vercel

1. Ve a [Vercel](https://vercel.com/signup) y regístrate
2. Es recomendable usar la misma cuenta de GitHub/GitLab que usas para el repositorio

## Paso 2: Importar proyecto

1. En el dashboard de Vercel, haz clic en "Add New..." > "Project"
2. Selecciona el repositorio de tu proyecto
3. Vercel detectará automáticamente que es un proyecto Next.js

## Paso 3: Configurar el proyecto

1. **Framework Preset**: Vercel debería detectar automáticamente Next.js
2. **Root Directory**: Configura como `frontend` si tu proyecto está en esa carpeta
3. **Build Command**: `npm run build` (o personalízalo si es necesario)
4. **Output Directory**: `.next` (Next.js por defecto)

## Paso 4: Configurar variables de entorno

1. Expande la sección "Environment Variables"
2. Añade las variables necesarias:
   - `NEXT_PUBLIC_BACKEND_URL` (URL del backend en Render)
   - `NEXT_PUBLIC_API_URL` (URL del backend en Render + `/api`)
   - `NODE_ENV=production`

## Paso 5: Desplegar

1. Haz clic en "Deploy"
2. Vercel comenzará a construir y desplegar tu aplicación
3. Espera a que el proceso termine (generalmente toma 1-2 minutos)

## Paso 6: Configurar dominio personalizado (opcional)

1. Una vez desplegado, ve a la pestaña "Domains"
2. Puedes usar el dominio proporcionado por Vercel o configurar tu propio dominio

## Paso 7: Verificar la integración con el backend

1. Visita tu aplicación en la URL proporcionada por Vercel
2. Verifica que todas las interacciones con el backend funcionen correctamente
3. Comprueba que las variables de entorno estén configuradas correctamente

## Limitaciones del plan gratuito de Vercel

- **Ancho de banda**: 100GB por mes
- **Serverless Function Execution**: 100 horas por mes
- **Builds**: 6,000 minutos por mes
- **Dominios**: Subdominios gratuitos `.vercel.app` o dominio personalizado

## Optimizaciones para mejorar el rendimiento

1. **Optimización de imágenes**: Usa el componente `next/image` para optimización automática
2. **Precarga de datos**: Utiliza `getStaticProps` o `getServerSideProps` según necesites
3. **Estrategias de caché**: Configura las cabeceras adecuadas para recursos estáticos

## Monitorización

1. **Analytics**: En el dashboard de Vercel, ve a la pestaña "Analytics"
2. **Logs**: Revisa los logs de construcción y despliegue
3. **Rendimiento**: Verifica las métricas Core Web Vitals en la pestaña "Speed Insights"

> **Nota**: Para actualizar tu aplicación, simplemente haz push a la rama principal de tu repositorio. Vercel detectará los cambios y desplegará automáticamente. 