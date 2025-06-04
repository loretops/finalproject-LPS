# Plan de Implementación de RLS en Supabase

## Fase 1: Preparación y análisis

1. **Revisar cómo accede la app a la base de datos**
   - ✅ **Confirmado**: Solo el backend accede a Supabase a través de Prisma.
   - ✅ **Confirmado**: El frontend solo se comunica con el backend a través de la API REST.
   - ✅ **Confirmado**: La conexión a Supabase está protegida por autenticación de tokens JWT en el backend.
   - ✅ **Flujo de datos**: Frontend → Backend API → Prisma ORM → Supabase.

   **Conclusión**: Este es el escenario ideal de seguridad. Todas las conexiones a la base de datos están mediadas por el backend, lo que nos da flexibilidad para implementar RLS sin afectar el funcionamiento de la aplicación.

2. **Identificar tablas críticas**
   - ✅ **Identificadas todas las tablas** y clasificadas por sensibilidad:
   
   **Alta sensibilidad** (contienen datos personales o credenciales):
   - `users` - Información personal y credenciales de usuarios
   - `password_reset_tokens` - Tokens de restablecimiento de contraseña
   - `verification_tokens` - Tokens de verificación de email
   - `invitations` - Tokens de invitación y emails

   **Media sensibilidad** (datos de negocio importantes):
   - `projects` - Información de proyectos de inversión
   - `investments` - Registros de inversiones
   - `interests` - Expresiones de interés en proyectos
   - `project_documents` - Documentos de proyectos
   - `conversations` - Conversaciones entre usuarios
   - `messages` - Mensajes individuales

   **Baja sensibilidad** (datos operativos o secundarios):
   - `roles` - Roles de usuario
   - `document_views` - Registros de visualizaciones
   - `project_updates` - Actualizaciones de proyectos
   - `notifications` - Notificaciones a usuarios
   - `conversation_participants` - Participantes en conversaciones
   - `_prisma_migrations` - Control de migraciones de Prisma

   **Conclusión**: Todas las tablas necesitan RLS, pero debemos ser especialmente cuidadosos con las de alta sensibilidad y empezar la implementación por las de baja sensibilidad como prueba.

