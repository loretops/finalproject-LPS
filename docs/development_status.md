# Seguimiento del Desarrollo

## Historia de Usuario 1: Registro mediante invitación

| Ticket ID | Título Corto                     | Estado        | Resumen AC | Resumen Tests | Notas                                     |
| :-------- | :------------------------------- | :------------ | :--------- | :------------ | :---------------------------------------- |
| #1        | Implementar Login básico         | ✅ Completado | 5/5        | 0/3           | Funcionalidad básica probada manualmente  |
| #2        | Servicios Auth Frontend          | ✅ Completado | 5/5        | 0/0           | Servicio base creado para login         |
| #3        | Modelo Invitaciones (DB)         | ✅ Completado | 6/6        | N/A           | Modelo ya existe en schema.prisma       |
| #4        | Servicio Invitaciones (Backend)  | ✅ Completado | 6/6        | 0/6           | Servicio funcional, pendiente tests formales |
| #5        | Envío Emails Invitación        | ✅ Completado | 6/7        | 0/1           | Envío básico probado con Mailtrap       |
| #6        | UI Crear/Enviar Invitaciones     | ✅ Completado | 6/7        | 0/0           | Interfaz básica funcional para enviar    |
| #7        | API Validar Invitación         | ✅ Completado | 5/5        | 0/0           | Endpoint OK, falta test integración    |
| #8        | API Registrar Usuario          | ✅ Completado | 7/7        | 0/0           | Endpoint OK (usa F/LName), falta TDD |
| #9        | Página Validar Invitación (FE) | ⏳ En Progreso | 5/7        | 0/0           | API real conectada, falta test manual |
| #10       | Formulario Registro (FE)       | ⏳ En Progreso | 6/8        | 0/0           | API real conectada, falta test manual |
| #11       | Página Confirmación (FE)       | ✅ Completado | 5/5        | 0/0           | Página creada, sin lógica verificación |
| #12       | Actualizar Documentación HU    | ✅ Completado | 1/1        | N/A           | Actualización de dependencias entre HU2 y HU10 |
| #13       | Tabla Priorizada de HU         | ✅ Completado | 1/1        | N/A           | Creación de tabla según orden lógico de desarrollo |

*Leyenda Estado: ⚪ Pendiente | ⏳ En Progreso | ✅ Completado | ❌ Bloqueado*
*Resumen AC: Criterios de Aceptación cumplidos / totales*
*Resumen Tests: Tests pasados / totales (N/A si no aplica)*

---

## Historia de Usuario 10: Publicación de oportunidades de inversión

| Ticket ID | Título Corto                     | Estado        | Resumen AC | Resumen Tests | Notas                                     |
| :-------- | :------------------------------- | :------------ | :--------- | :------------ | :---------------------------------------- |
| #12       | Verificación de roles           | ✅ Completado | 5/5        | 5/5           | Implementado y documentado con tests      |
| #13       | Modelo para proyectos (DB)      | ✅ Completado | 5/5        | N/A           | Modelos existentes y repo implementado     |
| #14       | Servicio almacenamiento docs    | ⚪ Pendiente   | 0/6        | 0/0           | Definir estrategia de almacenamiento       |
| #15       | API Endpoints gestión proyectos | ✅ Completado | 7/7        | 0/0           | Implementados y probados                    |
| #16       | UI Listado proyectos (admin)    | ⚪ Pendiente   | 0/6        | 0/0           | Depende de #15                             |
| #17       | Formulario creación/edición     | ⚪ Pendiente   | 0/6        | 0/0           | Depende de #15                             |
| #18       | Componente gestión documentos   | ⚪ Pendiente   | 0/6        | 0/0           | Depende de #14 y #15                       |
| #19       | UI Publicación y vista previa   | ⚪ Pendiente   | 0/6        | 0/0           | Depende de #17                             |

*Leyenda Estado: ⚪ Pendiente | ⏳ En Progreso | ✅ Completado | ❌ Bloqueado*
*Resumen AC: Criterios de Aceptación cumplidos / totales*
*Resumen Tests: Tests pasados / totales (N/A si no aplica)*

---

## Detalles de Tickets Recientes / En Progreso

*(Aquí añadiremos detalles de Criterios de Aceptación y Tests para los tickets a medida que los trabajemos)*

### Ticket #1: Implementar Login básico (✅ Completado)

**Criterios de Aceptación:**
- [X] Formulario de login funcional con campos de email y contraseña
- [X] Validación de credenciales contra la base de datos
- [X] Generación de token JWT para mantener la sesión
- [X] Protección de rutas privadas (básica implementada)
- [X] Manejo de errores de autenticación con mensajes claros

**Tests Pasados:** (Pendiente definir y ejecutar formalmente)
- [ ] Test de login exitoso
- [ ] Test de login fallido (credenciales incorrectas)
- [ ] Test de acceso a ruta protegida sin token

### Ticket #2: Servicios Auth Frontend (✅ Completado)
*(Servicio base para login creado)*

### Ticket #3: Modelo Invitaciones (DB) (✅ Completado)
*(Modelo ya existente en `schema.prisma`)*

### Ticket #5: Envío Emails Invitación (✅ Completado)
*(Servicio básico implementado y probado con Mailtrap. Plantilla HTML básica)*

### Ticket #6: UI Crear/Enviar Invitaciones (✅ Completado)
*(Interfaz básica para enviar invitaciones funcional)*

