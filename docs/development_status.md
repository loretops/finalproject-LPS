# Seguimiento del Desarrollo

## Historia de Usuario 1: Registro mediante invitación

| Ticket ID | Título Corto                     | Estado        | Resumen AC | Resumen Tests | Notas                                     |
| :-------- | :------------------------------- | :------------ | :--------- | :------------ | :---------------------------------------- |
| #1        | Implementar Login básico         | ✅ Completado | 5/5        | 0/3           | Funcionalidad básica probada manualmente  |
| #2        | Servicios Auth Frontend          | ✅ Completado | 5/5        | 0/0           | Servicio base creado para login         |
| #3        | Modelo Invitaciones (DB)         | ✅ Completado | 6/6        | N/A           | Modelo ya existe en schema.prisma       |
| #4        | Servicio Invitaciones (Backend)  | ⏳ En Progreso | 6/6        | 0/6           | Servicio OK, faltan tests             |
| #5        | Envío Emails Invitación        | ✅ Completado | 6/7        | 0/1           | Envío básico probado con Mailtrap       |
| #6        | UI Crear/Enviar Invitaciones     | ✅ Completado | 6/7        | 0/0           | Interfaz básica funcional para enviar    |
| #7        | API Validar Invitación         | ✅ Completado | 5/5        | 0/0           | Endpoint OK, falta test integración    |
| #8        | API Registrar Usuario          | ✅ Completado | 7/7        | 0/0           | Endpoint OK (usa F/LName), falta TDD |
| #9        | Página Validar Invitación (FE) | ⏳ En Progreso | 5/7        | 0/0           | API real conectada, falta test manual |
| #10       | Formulario Registro (FE)       | ⏳ En Progreso | 6/8        | 0/0           | API real conectada, falta test manual |
| #11       | Página Confirmación (FE)       | ✅ Completado | 5/5        | 0/0           | Página creada, sin lógica verificación |

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

--- 