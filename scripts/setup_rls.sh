#!/bin/bash
#
# Script para configurar Row Level Security (RLS) en Supabase
# Este script debe ejecutarse después de cada migración de Prisma que cree nuevas tablas
#

# Verificar que las variables de entorno están configuradas
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL no está configurada."
    echo "Configura las variables de entorno necesarias antes de ejecutar este script."
    exit 1
fi

# Extraer credenciales de DATABASE_URL
# Ejemplo formato: postgresql://username:password@host:port/database
DB_USER=$(echo $DATABASE_URL | sed -e 's/^postgresql:\/\///' -e 's/:.*$//')
DB_PASSWORD=$(echo $DATABASE_URL | sed -e 's/^postgresql:\/\/[^:]*://' -e 's/@.*$//')
DB_HOST=$(echo $DATABASE_URL | sed -e 's/^postgresql:\/\/[^@]*@//' -e 's/:.*$//')
DB_PORT=$(echo $DATABASE_URL | sed -e 's/^postgresql:\/\/[^:]*:[^:]*:[^:]*://' -e 's/\/.*$//')
DB_NAME=$(echo $DATABASE_URL | sed -e 's/^postgresql:\/\/[^\/]*\///' -e 's/\?.*$//')

echo "===== Configurando Row Level Security (RLS) para todas las tablas ====="
echo "Base de datos: $DB_NAME en $DB_HOST"
echo "Este script habilitará RLS y configurará políticas restrictivas para cada tabla."
echo ""
echo "IMPORTANTE: Asegúrate de tener un backup reciente antes de continuar."
read -p "¿Deseas continuar? (S/N): " confirm

if [[ ! $confirm =~ ^[Ss]$ ]]; then
    echo "Operación cancelada."
    exit 0
fi

# Conectar a la base de datos y configurar RLS
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME << EOF

-- Habilitar modo de ejecución detallada
\set ECHO all
\set ON_ERROR_STOP on

-- Crear función de ayuda para ejecutar comandos con manejo de errores
DO \$\$
DECLARE
    tbl_name text;
    rls_status boolean;
BEGIN
    RAISE NOTICE '===== Iniciando configuración de RLS =====';
    
    -- Iterar por todas las tablas en el esquema public
    FOR tbl_name IN 
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        -- Verificar si RLS ya está habilitado
        SELECT rowsecurity INTO rls_status FROM pg_tables 
        WHERE schemaname = 'public' AND tablename = tbl_name;
        
        -- Habilitar RLS si no está habilitado
        IF NOT rls_status THEN
            EXECUTE 'ALTER TABLE public.' || tbl_name || ' ENABLE ROW LEVEL SECURITY;';
            RAISE NOTICE 'RLS habilitado para tabla: %', tbl_name;
        ELSE
            RAISE NOTICE 'RLS ya estaba habilitado para tabla: %', tbl_name;
        END IF;
        
        -- Eliminar política existente si existe
        EXECUTE 'DROP POLICY IF EXISTS "Allow only service_role on ' || tbl_name || '" ON public.' || tbl_name || ';';
        
        -- Crear nueva política restrictiva
        EXECUTE 'CREATE POLICY "Allow only service_role on ' || tbl_name || '" ON public.' || tbl_name || ' FOR ALL USING (auth.role() = ''service_role'');';
        
        RAISE NOTICE 'Política de acceso configurada para tabla: %', tbl_name;
    END LOOP;
    
    RAISE NOTICE '===== Configuración de RLS completada con éxito =====';
    
EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION 'Error durante la configuración de RLS: %', SQLERRM;
END;
\$\$;

-- Verificar configuración
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename;

EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "===== Configuración de RLS completada con éxito ====="
    echo "Todas las tablas tienen RLS habilitado y políticas restrictivas configuradas."
    echo "Ahora solo el rol de servicio (service_role) puede acceder a los datos."
else
    echo ""
    echo "===== Error durante la configuración de RLS ====="
    echo "Por favor, revisa los mensajes de error y corrige los problemas."
fi 