
-- 1. Enum for roles
CREATE TYPE public.app_role AS ENUM (
  'super_admin', 'admin', 'pastor', 'secretario', 'tesoureiro',
  'multimedia', 'professor_infantil', 'lider_ministerio', 'membro', 'voluntario'
);

-- 2. Enum for member status
CREATE TYPE public.member_status AS ENUM ('active', 'inactive', 'pending');

-- 3. Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Members table
CREATE TABLE public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  street TEXT,
  number TEXT,
  complement TEXT,
  parish TEXT,
  county TEXT,
  district TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Portugal',
  birth_date DATE,
  baptism_date DATE,
  status member_status NOT NULL DEFAULT 'active',
  member_type TEXT NOT NULL DEFAULT 'membro',
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- 6. Visitors table
CREATE TABLE public.visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  first_visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  converted_to_member BOOLEAN NOT NULL DEFAULT false,
  converted_member_id UUID REFERENCES public.members(id),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- 7. Discipleship table
CREATE TABLE public.discipleship (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  disciple_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active',
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.discipleship ENABLE ROW LEVEL SECURITY;

-- 8. Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  event_type TEXT NOT NULL DEFAULT 'culto',
  is_recurring BOOLEAN NOT NULL DEFAULT false,
  recurrence_pattern TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 9. Event attendees table
CREATE TABLE public.event_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  attended BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(event_id, member_id)
);
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;

-- 10. Volunteers table
CREATE TABLE public.volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  ministry TEXT NOT NULL,
  availability TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

-- 11. Blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID NOT NULL REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'draft',
  tags TEXT[],
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 12. Chat rooms table
CREATE TABLE public.chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  room_type TEXT NOT NULL DEFAULT 'group',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;

-- 13. Chat messages table
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- 14. Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 15. Function to check if user has any admin-level role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('super_admin', 'admin')
  )
$$;

-- 16. Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  -- Default role: membro
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'membro');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 17. RLS Policies

-- Profiles: users can read all, update own
CREATE POLICY "Anyone authenticated can view profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (id = auth.uid());

-- User roles: viewable by all authenticated, managed by admins
CREATE POLICY "Authenticated can view roles" ON public.user_roles
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Members: viewable by all authenticated, managed by admin/pastor/secretario
CREATE POLICY "Authenticated can view members" ON public.members
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage members" ON public.members
  FOR INSERT TO authenticated WITH CHECK (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor') OR public.has_role(auth.uid(), 'secretario')
  );
CREATE POLICY "Staff can update members" ON public.members
  FOR UPDATE TO authenticated USING (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor') OR public.has_role(auth.uid(), 'secretario')
  );
CREATE POLICY "Admins can delete members" ON public.members
  FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Visitors: same as members
CREATE POLICY "Authenticated can view visitors" ON public.visitors
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage visitors" ON public.visitors
  FOR INSERT TO authenticated WITH CHECK (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor') OR public.has_role(auth.uid(), 'secretario')
  );
CREATE POLICY "Staff can update visitors" ON public.visitors
  FOR UPDATE TO authenticated USING (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor') OR public.has_role(auth.uid(), 'secretario')
  );
CREATE POLICY "Admins can delete visitors" ON public.visitors
  FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Discipleship
CREATE POLICY "Authenticated can view discipleship" ON public.discipleship
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage discipleship" ON public.discipleship
  FOR INSERT TO authenticated WITH CHECK (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor')
  );
CREATE POLICY "Staff can update discipleship" ON public.discipleship
  FOR UPDATE TO authenticated USING (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor')
  );
CREATE POLICY "Admins can delete discipleship" ON public.discipleship
  FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Events: viewable by all, managed by admin/pastor/secretario
CREATE POLICY "Authenticated can view events" ON public.events
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage events" ON public.events
  FOR INSERT TO authenticated WITH CHECK (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor') OR public.has_role(auth.uid(), 'secretario')
  );
CREATE POLICY "Staff can update events" ON public.events
  FOR UPDATE TO authenticated USING (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor') OR public.has_role(auth.uid(), 'secretario')
  );
CREATE POLICY "Admins can delete events" ON public.events
  FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Event attendees
CREATE POLICY "Authenticated can view attendees" ON public.event_attendees
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage attendees" ON public.event_attendees
  FOR INSERT TO authenticated WITH CHECK (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor') OR public.has_role(auth.uid(), 'secretario')
  );
CREATE POLICY "Staff can update attendees" ON public.event_attendees
  FOR UPDATE TO authenticated USING (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor') OR public.has_role(auth.uid(), 'secretario')
  );
CREATE POLICY "Admins can delete attendees" ON public.event_attendees
  FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Volunteers
CREATE POLICY "Authenticated can view volunteers" ON public.volunteers
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage volunteers" ON public.volunteers
  FOR INSERT TO authenticated WITH CHECK (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor') OR public.has_role(auth.uid(), 'secretario')
  );
CREATE POLICY "Staff can update volunteers" ON public.volunteers
  FOR UPDATE TO authenticated USING (
    public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'pastor') OR public.has_role(auth.uid(), 'secretario')
  );
CREATE POLICY "Admins can delete volunteers" ON public.volunteers
  FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Blog posts: published visible to all, drafts to author/admins
CREATE POLICY "Anyone can view published posts" ON public.blog_posts
  FOR SELECT TO authenticated USING (status = 'published' OR author_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can create posts" ON public.blog_posts
  FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "Authors can update own posts" ON public.blog_posts
  FOR UPDATE TO authenticated USING (author_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "Authors can delete own posts" ON public.blog_posts
  FOR DELETE TO authenticated USING (author_id = auth.uid() OR public.is_admin(auth.uid()));

-- Chat rooms: visible to all authenticated
CREATE POLICY "Authenticated can view rooms" ON public.chat_rooms
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can create rooms" ON public.chat_rooms
  FOR INSERT TO authenticated WITH CHECK (true);

-- Chat messages: visible to all in room
CREATE POLICY "Authenticated can view messages" ON public.chat_messages
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can send messages" ON public.chat_messages
  FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid());

-- Enable realtime for chat
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
