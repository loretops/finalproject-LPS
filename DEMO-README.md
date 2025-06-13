# 🏢 COOPCO - Plataforma de Inversión Inmobiliaria

> **Demo Version** - Plataforma para gestión de proyectos de inversión inmobiliaria entre socios privados

## 🚀 Configuración Rápida para Demo

### 1. Configurar datos de demostración

```bash
# Ejecutar script de configuración automática
./scripts/demo-setup.sh
```

### 2. Iniciar servidores

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### 3. Acceder a la aplicación

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8001

## 👥 Usuarios de Demo

### 🔧 Manager (Gestor)
- **Email**: `manager@example.com`
- **Contraseña**: `password123`
- **Acceso a**: Dashboard, Gestión de proyectos, Inversiones, Invitaciones

### 👤 Socio
- **Email**: `partner@example.com`  
- **Contraseña**: `password123`
- **Acceso a**: Proyectos, Dashboard personal, Mis inversiones, Mis intereses

## 🏗️ Proyectos de Demo Incluidos

1. **Residencial Villa Exclusiva** - Madrid (€3.5M objetivo)
2. **Torre Oficinas Business Center** - Barcelona (€8.5M objetivo)
3. **Resort Marina Premium** - Valencia (€12M objetivo)
4. **Centro Logístico Inteligente** - Madrid (€6.8M objetivo)
5. **Apartamentos Exclusivos Marina** - Alicante (€4.2M objetivo)

## ✨ Funcionalidades Demostradas

### Para Managers
- ✅ Dashboard con estadísticas reales
- ✅ Gestión completa de proyectos
- ✅ Administración de inversiones
- ✅ Sistema de invitaciones
- ✅ Control de usuarios y roles

### Para Socios/Inversores
- ✅ Visualización de proyectos publicados
- ✅ Sistema de "Me Interesa"
- ✅ Inversiones en proyectos
- ✅ Dashboard personal
- ✅ Gestión de perfil

### Generales
- ✅ Autenticación y autorización por roles
- ✅ Interfaz responsive y moderna
- ✅ Navegación lógica por rol
- ✅ Gestión de notificaciones
- ✅ Sistema de verificación de email

## 🎯 Flujo de Demo Recomendado

### 1. Vista como Manager
1. Iniciar sesión como manager
2. Revisar dashboard con estadísticas reales
3. Navegar por gestión de proyectos
4. Revisar inversiones realizadas
5. Gestionar invitaciones

### 2. Vista como Socio
1. Cerrar sesión y entrar como socio
2. Explorar proyectos disponibles
3. Marcar interés en un proyecto
4. Realizar una inversión simulada
5. Revisar dashboard personal

### 3. Funcionalidades adicionales
- Navegación responsive (probar en móvil)
- Filtros y búsqueda de proyectos
- Gestión de perfil de usuario
- Sistema de notificaciones

## 🔧 Comandos Útiles

```bash
# Resetear datos de demo
./scripts/demo-setup.sh

# Ver logs del backend
cd backend && npm run dev

# Acceder a base de datos
cd backend && npx prisma studio

# Ejecutar tests
npm test
```

## 📊 Métricas del Proyecto

- **Frontend**: React + Next.js + Tailwind CSS
- **Backend**: Node.js + Express + Prisma
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT + Roles
- **Testing**: Jest + Cypress
- **Arquitectura**: Hexagonal + DDD

## 🎨 Diseño y UX

- ✅ Interfaz moderna y profesional
- ✅ Navegación intuitiva por roles
- ✅ Componentes reutilizables
- ✅ Estados de carga y error
- ✅ Responsive design
- ✅ Accesibilidad (ARIA)

## 🚧 Estado de Desarrollo

Este es un **MVP funcional** que demuestra:
- Arquitectura escalable y mantenible
- Funcionalidades core implementadas
- Interfaz profesional
- Datos reales en dashboard
- Sistema de roles completo

---

**Nota**: Esta es una versión de demostración con datos ficticios para propósitos de presentación. 