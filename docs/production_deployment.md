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

### Gestión de Documentos
- ✅ UI de gestión de documentos implementada
- 🔴 **Modificación urgente**: Ajustar endpoints de subida de documentos
  - En `backend/middleware/uploadMiddleware.js`: Modificar configuración de Multer para procesar campos de formulario junto con archivos
  - O implementar el enfoque de dos pasos (crear registro + subir archivo)
- 🔄 Implementar limitación de tamaño de archivos en producción
- 🔄 Configurar sistema de almacenamiento persistente

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

---

**Nota**: Este documento se actualizará a medida que se implementen nuevas funcionalidades o se identifiquen requisitos adicionales para el despliegue en producción.

**Última actualización**: Mayo 2025 