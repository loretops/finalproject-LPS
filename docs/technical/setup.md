# Guía de Configuración del Entorno de Desarrollo

Esta guía te ayudará a configurar correctamente el entorno de desarrollo para el proyecto COOPCO.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v18 o superior)
- npm (v9 o superior)
- Git
- PostgreSQL (v14 o superior)

## Instalación Paso a Paso

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd finalproject-LPS
```

### 2. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto. Puedes consultar [nuestra guía de variables de entorno](env-example.md) para obtener un ejemplo detallado:

```bash
# Copia el ejemplo o crea un archivo .env nuevo
touch .env
```

Asegúrate de incluir como mínimo:

```
# Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/coopco"

# Puertos para la aplicación
FRONTEND_PORT=3001
BACKEND_PORT=8001

# Secreto para JWT
JWT_SECRET=tu_clave_secreta_para_jwt

# Configuración de la aplicación
NODE_ENV=development

# Servicios externos (si es necesario)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Correo (opcional para desarrollo)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=tu_email
EMAIL_PASSWORD=tu_password
```

### 3. Instalación de Dependencias

Instala las dependencias del proyecto:

```bash
# Instalar dependencias principales
npm install

# O si prefieres instalar por separado frontend y backend
cd frontend && npm install
cd ../backend && npm install

# Instalar cross-port-killer para gestionar puertos
npm install --save-dev cross-port-killer
```

### 4. Configuración de la Base de Datos

#### 4.1. Iniciar PostgreSQL

Asegúrate de que PostgreSQL está en ejecución:

```bash
# En macOS
brew services start postgresql

# En Linux (Ubuntu/Debian)
sudo service postgresql start
```

#### 4.2. Crear la Base de Datos

```bash
# Acceder a PostgreSQL
psql -U postgres

# Dentro de psql, crear la base de datos
CREATE DATABASE coopco;
CREATE USER coopco_user WITH ENCRYPTED PASSWORD 'tu_contraseña';
GRANT ALL PRIVILEGES ON DATABASE coopco TO coopco_user;
\q
```

#### Configuración de permisos para Prisma Migrate

Para que Prisma Migrate funcione correctamente, el usuario de la base de datos necesita permisos adicionales. Ejecuta estos comandos si encuentras errores al ejecutar migraciones:

```bash
# Dar permisos para crear bases de datos (necesario para la base de datos "shadow" de Prisma)
psql -U postgres -c "ALTER USER coopco_user CREATEDB;"

# Si encuentras errores de permiso en el schema public
psql -U postgres -c "GRANT ALL ON SCHEMA public TO coopco_user;"

# Si los problemas persisten, puedes otorgar permisos de superusuario (solo para desarrollo)
psql -U postgres -c "ALTER ROLE coopco_user WITH SUPERUSER;"
```

> ⚠️ **Advertencia:** Otorgar permisos de superusuario no es recomendable en entornos de producción. Para producción, concede solo los permisos mínimos necesarios.

#### 4.3. Ejecutar Migraciones con Prisma

```bash
# Generar el cliente Prisma
npx prisma generate --schema=./backend/prisma/schema.prisma

# Ejecutar migraciones
npx prisma migrate dev --schema=./backend/prisma/schema.prisma
```

### 5. Iniciar Servidores en Modo Desarrollo

Hemos configurado los puertos en el archivo `.env` para evitar conflictos. Los scripts de inicio utilizarán estos puertos:

```bash
# Iniciar frontend y backend con gestión automática de puertos
npm run dev
```

Añade estos scripts a tu `package.json`:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cross-port-killer -p $FRONTEND_PORT && cd frontend && next dev -p $FRONTEND_PORT",
    "dev:backend": "cross-port-killer -p $BACKEND_PORT && cd backend && nodemon server.js"
  }
}
```

Esto garantiza que:
1. Se liberan los puertos antes de iniciar los servidores
2. Se utilizan los puertos definidos en el .env
3. Se pueden ejecutar ambos servidores con un solo comando

