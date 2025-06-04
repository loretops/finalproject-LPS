-- Script para crear políticas permisivas en todas las tablas
-- IMPORTANTE: Ejecutar este script después de habilitar RLS en todas las tablas

-- Crear políticas permisivas para tablas de alta sensibilidad
CREATE POLICY "Allow all operations on users" ON public.users FOR ALL USING (true);
CREATE POLICY "Allow all operations on password_reset_tokens" ON public.password_reset_tokens FOR ALL USING (true);
CREATE POLICY "Allow all operations on verification_tokens" ON public.verification_tokens FOR ALL USING (true);
CREATE POLICY "Allow all operations on invitations" ON public.invitations FOR ALL USING (true);

-- Crear políticas permisivas para tablas de media sensibilidad
CREATE POLICY "Allow all operations on projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow all operations on investments" ON public.investments FOR ALL USING (true);
CREATE POLICY "Allow all operations on interests" ON public.interests FOR ALL USING (true);
CREATE POLICY "Allow all operations on project_documents" ON public.project_documents FOR ALL USING (true);
CREATE POLICY "Allow all operations on conversations" ON public.conversations FOR ALL USING (true);
CREATE POLICY "Allow all operations on messages" ON public.messages FOR ALL USING (true);

-- Crear políticas permisivas para tablas de baja sensibilidad
-- Nota: 'roles' ya tiene una política permisiva desde el paso 4
CREATE POLICY "Allow all operations on document_views" ON public.document_views FOR ALL USING (true);
CREATE POLICY "Allow all operations on project_updates" ON public.project_updates FOR ALL USING (true);
CREATE POLICY "Allow all operations on notifications" ON public.notifications FOR ALL USING (true);
CREATE POLICY "Allow all operations on conversation_participants" ON public.conversation_participants FOR ALL USING (true);
CREATE POLICY "Allow all operations on _prisma_migrations" ON public._prisma_migrations FOR ALL USING (true);

-- Verificar que se han creado las políticas
-- SELECT tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename; 