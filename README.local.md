# Flujo de Trabajo COOPCO - Local y Nube

Este documento describe el flujo de trabajo para desarrollar y desplegar la aplicación COOPCO, trabajando entre el entorno local (usando Cursor) y los servicios en la nube (Vercel, Render y Neon).

## Entornos

El proyecto utiliza tres entornos:

1. **Desarrollo Local**: Tu máquina, usando Cursor como IDE
2. **Staging**: Rama `develop` en Vercel/Render (para pruebas previas)
3. **Producción**: Rama `main` en Vercel/Render

## Desarrollo Local

### Requisitos Previos

- Node.js 16+ instalado
- Git configurado
- Acceso a los repositorios y plataformas

### Iniciar el Entorno de Desarrollo

```bash
# Opción 1: Usar el script de ayuda
./deploy.sh
# Seleccionar opción 1

# Opción 2: Iniciar manualmente
npm run dev:all
```

### Flujo de Cambios

1. **Crea una rama para tu feature**:

   ```bash
   git checkout -b feature/nombre-descriptivo
   ```

2. **Desarrolla y prueba localmente**:

   - Edita el código en Cursor
   - Usa el entorno de desarrollo local para probar
   - Asegúrate de que pasa lint y pruebas

3. **Commit de cambios**:

   ```bash
   # Opción 1: Usar el script de ayuda
   ./deploy.sh
   # Seleccionar opción 3

   # Opción 2: Comandos manuales
   git add .
   git commit -m "Descripción clara del cambio"
   git push origin feature/nombre-descriptivo
   ```

4. **Crear Pull Request**:
   - Abre un PR de tu rama a `develop` (staging)
   - Una vez aprobado y probado, haz merge a `main` (producción)

## Despliegue y Monitorización

### Verificar Estado de Despliegue

```bash
# Abrir dashboards usando el script
./deploy.sh
# Seleccionar opción 4 (Vercel) o 5 (Render)
```

### URLs de Entornos

- **Local**:

  - Frontend: http://localhost:3000
  - Backend: http://localhost:5000

- **Producción**:
  - Frontend: https://finalproject-lps-eight.vercel.app/
  - Backend: https://finalproject-lps.onrender.com

### Monitorización

- **Logs de Vercel**: Dashboard → Proyecto → Deployments → Logs
- **Logs de Render**: Dashboard → Web Service → Logs
- **Base de Datos**: Panel de control de Neon

## Comandos Útiles

```bash
# Ejecutar solo el backend
npm run dev

# Ejecutar solo el frontend
npm run dev:client

# Ejecutar linting
npm run lint

# Corregir problemas de linting automáticamente
npm run lint:fix

# Gestionar migraciones de base de datos
npm run prisma:migrate   # Ejecutar migraciones pendientes
npm run prisma:generate  # Actualizar cliente Prisma
npm run prisma:studio    # Abrir interfaz para gestionar datos
```

## Solución de Problemas Comunes

1. **Error "Module not found" en Vercel**:

   - Asegúrate de instalar las dependencias tanto en el proyecto principal como en `/client`
   - Verifica que las importaciones sean correctas según el entorno

2. **Problemas con variables de entorno**:

   - Verifica que estén correctamente configuradas en Vercel y Render
   - Las variables en `.env.local` son solo para desarrollo local

3. **Render hibernado (servicio inactivo)**:

   - Normal en el plan gratuito después de 15 minutos sin tráfico
   - La primera petición reactivará el servicio (tarda ~30 segundos)

4. **Límites de despliegues en Vercel**:
   - Plan gratuito: 100 despliegues por día
   - Evita demasiados pushes pequeños, agrupa cambios relacionados