### 6. Testing Inicial

Para verificar que todo funciona correctamente:

```bash
# Ejecutar tests unitarios
npm run test:unit

# Ejecutar tests de integración (opcional)
npm run test:integration
```

## 🚀 Solución al Problema de Puertos en Uso

Para evitar el problema común de "puerto ya en uso", hemos implementado las siguientes soluciones:

### Configuración de package.json

Hemos modificado los scripts en `package.json` para usar el gestor de puertos `cross-port-killer`:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cross-port-killer -p $FRONTEND_PORT && cd frontend && next dev -p $FRONTEND_PORT",
    "dev:backend": "cross-port-killer -p $BACKEND_PORT && cd backend && nodemon server.js"
  }
}
```

### Instalación de la dependencia

```bash
npm install --save-dev cross-port-killer
```

### ¿Por qué esto funciona?

- `cross-port-killer` detecta y cierra automáticamente cualquier proceso que esté usando el puerto especificado
- Es compatible con todos los sistemas operativos
- Evita tener que reiniciar manualmente el sistema o buscar y cerrar procesos

### Alternativa Manual

Si prefieres no usar `cross-port-killer`, puedes matar manualmente los procesos:

```bash
# En macOS/Linux
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9
lsof -i :8001 | grep LISTEN | awk '{print $2}' | xargs kill -9

# En Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

## 🔍 Verificación de la Instalación

Tu instalación está completa si:

1. ✅ El frontend está disponible en `http://localhost:3001`
2. ✅ El backend responde en `http://localhost:8001/api/health`
3. ✅ La base de datos está conectada correctamente
4. ✅ Los tests pasan sin errores

## 🛠️ Resolución de Problemas

### Error de conexión a la base de datos

- Verifica la URL de conexión en `.env`
- Asegúrate de que PostgreSQL está en ejecución
- Confirma que el usuario tiene permisos adecuados

### Problemas con PostgreSQL

Si encuentras el error `Input/output error` al iniciar PostgreSQL con `brew services start postgresql`, prueba estos pasos:

1. Intenta iniciarlo con permisos de administrador:
   ```bash
   sudo brew services start postgresql
   ```

2. Si el comando anterior funciona, ten en cuenta que esto cambia los permisos de algunos directorios a root:admin, lo que requerirá eliminación manual con sudo cuando actualices o desinstales PostgreSQL.

3. Para futuros inicios, considera reparar los permisos para poder iniciar PostgreSQL sin sudo:
   ```bash
   # Reiniciar PostgreSQL correctamente
   sudo brew services stop postgresql
   sudo chown -R $(whoami):admin /opt/homebrew/var/postgresql
   brew services start postgresql
   ```

### Problemas con Prisma Migrate

Si encuentras errores al ejecutar `prisma migrate dev`, asegúrate de que:

1. El usuario de PostgreSQL tiene permisos para crear bases de datos (necesario para la base de datos "shadow" que usa Prisma):
   ```bash
   psql -U postgres -c "ALTER USER tu_usuario CREATEDB;"
   ```

2. El usuario tiene permisos sobre el schema public:
   ```bash
   psql -U postgres -c "GRANT ALL ON SCHEMA public TO tu_usuario;"
   ```

3. Si los problemas persisten, solo para entornos de desarrollo, puedes otorgar permisos de superusuario:
   ```bash
   psql -U postgres -c "ALTER ROLE tu_usuario WITH SUPERUSER;"
   ```

### Problemas al iniciar el servidor

- Verifica que no hay otros procesos usando los mismos puertos
- Asegúrate de estar usando la versión correcta de Node.js
- Revisa los logs de error para obtener más detalles

### Errores de CORS en desarrollo

- Verifica la configuración de CORS en el backend
- Asegúrate de que las URLs de frontend y backend son correctas en `.env`

## ⚠️ Nota Importante

Este entorno está configurado para desarrollo. Para producción, se requerirían configuraciones adicionales de seguridad y rendimiento. 