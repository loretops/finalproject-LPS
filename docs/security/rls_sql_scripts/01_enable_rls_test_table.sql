-- Script para habilitar RLS en la tabla de roles (prueba)

-- Paso 1: Habilitar RLS para la tabla roles
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- Paso 2: Crear política permisiva (permite todo acceso)
-- Esto asegura que no se rompa nada mientras probamos
CREATE POLICY "Allow all operations on roles" ON public.roles FOR ALL USING (true);

-- Nota: Esta política es temporal y solo para pruebas
-- Se reemplazará después por una política más restrictiva

-- Para verificar que RLS está habilitado:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'roles'; 