-- Script para restringir el acceso a todas las tablas solo al rol de servicio (backend)
-- IMPORTANTE: Ejecutar este script solo después de verificar que las políticas permisivas funcionan correctamente

-- Eliminar políticas permisivas y crear políticas restrictivas para tablas de alta sensibilidad
DROP POLICY IF EXISTS "Allow all operations on users" ON public.users;
CREATE POLICY "Allow only service_role on users" ON public.users FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on password_reset_tokens" ON public.password_reset_tokens;
CREATE POLICY "Allow only service_role on password_reset_tokens" ON public.password_reset_tokens FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on verification_tokens" ON public.verification_tokens;
CREATE POLICY "Allow only service_role on verification_tokens" ON public.verification_tokens FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on invitations" ON public.invitations;
CREATE POLICY "Allow only service_role on invitations" ON public.invitations FOR ALL USING (auth.role() = 'service_role');

-- Eliminar políticas permisivas y crear políticas restrictivas para tablas de media sensibilidad
DROP POLICY IF EXISTS "Allow all operations on projects" ON public.projects;
CREATE POLICY "Allow only service_role on projects" ON public.projects FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on investments" ON public.investments;
CREATE POLICY "Allow only service_role on investments" ON public.investments FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on interests" ON public.interests;
CREATE POLICY "Allow only service_role on interests" ON public.interests FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on project_documents" ON public.project_documents;
CREATE POLICY "Allow only service_role on project_documents" ON public.project_documents FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on conversations" ON public.conversations;
CREATE POLICY "Allow only service_role on conversations" ON public.conversations FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on messages" ON public.messages;
CREATE POLICY "Allow only service_role on messages" ON public.messages FOR ALL USING (auth.role() = 'service_role');

-- Eliminar políticas permisivas y crear políticas restrictivas para tablas de baja sensibilidad
DROP POLICY IF EXISTS "Allow all operations on roles" ON public.roles;
CREATE POLICY "Allow only service_role on roles" ON public.roles FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on document_views" ON public.document_views;
CREATE POLICY "Allow only service_role on document_views" ON public.document_views FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on project_updates" ON public.project_updates;
CREATE POLICY "Allow only service_role on project_updates" ON public.project_updates FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on notifications" ON public.notifications;
CREATE POLICY "Allow only service_role on notifications" ON public.notifications FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on conversation_participants" ON public.conversation_participants;
CREATE POLICY "Allow only service_role on conversation_participants" ON public.conversation_participants FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow all operations on _prisma_migrations" ON public._prisma_migrations;
CREATE POLICY "Allow only service_role on _prisma_migrations" ON public._prisma_migrations FOR ALL USING (auth.role() = 'service_role');

-- Verificar que se han actualizado las políticas
-- SELECT tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename; 