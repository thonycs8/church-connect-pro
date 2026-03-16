
-- Fix permissive chat room creation - require created_by = auth.uid()
DROP POLICY "Authenticated can create rooms" ON public.chat_rooms;
CREATE POLICY "Authenticated can create rooms" ON public.chat_rooms
  FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