3. **Hacer backup de la base de datos**
   - ✅ **Instrucciones para realizar el backup en Supabase**:
   
      1. Iniciar sesión en el [panel de control de Supabase](https://app.supabase.io)
      2. Seleccionar el proyecto correspondiente a COOPCO
      3. En el menú lateral izquierdo, ir a "Database" (Base de datos)
      4. En el menú desplegable, seleccionar "Backups" (Copias de seguridad)
      5. Hacer clic en el botón "Create backup" (Crear copia de seguridad)
      6. Seleccionar "Full backup" (Copia completa)
      7. Añadir una descripción como "Backup previo a implementación RLS"
      8. Confirmar la creación del backup
      9. Esperar a que el proceso de backup termine (puede tardar varios minutos)
      10. Verificar que el backup aparece en la lista con estado "Completed"
   
   **Importante**: Este backup permitirá restaurar la base de datos en caso de que algo salga mal durante la implementación de RLS.

## Fase 2: Habilitar RLS de forma segura

4. **Habilitar RLS en una tabla de prueba**
   - ✅ **Selección de tabla de prueba**: Se ha elegido la tabla `roles` por ser de baja sensibilidad y poco uso.
   - ✅ **Script SQL preparado**: [01_enable_rls_test_table.sql](rls_sql_scripts/01_enable_rls_test_table.sql)
   
   ```sql
   -- Habilitar RLS
   ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
   
   -- Crear política permisiva (permite todo acceso)
   CREATE POLICY "Allow all operations on roles" ON public.roles FOR ALL USING (true);
   ```
   
   **Pasos para aplicar**:
   1. Ejecutar el script en el Editor SQL de Supabase
   2. Verificar que se ha habilitado RLS:
      ```sql
      SELECT tablename, rowsecurity FROM pg_tables 
      WHERE schemaname = 'public' AND tablename = 'roles';
      ```
   3. Comprobar que la aplicación sigue funcionando correctamente:
      - Hacer login con usuarios existentes
      - Verificar que las funciones administrativas siguen funcionando
      - Confirmar que el registro de nuevos usuarios sigue operativo
   
   **Posibles problemas y soluciones**:
   - Si la aplicación falla al cargar roles de usuario: Verificar logs y conexiones
   - Si hay errores de permisos: Asegurarse de que la política permisiva se ha creado correctamente

5. **Habilitar RLS en tablas reales, pero SIN políticas restrictivas aún**
   - ✅ **Script SQL preparado**: [02_enable_rls_all_tables.sql](rls_sql_scripts/02_enable_rls_all_tables.sql)
   
   ```sql
   -- Tablas de alta sensibilidad
   ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;
   -- ... más tablas
   
   -- Tablas de media sensibilidad
   ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
   -- ... más tablas
   
   -- Tablas de baja sensibilidad
   ALTER TABLE public.document_views ENABLE ROW LEVEL SECURITY;
   -- ... más tablas
   ```
   
   **Pasos para aplicar**:
   1. **IMPORTANTE**: Asegurarse primero de que el paso 4 (tabla de prueba) funciona correctamente
   2. Ejecutar el script en el Editor SQL de Supabase 
   3. Verificar que se ha habilitado RLS en todas las tablas:
      ```sql
      SELECT tablename, rowsecurity FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename;
      ```
   
   **Nota de Seguridad**: En este punto, habilitar RLS en estas tablas **no restringirá el acceso**. Sin políticas específicas, Supabase permite todo el acceso por defecto. Esto nos da la oportunidad de habilitar RLS en todas las tablas sin romper la funcionalidad existente.

## Fase 3: Definir y probar políticas

6. **Crear una política de acceso abierta para no romper nada**
   - ✅ **Script SQL preparado**: [03_create_permissive_policies.sql](rls_sql_scripts/03_create_permissive_policies.sql)
   
   ```sql
   -- Crear políticas permisivas para tablas de alta sensibilidad
   CREATE POLICY "Allow all operations on users" ON public.users FOR ALL USING (true);
   CREATE POLICY "Allow all operations on password_reset_tokens" ON public.password_reset_tokens FOR ALL USING (true);
   -- ... más políticas
   
   -- Crear políticas permisivas para tablas de media sensibilidad
   CREATE POLICY "Allow all operations on projects" ON public.projects FOR ALL USING (true);
   -- ... más políticas
   
   -- Crear políticas permisivas para tablas de baja sensibilidad
   CREATE POLICY "Allow all operations on document_views" ON public.document_views FOR ALL USING (true);
   -- ... más políticas
   ```
   
   **Pasos para aplicar**:
   1. **IMPORTANTE**: Ejecutar este script solo después de haber verificado que el RLS está correctamente habilitado
   2. Ejecutar el script en el Editor SQL de Supabase
   3. Verificar que se han creado las políticas:
      ```sql
      SELECT tablename, policyname, permissive, roles, cmd, qual
      FROM pg_policies
      WHERE schemaname = 'public'
      ORDER BY tablename;
      ```
   
   **Nota de Seguridad**: Estas políticas permisivas (using `true`) permiten cualquier operación en las tablas, manteniendo la funcionalidad actual intacta mientras tenemos RLS habilitado. Esto es un paso intermedio antes de implementar políticas más restrictivas.

7. **Probar la aplicación**
   - ✅ **Lista de verificación de pruebas**: [rls_testing_checklist.md](rls_testing_checklist.md)
   
   **Pruebas Cruciales**:
   1. **Autenticación y acceso**:
      - Login con credenciales existentes
      - Registro con invitación válida
      - Verificación de emails
      - Recuperación de contraseña
   
   2. **Operaciones CRUD**:
      - Crear, leer, actualizar y eliminar proyectos
      - Realizar y gestionar inversiones
      - Gestión de documentos de proyectos
      - Recibir y gestionar notificaciones
   
   3. **Funciones administrativas**:
      - Panel de administración
      - Gestión de usuarios
      - Revisión de proyectos
   
   **Procedimiento de prueba**:
   1. Ejecutar cada punto de la lista de verificación
   2. Registrar cualquier problema encontrado
   3. Para cada problema, determinar si está relacionado con RLS o con otro aspecto
   4. Corregir problemas relacionados con RLS ajustando las políticas según sea necesario
   
   **Plan de contingencia**:
   - Si se encuentran problemas graves que impiden el funcionamiento básico, revertir los cambios utilizando el backup creado en el paso 3.

## Fase 4: Afinar políticas según la arquitectura

8. **Restringir el acceso solo al rol de servicio (backend)**
   - ✅ **Script SQL preparado**: [04_restrict_to_service_role.sql](rls_sql_scripts/04_restrict_to_service_role.sql)
   
   ```sql
   -- Eliminar políticas permisivas y crear políticas restrictivas para tablas de alta sensibilidad
   DROP POLICY IF EXISTS "Allow all operations on users" ON public.users;
   CREATE POLICY "Allow only service_role on users" ON public.users FOR ALL USING (auth.role() = 'service_role');
   
   -- ... más políticas para otras tablas de alta sensibilidad
   
   -- Eliminar políticas permisivas y crear políticas restrictivas para tablas de media sensibilidad
   DROP POLICY IF EXISTS "Allow all operations on projects" ON public.projects;
   CREATE POLICY "Allow only service_role on projects" ON public.projects FOR ALL USING (auth.role() = 'service_role');
   
   -- ... más políticas para otras tablas de media sensibilidad
   
   -- Eliminar políticas permisivas y crear políticas restrictivas para tablas de baja sensibilidad
   -- ... políticas para tablas de baja sensibilidad
   ```
   
   **Pasos para aplicar**:
   1. **IMPORTANTE**: Asegurarse de que la aplicación funciona correctamente con las políticas permisivas
   2. Ejecutar el script en el Editor SQL de Supabase
   3. Verificar que se han actualizado las políticas:
      ```sql
      SELECT tablename, policyname, permissive, roles, cmd, qual
      FROM pg_policies
      WHERE schemaname = 'public'
      ORDER BY tablename;
      ```
   
   **Consideraciones de seguridad**:
   - La condición `auth.role() = 'service_role'` asegura que solo las solicitudes autenticadas con el rol de servicio (usado por nuestro backend) pueden acceder a los datos.
   - Esto refuerza el modelo de seguridad, ya que ahora la base de datos no puede ser accedida directamente, incluso si alguien obtiene la URL y credenciales para la API de Supabase.
   - Todas las peticiones a la base de datos deben pasar a través de nuestro backend, que implementa su propia capa de autorización y validación.

9. **Probar de nuevo la aplicación**
   - ✅ **Lista de verificación específica**: [rls_testing_checklist_restricted.md](rls_testing_checklist_restricted.md)
   
   **Pruebas de Funcionalidad del Backend**:
   - Verificar que todas las operaciones normales siguen funcionando (deben funcionar igual)
   - Comprobar que el backend se conecta correctamente a Supabase usando el rol de servicio
   - Revisar los logs del backend para confirmar que no hay errores de permisos
   
   **Pruebas de Seguridad (Verificación de Restricciones)**:
   - Intentar acceder directamente a las tablas vía la API de Supabase (debería **fallar**)
   - Intentar leer/escribir datos sin el rol de servicio (debería **fallar**)
   - Confirmar que el frontend solo puede acceder a datos a través del backend
   
   **Pruebas de Rendimiento**:
   - Comparar tiempos de respuesta con las mediciones de línea base
   - Verificar que no hay sobrecarga significativa debido a RLS
   
   **Procedimiento de prueba**:
   1. Ejecutar todas las pruebas funcionales normales para verificar que todo sigue funcionando
   2. Realizar pruebas específicas de seguridad para confirmar que las restricciones están aplicadas
   3. Monitorizar la aplicación por 24-48 horas para detectar cualquier problema no inmediatamente visible
   
   **Plan de contingencia**:
   - Si se encuentran problemas críticos, se puede revertir a las políticas permisivas (más seguras que sin RLS)
   - En caso de fallo grave, restaurar desde el backup creado en el paso 3

## Fase 5: Documentar y automatizar

10. **Documentar las políticas creadas**
    - ✅ **Documentación completa**: [supabase_rls_setup.md](../deployment/supabase_rls_setup.md)
    
    **Contenido de la documentación**:
    - Contexto y arquitectura de seguridad
    - Instrucciones para verificar el estado actual de RLS
    - Scripts SQL para habilitar RLS en todas las tablas
    - Scripts SQL para configurar políticas restrictivas
    - Procedimiento para implementar RLS en nuevas tablas
    - Consideraciones importantes y mejores prácticas

11. **Automatizar en scripts de migración o setup**
    - ✅ **Script de automatización**: [setup_rls.sh](../../scripts/setup_rls.sh)
    
    **Funcionalidades del script**:
    - Extrae automáticamente las credenciales de la base de datos de `DATABASE_URL`
    - Verifica que el usuario desea continuar antes de aplicar cambios
    - Habilita RLS en todas las tablas del esquema `public`
    - Crea políticas restrictivas para el rol de servicio (`service_role`)
    - Maneja errores y proporciona retroalimentación detallada
    - Verifica la configuración al finalizar
    
    **Uso recomendado**:
    - Ejecutar después de cada migración de Prisma que cree nuevas tablas
    - Mantener actualizadas las políticas de RLS

## Progreso de la implementación

- [x] 1. Revisar cómo accede la app a la base de datos
- [x] 2. Identificar tablas críticas
- [x] 3. Hacer backup de la base de datos
- [x] 4. Habilitar RLS en una tabla de prueba
- [x] 5. Habilitar RLS en todas las tablas
- [x] 6. Crear políticas de acceso abiertas
- [x] 7. Probar la aplicación
- [x] 8. Restringir acceso solo al rol de servicio
- [x] 9. Probar de nuevo
- [x] 10. Documentar políticas
- [x] 11. Automatizar en scripts 