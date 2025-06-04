# Lista de Verificación para Pruebas tras Implementación de Políticas Restrictivas

## Pruebas con Backend (Debe seguir funcionando)

### Autenticación y Usuarios
- [X] Login de usuario existente
- [X] Registro de nuevo usuario con invitación válida
- [X] Recuperación de contraseña
- [ ] Verificación de email
- [X] Cierre de sesión

### Proyectos
- [ ] Listado de proyectos (para usuarios normales)
- [ ] Listado de proyectos (para administradores)
- [ ] Creación de proyecto nuevo (para gestores)
- [ ] Visualización detallada de proyecto
- [ ] Edición de proyecto existente
- [ ] Eliminación de proyecto

### Inversiones
- [ ] Listar inversiones de un usuario
- [ ] Realizar una nueva inversión
- [ ] Ver detalles de una inversión
- [ ] Cancelar una inversión (si aplica)

### Documentos
- [ ] Subir documento a un proyecto
- [ ] Listar documentos de un proyecto
- [ ] Descargar documento
- [ ] Eliminar documento

### Funciones Administrativas
- [ ] Acceso al panel de administración
- [ ] Gestión de usuarios
- [ ] Envío de invitaciones
- [ ] Revisión de proyectos

## Pruebas de Seguridad (Debe FALLAR - verificación de la restricción)

> Nota: Estas pruebas son para confirmar que las restricciones funcionan y solo se pueden realizar si tienes acceso directo a la API de Supabase.

- [ ] Intentar leer datos de `users` directamente desde la API de Supabase (debe fallar)
- [ ] Intentar leer datos de `projects` directamente desde la API de Supabase (debe fallar)
- [ ] Intentar modificar datos en cualquier tabla directamente desde la API de Supabase (debe fallar)

## Pruebas de Rendimiento

- [ ] Tiempo de carga del listado de proyectos (comparar con línea base)
- [ ] Tiempo de respuesta en operaciones CRUD (comparar con línea base)
- [ ] Comportamiento con múltiples usuarios simultáneos

## Problemas Encontrados

| Problema | Descripción | Solución Aplicada |
|----------|-------------|-------------------|
|          |             |                   |
|          |             |                   |
|          |             |                   |

## Verificación de Conexiones

### Verificar Logs del Backend
- [ ] Comprobar que no hay errores de conexión a la base de datos
- [ ] Verificar que las consultas SQL se ejecutan correctamente
- [ ] Asegurarse de que el backend está conectándose con el rol de servicio correcto

### Verificar Conexión del Frontend
- [ ] Confirmar que el frontend solo se comunica con el backend (no con Supabase directamente)
- [ ] Verificar que las llamadas API al backend funcionan correctamente

## Notas Adicionales

- 

---

**Fecha de pruebas**: _____________
**Realizado por**: _____________
**Versión de la aplicación**: _____________ 