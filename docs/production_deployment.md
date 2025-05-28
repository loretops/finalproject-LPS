# Guía de Despliegue en Producción

Este documento detalla todos los requisitos, configuraciones y pasos necesarios para desplegar COOPCO en un entorno de producción. Se mantendrá actualizado a medida que avance el desarrollo.

## Índice

1. [Requisitos del Sistema](#requisitos-del-sistema)
2. [Configuración de Entorno](#configuración-de-entorno)
3. [Preparación de la Base de Datos](#preparación-de-la-base-de-datos)
4. [Ajustes Pendientes por Componente](#ajustes-pendientes-por-componente)
5. [Consideraciones de Seguridad](#consideraciones-de-seguridad)
6. [Proceso de Despliegue](#proceso-de-despliegue)
7. [Escalabilidad y Mantenimiento](#escalabilidad-y-mantenimiento)
8. [Análisis de Opciones de Despliegue para el MVP](#análisis-de-opciones-de-despliegue-para-el-mvp)

## Requisitos del Sistema

### Hardware Recomendado
- **Servidor Web/API**: 
  - CPU: 2+ núcleos
  - RAM: 4GB mínimo
  - Almacenamiento: 20GB SSD mínimo (escalable según necesidades de documentos)

### Software Necesario
- **Servidor**: Ubuntu Server 20.04 LTS o posterior
- **Node.js**: v16.x o posterior
- **Base de Datos**: PostgreSQL 13 o posterior
- **Servidor Web**: Nginx (como proxy inverso)
- **Gestor de Procesos**: PM2

### Dominios y Certificados
- Dominio principal para la aplicación web
- Subdominio para la API (opcional, puede ser ruta en dominio principal)
- Certificados SSL/TLS (Let's Encrypt recomendado)

## Configuración de Entorno

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# Servidor
NODE_ENV=production
PORT=8001
FRONTEND_URL=https://[dominio-produccion]

# Base de Datos
DATABASE_URL=postgresql://[usuario]:[contraseña]@[host]:[puerto]/[base-datos]

# JWT
JWT_SECRET=[clave-secreta-generar-aleatoria]
JWT_EXPIRATION=7d

# Email
SMTP_HOST=[servidor-smtp]
SMTP_PORT=[puerto-smtp]
SMTP_USER=[usuario-smtp]
SMTP_PASS=[contraseña-smtp]
EMAIL_FROM=noreply@[dominio]

# Almacenamiento
STORAGE_STRATEGY=local  # o "s3" si se usa AWS S3
STORAGE_PATH=/ruta/absoluta/al/almacenamiento
# Si se usa S3
# AWS_BUCKET_NAME=[nombre-bucket]
# AWS_REGION=[region-aws]
# AWS_ACCESS_KEY_ID=[access-key]
# AWS_SECRET_ACCESS_KEY=[secret-key]
```

### Configuración de Nginx

Archivo de configuración básico para Nginx:

```nginx
server {
    listen 80;
    server_name [dominio-produccion];
    
    # Redireccionar a HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name [dominio-produccion];
    
    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/[dominio-produccion]/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/[dominio-produccion]/privkey.pem;
    
    # Frontend
    location / {
        root /ruta/a/frontend/build;
        try_files $uri $uri/ /index.html;
        
        # Caché para recursos estáticos
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 30d;
            add_header Cache-Control "public, no-transform";
        }
    }
    
    # API Backend
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Archivos subidos (acceso directo)
    location /uploads {
        alias /ruta/absoluta/al/almacenamiento;
        expires 1d;
        add_header Cache-Control "public, no-transform";
    }
}
```

## Preparación de la Base de Datos

### Pasos para inicializar la base de datos
1. Crear base de datos PostgreSQL con cotejamiento UTF-8
2. Ejecutar migraciones de Prisma:
   ```
   npx prisma migrate deploy
   ```
3. Aplicar seeders para datos iniciales:
   ```
   npx prisma db seed
   ```

### Respaldo y Restauración
- Configurar respaldos diarios automatizados
- Almacenar histórico de respaldos por al menos 30 días

## Ajustes Pendientes por Componente

### Sistema de Autenticación
- ✅ Login y JWT funcionando correctamente
- ✅ Manejo de roles implementado
- 🔄 Añadir protección CSRF en formularios (pendiente)
- 🔄 Implementar rate limiting en endpoints de autenticación (pendiente)

### Gestión de Invitaciones
- ✅ Sistema de invitaciones funcionando
- ✅ Envío de emails configurado
- 🔄 Configurar dominio de envío para SPF y DKIM en producción (pendiente)

### Gestión de Proyectos
- ✅ CRUD de proyectos completo
- ✅ UI de administración implementada
- ✅ Sistema de publicación implementado
- 🔴 **Importante**: Reactivar validación de documentos legales antes de producción
  - En `backend/application/services/projectService.js`: Descomentar la sección que verifica la existencia de documentos legales
  - Esta validación se ha desactivado temporalmente para desarrollo, pero es crítica en producción

### Gestión de Documentos
- ✅ UI de gestión de documentos implementada
- 🔴 **Modificación urgente**: Ajustar endpoints de subida de documentos
  - En `backend/middleware/uploadMiddleware.js`: Modificar configuración de Multer para procesar campos de formulario junto con archivos
  - O implementar el enfoque de dos pasos (crear registro + subir archivo)
- 🔄 Implementar limitación de tamaño de archivos en producción
- 🔄 Configurar sistema de almacenamiento persistente

### Sistema de Intereses
- 🔄 **Nuevo módulo**: Configurar correctamente el almacenamiento de intereses de usuarios
  - Asegurar la ejecución de migraciones para el modelo `Interest`
  - Verificar índices para consultas eficientes
  - Establecer política de retención de datos para intereses antiguos
- 🔄 Configurar sistema de notificaciones para gestores
  - Implementar sistema de notificaciones en tiempo real (opcional)
  - Configurar envío de emails para notificaciones de nuevos intereses
- 🔄 Considerar límites de ratio para prevenir abuso (máximo de intereses por usuario/día)

### Sistema de Inversiones
- 🔄 **Nuevo módulo**: Configurar correctamente la infraestructura para inversiones
  - Asegurar la ejecución de migraciones para el modelo `Investment`
  - Configurar la actualización transaccional del campo `current_amount` en proyectos
  - Implementar mecanismos de auditoría para cambios en inversiones (historial)
- 🔄 Consideraciones de seguridad específicas:
  - Implementar verificación adicional para confirmación de inversiones
  - Considerar autenticación de dos factores para montos elevados
  - Establecer límites de inversión por periodo según políticas del club
- 🔄 Configurar notificaciones para inversiones:
  - Notificaciones por email para todas las acciones relacionadas con inversiones
  - Alertas para gestores sobre nuevas inversiones o cambios de estado
  - Resúmenes periódicos de estado de inversiones para socios
- 🔄 Configuración del dashboard:
  - Optimizar consultas para estadísticas de inversión (considerar vistas en la BD)
  - Configurar caching para datos frecuentemente consultados
  - Implementar permisos granulares para acceso según rol
- 🔄 **Gestión de transacciones**: Implementar sistema robusto de gestión transaccional
  - Asegurar atomicidad de operaciones de inversión (registro + actualización de montos)
  - Implementar bloqueo optimista para evitar condiciones de carrera
  - Configurar logs detallados para auditoría financiera
  - Considerar implementar sistema de colas para operaciones asíncronas en caso de alto volumen

### Frontend General
- ✅ Rutas protegidas implementadas
- ✅ Componentes de UI desarrollados
- 🔄 Optimizar bundle para producción (pendiente)
- 🔄 Implementar Service Worker para caché y PWA (opcional, pendiente)

## Consideraciones de Seguridad

### Configuraciones Requeridas
- Establecer encabezados de seguridad:
  - Content-Security-Policy
  - X-XSS-Protection
  - X-Frame-Options
  - X-Content-Type-Options
- Configurar CORS adecuadamente:
  - Restringir orígenes permitidos al dominio de producción
  - Limitar métodos y encabezados permitidos
  - **Importante**: En el backend, configurar las variables de entorno `FRONTEND_URL` y `CORS_ORIGIN` con el dominio exacto del frontend (ej. `https://coopco.vercel.app`)
  - Verificar que la cabecera 'Access-Control-Allow-Origin' se establezca correctamente para permitir peticiones desde el frontend

### Protección de Datos
- Bloquear acceso directo a `.env` y otros archivos sensibles
- Sanitizar todas las entradas de usuario
- Validar y limitar tamaño de subidas de archivos

### Auditoría
- Implementar registro de actividad para acciones críticas
- Configurar monitorización para detección de actividad sospechosa

## Proceso de Despliegue

### Pasos para el Primer Despliegue
1. Configurar servidor y software requerido
2. Clonar repositorio:
   ```
   git clone [url-repositorio] /ruta/a/app
   ```
3. Instalar dependencias:
   ```
   cd /ruta/a/app
   npm install --production
   ```
4. Configurar archivo `.env` (según sección anterior)
5. Generar build de producción del frontend:
   ```
   cd frontend
   npm run build
   ```
6. Configurar Nginx (según configuración anterior)
7. Iniciar la aplicación con PM2:
   ```
   pm2 start ecosystem.config.js --env production
   ```
8. Configurar inicio automático de PM2:
   ```
   pm2 startup
   pm2 save
   ```

### Actualizaciones
1. Detener servicio:
   ```
   pm2 stop ecosystem.config.js
   ```
2. Actualizar código:
   ```
   git pull
   ```
3. Actualizar dependencias:
   ```
   npm install --production
   ```
4. Aplicar migraciones si hay cambios:
   ```
   npx prisma migrate deploy
   ```
5. Reconstruir frontend:
   ```
   cd frontend
   npm run build
   ```
6. Reiniciar servicio:
   ```
   pm2 restart ecosystem.config.js
   ```

## Escalabilidad y Mantenimiento

### Monitorización
- Configurar monitorización de recursos con PM2
- Implementar alertas para:
  - Uso alto de CPU/RAM
  - Errores del servidor
  - Tiempos de respuesta prolongados

### Escalado
- Estrategias para escalar horizontalmente:
  - Separar frontend y backend en servidores distintos
  - Configurar balanceador de carga para múltiples instancias
  - Migrar almacenamiento a solución distribuida (S3, MinIO)

### Respaldo
- Configurar copias de seguridad automáticas
- Mantener copias en ubicaciones off-site
- Probar procedimientos de restauración regularmente

## Análisis de Opciones de Despliegue para el MVP

A continuación se presenta un análisis comparativo de las dos opciones principales para el despliegue del MVP de COOPCO.

### Opción 1: Entorno Temporal de Prueba en Servicios Gratuitos

#### Infraestructura Propuesta
- **Frontend**: Vercel (Plan gratuito)
- **Backend**: Render (Plan gratuito) o Railway (Plan gratuito)
- **Base de Datos**: Supabase (Plan gratuito, 500MB) o Railway PostgreSQL (Plan gratuito)
- **Email**: Resend.com o Mailtrap (Plan gratuito para testing)
- **Almacenamiento**: Cloudinary (Plan gratuito, 25GB/mes)
- **Monitorización**: Sentry (Plan gratuito)

#### Ventajas
1. **Coste inicial cero**: Ideal para validar el producto sin inversión inicial
2. **Rápido despliegue**: Configuración automatizada en minutos
3. **Integración CI/CD**: La mayoría ofrece integración con GitHub
4. **Dominios temporales**: Proporcionan subdominios gratuitos para testing
5. **Facilidad de uso**: Interfaces sencillas y documentación extensa

#### Desventajas
1. **Limitaciones de uso**: Los planes gratuitos tienen restricciones (ej. Render apaga el servicio tras 15 min de inactividad)
2. **Sin SLA**: Sin garantías de disponibilidad o rendimiento
3. **Funcionalidades restringidas**: Algunos servicios limitan características en planes gratuitos
4. **Datos temporales**: Algunos proveedores eliminan datos periódicamente
5. **Migración posterior necesaria**: Requiere migración a entorno definitivo cuando se valide el MVP

#### Estimación de Tiempo de Despliegue
- Configuración inicial: 1-2 días
- Integración completa: 3-5 días

### Opción 2: Entorno Privado Definitivo con Escalabilidad

#### Infraestructura Propuesta

**Enfoque de Nube Gestionada**:
- **Proveedor principal**: DigitalOcean
- **Infraestructura**:
  - 2 Droplets (2vCPU/4GB RAM cada uno): ~$24/mes cada uno
    - Droplet 1: Frontend Next.js + Nginx
    - Droplet 2: Backend Node.js/Express + PM2
  - Base de datos PostgreSQL gestionada (2vCPU/4GB): ~$60/mes
  - Spaces (S3-compatible) para almacenamiento: ~$5/mes
  - Balanceador de carga: ~$12/mes
  - Total estimado: ~$125/mes

**Alternativa con Servicios Gestionados**:
- **Frontend**: Vercel (Plan Pro): ~$20/mes
- **Backend**: DigitalOcean App Platform (2 instancias Basic): ~$24/mes
- **Base de datos**: DigitalOcean Managed PostgreSQL (1GB): ~$15/mes
- **Almacenamiento**: Cloudinary (Advanced plan): ~$89/mes
- **Email**: SendGrid (Essential): ~$14.95/mes
- **Monitorización**: New Relic (Free tier para comenzar)
- **Total estimado**: ~$164/mes

#### Ventajas
1. **Control total**: Flexibilidad completa sobre la infraestructura
2. **Rendimiento predecible**: Recursos dedicados y consistentes
3. **Escalabilidad planificada**: Capacidad de crecimiento según necesidades
4. **Seguridad mejorada**: Posibilidad de implementar redes privadas, VPCs, firewalls
5. **Backups y redundancia**: Configuración de copias de seguridad y alta disponibilidad
6. **SLAs garantizados**: Acuerdos de nivel de servicio con el proveedor

#### Desventajas
1. **Coste inicial mayor**: Inversión mensual recurrente desde el principio
2. **Complejidad de gestión**: Requiere conocimientos de DevOps
3. **Tiempo de configuración**: Mayor esfuerzo inicial para configurar correctamente
4. **Mantenimiento continuo**: Necesidad de actualizar y mantener servidores
5. **Sobreprovisionamiento**: Riesgo de contratar más recursos de los necesarios inicialmente

#### Estimación de Tiempo de Despliegue
- Configuración inicial: 3-5 días
- Implementación completa con seguridad y monitorización: 7-10 días

### Análisis Comparativo para Necesidades Específicas

| Criterio | Opción 1 (Servicios Gratuitos) | Opción 2 (Entorno Definitivo) |
|----------|--------------------------------|-------------------------------|
| **Coste inicial** | ⭐⭐⭐⭐⭐ (Gratuito) | ⭐⭐ (>$100/mes) |
| **Rendimiento** | ⭐⭐ (Limitado) | ⭐⭐⭐⭐ (Predecible) |
| **Escalabilidad** | ⭐⭐ (Limitada) | ⭐⭐⭐⭐⭐ (Planificada) |
| **Seguridad** | ⭐⭐ (Básica) | ⭐⭐⭐⭐ (Personalizable) |
| **Fiabilidad** | ⭐⭐ (Sin SLA) | ⭐⭐⭐⭐ (Con SLA) |
| **Tiempo configuración** | ⭐⭐⭐⭐ (Rápido) | ⭐⭐ (Mayor esfuerzo) |
| **Mantenimiento** | ⭐⭐⭐⭐ (Gestionado) | ⭐⭐ (Manual) |

### Recomendación

Para el despliegue del MVP de COOPCO, se recomienda un **enfoque híbrido en dos fases**:

#### Fase 1: Validación Inicial (1-2 meses)
Utilizar la **Opción 1** con servicios gratuitos para validar rápidamente el MVP con usuarios reales, minimizando costes iniciales mientras se confirma la viabilidad del producto. Solución recomendada:

- **Frontend**: Vercel (Plan Hobby)
- **Backend**: Render (Plan gratuito)
- **Base de Datos**: Supabase (Plan gratuito)
- **Almacenamiento**: Cloudinary (Plan gratuito)
- **Email**: Resend (Plan gratuito)

#### Fase 2: Implementación Definitiva (Tras validación)
Migrar a la **Opción 2** una vez validado el concepto, implementando una versión optimizada en costes de la arquitectura definitiva:

**Solución Óptima Inicial**:
- **Frontend**: Vercel (Plan Pro básico): ~$20/mes
- **Backend**: DigitalOcean Droplet (1GB): ~$6/mes con PM2
- **Base de Datos**: DigitalOcean DB (1GB): ~$15/mes
- **Almacenamiento**: Combinación Cloudinary (Plan básico) + DO Spaces: ~$20/mes
- **Email**: Resend o SendGrid (Plan básico): ~$15/mes
- **Total estimado**: ~$76/mes

Esta solución proporciona un buen equilibrio entre coste y control, con capacidad de escalar cada componente individualmente a medida que crezca la demanda.

### Consideraciones Adicionales de Seguridad para Ambas Opciones

1. **Implementar HTTPS obligatorio** en todos los endpoints
2. **Configurar rate limiting** para prevenir ataques de fuerza bruta
3. **Proteger endpoints de autenticación** con medidas anti-automatización
4. **Implementar WAF (Web Application Firewall)** en la solución definitiva
5. **Configurar monitorización y alertas** para detectar actividades sospechosas
6. **Establecer políticas de backup** con retención de 30 días mínimo
7. **Implementar registro y auditoría** de todas las operaciones críticas
8. **Configurar encabezados de seguridad HTTP** (CSP, X-Frame-Options, etc.)

Independientemente de la opción elegida, es crucial seguir las recomendaciones de seguridad detalladas en la sección de [Consideraciones de Seguridad](#consideraciones-de-seguridad) de este documento.

---

**Nota:** Este análisis se ha realizado con precios y características disponibles a mayo de 2024. Los proveedores pueden cambiar sus ofertas, por lo que se recomienda verificar la información actualizada antes de tomar decisiones finales.

**Última actualización**: Mayo 2024 