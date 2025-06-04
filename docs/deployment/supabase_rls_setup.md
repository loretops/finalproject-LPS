# Configuración de Row Level Security (RLS) en Supabase

Este documento describe el proceso para configurar y mantener la seguridad a nivel de fila (RLS) en Supabase para la aplicación COOPCO. RLS es una característica crítica de seguridad que controla qué filas pueden ser accedidas en cada tabla.

## Contexto y Arquitectura

El proyecto utiliza la siguiente arquitectura de seguridad:

1. **Frontend**: Aplicación Next.js que se comunica exclusivamente con nuestro backend API.
2. **Backend API**: Servidor Express que utiliza Prisma ORM para conectarse a Supabase.
3. **Supabase**: Base de datos PostgreSQL con RLS habilitado.

Dado que todas las conexiones a la base de datos pasan a través de nuestro backend, utilizamos una configuración de RLS que restringe el acceso solo al rol de servicio (`service_role`).

## Configuración de RLS en Supabase

### 1. Verificar el Estado Actual de RLS

Para verificar si RLS está habilitado en las tablas:

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

Para verificar las políticas de RLS existentes:

```sql
SELECT tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename;
```

### 2. Habilitar RLS en Todas las Tablas

El siguiente script habilita RLS en todas las tablas de la base de datos:

```sql
-- Tablas de alta sensibilidad
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Tablas de media sensibilidad
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Tablas de baja sensibilidad
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public._prisma_migrations ENABLE ROW LEVEL SECURITY;
```

### 3. Configurar Políticas para el Rol de Servicio

Dado que nuestra arquitectura utiliza exclusivamente el backend para acceder a la base de datos, restringimos el acceso solo al rol de servicio:

```sql
-- Ejemplo para la tabla users
CREATE POLICY "Allow only service_role on users" 
ON public.users 
FOR ALL 
USING (auth.role() = 'service_role');

-- Repetir para cada tabla:
CREATE POLICY "Allow only service_role on [table_name]" 
ON public.[table_name] 
FOR ALL 
USING (auth.role() = 'service_role');
```

## Implementación para Nuevas Tablas

Cuando se crea una nueva tabla a través de migraciones de Prisma, es necesario habilitar RLS y crear la política correspondiente manualmente:

```sql
-- Habilitar RLS en la nueva tabla
ALTER TABLE public.nueva_tabla ENABLE ROW LEVEL SECURITY;

-- Crear política para restringir acceso solo al rol de servicio
CREATE POLICY "Allow only service_role on nueva_tabla" 
ON public.nueva_tabla 
FOR ALL 
USING (auth.role() = 'service_role');
```

## Script de Automatización

Recomendamos ejecutar el siguiente script después de cada migración de Prisma para asegurar que todas las tablas tengan RLS habilitado:

```bash
#!/bin/bash
echo "Configurando RLS para todas las tablas..."

# Conexión a la base de datos (ajustar según el entorno)
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "

-- Obtener todas las tablas de public schema
DO \$\$
DECLARE
    tbl_name text;
BEGIN
    FOR tbl_name IN 
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        -- Habilitar RLS
        EXECUTE 'ALTER TABLE public.' || tbl_name || ' ENABLE ROW LEVEL SECURITY;';
        
        -- Eliminar política existente si existe
        EXECUTE 'DROP POLICY IF EXISTS \"Allow only service_role on ' || tbl_name || '\" ON public.' || tbl_name || ';';
        
        -- Crear nueva política
        EXECUTE 'CREATE POLICY \"Allow only service_role on ' || tbl_name || '\" ON public.' || tbl_name || ' FOR ALL USING (auth.role() = ''service_role'');';
        
        RAISE NOTICE 'Configurado RLS para tabla: %', tbl_name;
    END LOOP;
END;
\$\$;
"

echo "Configuración de RLS completada."
```

## Consideraciones Importantes

1. **Backup Previo**: Siempre realizar un backup completo antes de modificar la configuración de RLS.
2. **Pruebas Exhaustivas**: Después de cualquier cambio en RLS, realizar pruebas completas de todas las funcionalidades.
3. **Monitorización**: Vigilar los logs del backend para detectar posibles errores relacionados con permisos.
4. **Credentials de Servicio**: Asegurarse de que el backend utiliza las credenciales de rol de servicio (`service_role`) para conectarse a Supabase. 