### Ticket #4: Servicio de gestión de invitaciones (⏳ En Progreso)

**Criterios de Aceptación (Servicio Implementado):**
- [X] Se genera correctamente un token único y criptográficamente seguro
- [X] Se puede verificar si un token es válido o ha expirado
- [X] Se gestiona correctamente la actualización de estado (usado, expirado)
- [X] Se implementa la lógica para asegurar que solo hay una invitación activa por email
- [X] Se registra toda la información necesaria (quién invitó, cuándo, etc.)
- [X] Incluye una función para *crear* una nueva invitación asociada a un email y al gestor que invita.

**Tests (Pendientes):**
- [ ] Test: Generación de token seguro
- [ ] Test: Verificación de token válido (caso exitoso)
- [ ] Test: Verificación de token expirado
- [ ] Test: Verificación de token inválido/no encontrado
- [ ] Test: Verificación de token ya usado
- [ ] Test: Asegurar unicidad de invitación activa por email al crear
- [ ] Test: Creación exitosa de invitación
- [ ] Test: Marcado como USADO exitoso
- [ ] Test: Marcado como EXPIRADO exitoso

### Ticket #12: Verificación de roles y permisos (✅ Completado)

**Criterios de Aceptación:**
- [X] El middleware verifica correctamente si el usuario tiene rol 'manager'
- [X] Bloquea acceso a usuarios con roles insuficientes (403 Forbidden)
- [X] Se integra con el sistema de autenticación existente
- [X] Puede usarse de forma selectiva en rutas específicas
- [X] Proporciona mensajes de error claros

**Tests Implementados:**
- [X] Test: Acceso permitido con rol requerido exacto
- [X] Test: Acceso permitido con uno de varios roles requeridos
- [X] Test: Acceso denegado con rol incorrecto
- [X] Test: Acceso denegado sin información de rol
- [X] Test: Error al no proporcionar roles al middleware

**Documentación:**
- Se ha creado una guía detallada de uso en `docs/technical/role-middleware-guide.md`
- Se ha implementado un conjunto de rutas de ejemplo en `backend/interfaces/http/routes/project.routes.js`

### Ticket #13: Modelo de datos para gestión de proyectos (✅ Completado)

**Criterios de Aceptación:**
- [X] El modelo Project contiene todos los campos requeridos (id, title, description, etc.)
- [X] El modelo ProjectDocument soporta diferentes tipos de archivos y niveles de acceso
- [X] Se establecen las relaciones correctas entre tablas
- [X] Se implementan índices para consultas eficientes
- [X] Se definen interfaces y DTOs para trabajar con los datos

**Resultados:**
- Verificación de que los modelos ya existen en `schema.prisma`
- Creación de DTO para proyectos en `backend/interfaces/http/dto/project.dto.js`
- Implementación de interfaz de repositorio en `backend/domain/repositories/ProjectRepository.js`
- Implementación del repositorio con Prisma en `backend/infrastructure/repositories/PrismaProjectRepository.js`

**Nota:** No fue necesario crear nuevos modelos ni migraciones, ya que el esquema de la base de datos ya incluía todos los modelos necesarios para la gestión de proyectos.

---

## Resultados de Pruebas Recientes (2025-05-07)

### Historia de Usuario 1: Registro mediante invitación

**Tickets probados hoy:**
- #4: Servicio Invitaciones (Backend) ✅ Funciona correctamente
- #7: API Validar Invitación ✅ Funciona correctamente

**Detalles de las pruebas:**
1. **API Health Check:** El endpoint `/api/health` responde correctamente ✅
2. **Roles del Sistema:** El endpoint `/api/roles` lista correctamente los roles configurados ✅
3. **Autenticación:** El login funciona correctamente para usuarios existentes ✅
4. **Listado de Invitaciones:** El endpoint `GET /api/invitations` devuelve las invitaciones existentes en el sistema cuando se usa un token válido ✅
5. **Creación de Invitaciones:** El endpoint `POST /api/invitations` crea correctamente nuevas invitaciones ✅
6. **Validación de Invitaciones:** El endpoint `GET /api/auth/invitation/:token` valida correctamente un token de invitación ✅

### Historia de Usuario 10: Publicación de oportunidades de inversión

**Tickets probados hoy:**
- #12: Verificación de roles ✅ Funciona correctamente
- #15: API Endpoints gestión proyectos ✅ Funciona correctamente

**Detalles de las pruebas:**
1. **Rutas Protegidas:** Las rutas de proyectos requieren correctamente autenticación, devolviendo 401 sin token ✅
2. **Verificación de Roles:** Se verificó correctamente que un usuario con rol 'manager' puede acceder a las rutas protegidas ✅
3. **Creación de Proyectos:** El endpoint `POST /api/projects` crea correctamente un nuevo proyecto ✅
4. **Listado de Proyectos:** El endpoint `GET /api/projects` lista correctamente los proyectos existentes ✅
5. **Detalle de Proyecto:** El endpoint `GET /api/projects/:id` muestra correctamente los detalles de un proyecto específico ✅
6. **Publicación de Proyecto:** El endpoint `POST /api/projects/:id/publish` publica correctamente un proyecto ✅

**Nota:** Los endpoints para la gestión de documentos (`POST /api/projects/:id/documents`) requieren la implementación del servicio de almacenamiento (Ticket #14) para ser funcionales. 