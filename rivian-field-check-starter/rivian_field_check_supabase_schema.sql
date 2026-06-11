-- RIVIAN FIELD CHECK
-- Stage 2 Supabase Schema Draft
-- Purpose: Team-shared field checklist, task assignment, issue/photo tracking.
-- Generated for MVP 1 scope. Material module is intentionally excluded.

create extension if not exists "pgcrypto";

-- =========================================================
-- 1. ENUM TYPES
-- =========================================================

do $$ begin
  create type app_role as enum (
    'owner',
    'office_admin',
    'site_manager',
    'field_worker',
    'read_only'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type project_status as enum (
    'planning',
    'in_progress',
    'paused',
    'completed',
    'archived'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type checklist_status as enum (
    'not_started',
    'in_progress',
    'done',
    'on_hold',
    'issue',
    'recheck_requested'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type issue_status as enum (
    'needs_review',
    'in_progress',
    'on_hold',
    'resolved'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type priority_level as enum (
    'low',
    'normal',
    'high',
    'urgent'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type activity_action as enum (
    'created',
    'updated',
    'deleted',
    'status_changed',
    'photo_uploaded',
    'issue_created',
    'issue_resolved',
    'assigned',
    'commented'
  );
exception when duplicate_object then null;
end $$;


-- =========================================================
-- 2. UTILITY FUNCTION
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- =========================================================
-- 3. USER PROFILES
-- Supabase auth.users is the auth source.
-- user_profiles stores app roles and business-facing user data.
-- =========================================================

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  company text default '리비안 디자인',
  role app_role not null default 'field_worker',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_user_profiles_updated_at on public.user_profiles;
create trigger trg_user_profiles_updated_at
before update on public.user_profiles
for each row execute function public.set_updated_at();


-- =========================================================
-- 4. PROJECTS
-- =========================================================

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  project_name text not null,
  project_code text unique,
  address text,
  client_name text,
  project_type text, -- apartment, house, office, clinic, academy, etc.
  area_m2 numeric(10,2),
  area_py numeric(10,2),
  start_date date,
  end_date date,
  status project_status not null default 'planning',
  description text,
  created_by uuid references public.user_profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_created_by on public.projects(created_by);

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();


-- =========================================================
-- 5. PROJECT MEMBERS
-- One user can have a different role per project.
-- assigned_process can be null for office/admin roles.
-- =========================================================

create table if not exists public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  role_in_project app_role not null default 'field_worker',
  assigned_process_id uuid,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(project_id, user_id, assigned_process_id)
);

create index if not exists idx_project_members_project on public.project_members(project_id);
create index if not exists idx_project_members_user on public.project_members(user_id);


-- =========================================================
-- 6. PROCESS TEMPLATES
-- Imported from process_templates_app_ready.csv
-- =========================================================

create table if not exists public.process_templates (
  id uuid primary key default gen_random_uuid(),
  process_code text unique not null,
  process_name text not null,
  sort_order integer not null default 0,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_process_templates_sort on public.process_templates(sort_order);


-- =========================================================
-- 7. CHECKLIST TEMPLATES
-- Imported from checklist_templates_app_ready.csv
-- This is the master checklist library.
-- =========================================================

create table if not exists public.checklist_templates (
  id uuid primary key default gen_random_uuid(),
  template_code text unique,
  process_id uuid not null references public.process_templates(id),
  item_text text not null,
  original_text text,
  original_row_number integer,
  required boolean not null default true,
  risk_level priority_level not null default 'normal',
  default_role app_role not null default 'field_worker',
  sort_order integer not null default 0,
  needs_review boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_checklist_templates_process on public.checklist_templates(process_id);
create index if not exists idx_checklist_templates_sort on public.checklist_templates(process_id, sort_order);


-- =========================================================
-- 8. PROJECT CHECKLIST ITEMS
-- Actual checklist rows generated per project from templates.
-- =========================================================

create table if not exists public.project_checklist_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  template_id uuid references public.checklist_templates(id),
  process_id uuid not null references public.process_templates(id),
  item_text text not null,
  status checklist_status not null default 'not_started',
  assignee_id uuid references public.user_profiles(id),
  due_date date,
  memo text,
  issue_note text,
  checked_by uuid references public.user_profiles(id),
  checked_at timestamptz,
  sort_order integer not null default 0,
  created_by uuid references public.user_profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_project_checklist_project on public.project_checklist_items(project_id);
create index if not exists idx_project_checklist_process on public.project_checklist_items(process_id);
create index if not exists idx_project_checklist_status on public.project_checklist_items(status);
create index if not exists idx_project_checklist_assignee on public.project_checklist_items(assignee_id);

drop trigger if exists trg_project_checklist_items_updated_at on public.project_checklist_items;
create trigger trg_project_checklist_items_updated_at
before update on public.project_checklist_items
for each row execute function public.set_updated_at();


-- =========================================================
-- 9. TASK ASSIGNMENTS
-- Optional assignment history layer.
-- In MVP, assignee_id in project_checklist_items may be enough,
-- but this table preserves assignment changes.
-- =========================================================

create table if not exists public.task_assignments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  checklist_item_id uuid not null references public.project_checklist_items(id) on delete cascade,
  assignee_id uuid not null references public.user_profiles(id),
  assigned_by uuid references public.user_profiles(id),
  due_date date,
  status checklist_status not null default 'not_started',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_task_assignments_assignee on public.task_assignments(assignee_id);
create index if not exists idx_task_assignments_item on public.task_assignments(checklist_item_id);

drop trigger if exists trg_task_assignments_updated_at on public.task_assignments;
create trigger trg_task_assignments_updated_at
before update on public.task_assignments
for each row execute function public.set_updated_at();


-- =========================================================
-- 10. CHECKLIST PHOTOS
-- photo_url points to Supabase Storage path or signed URL path.
-- =========================================================

create table if not exists public.checklist_photos (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  checklist_item_id uuid references public.project_checklist_items(id) on delete cascade,
  issue_id uuid,
  process_id uuid references public.process_templates(id),
  photo_url text not null,
  storage_path text,
  caption text,
  uploaded_by uuid references public.user_profiles(id),
  uploaded_at timestamptz not null default now()
);

create index if not exists idx_checklist_photos_project on public.checklist_photos(project_id);
create index if not exists idx_checklist_photos_item on public.checklist_photos(checklist_item_id);
create index if not exists idx_checklist_photos_uploaded_by on public.checklist_photos(uploaded_by);


-- =========================================================
-- 11. ISSUE TICKETS
-- Created automatically or manually when checklist status is issue.
-- =========================================================

create table if not exists public.issue_tickets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  checklist_item_id uuid references public.project_checklist_items(id) on delete set null,
  process_id uuid references public.process_templates(id),
  title text not null,
  description text,
  priority priority_level not null default 'normal',
  status issue_status not null default 'needs_review',
  assignee_id uuid references public.user_profiles(id),
  due_date date,
  resolved_at timestamptz,
  created_by uuid references public.user_profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_issue_tickets_project on public.issue_tickets(project_id);
create index if not exists idx_issue_tickets_status on public.issue_tickets(status);
create index if not exists idx_issue_tickets_assignee on public.issue_tickets(assignee_id);

alter table public.checklist_photos
drop constraint if exists checklist_photos_issue_id_fkey;

alter table public.checklist_photos
add constraint checklist_photos_issue_id_fkey
foreign key (issue_id) references public.issue_tickets(id) on delete cascade;

drop trigger if exists trg_issue_tickets_updated_at on public.issue_tickets;
create trigger trg_issue_tickets_updated_at
before update on public.issue_tickets
for each row execute function public.set_updated_at();


-- =========================================================
-- 12. ACTIVITY LOGS
-- Critical for team-shared accountability.
-- =========================================================

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  user_id uuid references public.user_profiles(id),
  action_type activity_action not null,
  target_type text not null, -- project, checklist_item, issue, photo, assignment
  target_id uuid,
  before_value jsonb,
  after_value jsonb,
  memo text,
  created_at timestamptz not null default now()
);

create index if not exists idx_activity_logs_project on public.activity_logs(project_id);
create index if not exists idx_activity_logs_user on public.activity_logs(user_id);
create index if not exists idx_activity_logs_target on public.activity_logs(target_type, target_id);
create index if not exists idx_activity_logs_created_at on public.activity_logs(created_at desc);


-- =========================================================
-- 13. NOTIFICATIONS
-- App-internal notification. Kakao/SMS is excluded from MVP.
-- =========================================================

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  message text not null,
  link_path text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_notifications_user_unread on public.notifications(user_id, is_read);
create index if not exists idx_notifications_created_at on public.notifications(created_at desc);


-- =========================================================
-- 14. EXTERNAL TOOLS
-- MVP uses external product lookup link rather than internal product DB.
-- =========================================================

create table if not exists public.external_tools (
  id uuid primary key default gen_random_uuid(),
  tool_name text not null,
  tool_type text not null, -- product_lookup, material_lookup, etc.
  url text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.external_tools (tool_name, tool_type, url, is_active)
values ('가전·가구 조회', 'product_lookup', 'https://serene-buttercream-d97669.netlify.app/', true)
on conflict do nothing;


-- =========================================================
-- 15. PROGRESS VIEWS
-- =========================================================

create or replace view public.project_progress_view as
select
  p.id as project_id,
  p.project_name,
  count(i.id) as total_items,
  count(i.id) filter (where i.status = 'done') as done_items,
  count(i.id) filter (where i.status = 'issue') as issue_items,
  count(i.id) filter (where i.status = 'recheck_requested') as recheck_items,
  count(i.id) filter (where i.status in ('not_started', 'in_progress', 'on_hold', 'issue', 'recheck_requested')) as open_items,
  case 
    when count(i.id) = 0 then 0
    else round((count(i.id) filter (where i.status = 'done')::numeric / count(i.id)::numeric) * 100, 1)
  end as progress_percent
from public.projects p
left join public.project_checklist_items i on i.project_id = p.id
group by p.id, p.project_name;

create or replace view public.process_progress_view as
select
  i.project_id,
  pr.id as process_id,
  pr.process_name,
  pr.sort_order,
  count(i.id) as total_items,
  count(i.id) filter (where i.status = 'done') as done_items,
  count(i.id) filter (where i.status = 'issue') as issue_items,
  case 
    when count(i.id) = 0 then 0
    else round((count(i.id) filter (where i.status = 'done')::numeric / count(i.id)::numeric) * 100, 1)
  end as progress_percent
from public.project_checklist_items i
join public.process_templates pr on pr.id = i.process_id
group by i.project_id, pr.id, pr.process_name, pr.sort_order;


-- =========================================================
-- 16. RLS ENABLEMENT
-- Policies below are baseline; refine during implementation.
-- =========================================================

alter table public.user_profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.process_templates enable row level security;
alter table public.checklist_templates enable row level security;
alter table public.project_checklist_items enable row level security;
alter table public.task_assignments enable row level security;
alter table public.checklist_photos enable row level security;
alter table public.issue_tickets enable row level security;
alter table public.activity_logs enable row level security;
alter table public.notifications enable row level security;
alter table public.external_tools enable row level security;


-- Helper: user's global app role.
create or replace function public.current_app_role()
returns app_role
language sql
security definer
set search_path = public
as $$
  select role from public.user_profiles where id = auth.uid()
$$;

-- Helper: is project member.
create or replace function public.is_project_member(project_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.project_members pm
    where pm.project_id = project_uuid
      and pm.user_id = auth.uid()
      and pm.is_active = true
  )
  or public.current_app_role() in ('owner', 'office_admin')
$$;

-- Drop old policies if rerunning.
drop policy if exists "profiles_read_own_or_admin" on public.user_profiles;
drop policy if exists "profiles_update_own_or_admin" on public.user_profiles;
drop policy if exists "projects_member_select" on public.projects;
drop policy if exists "projects_admin_insert" on public.projects;
drop policy if exists "projects_admin_update" on public.projects;
drop policy if exists "project_members_select" on public.project_members;
drop policy if exists "project_members_admin_manage" on public.project_members;
drop policy if exists "templates_read_active" on public.process_templates;
drop policy if exists "checklist_templates_read_active" on public.checklist_templates;
drop policy if exists "checklist_items_member_select" on public.project_checklist_items;
drop policy if exists "checklist_items_member_update" on public.project_checklist_items;
drop policy if exists "photos_member_select" on public.checklist_photos;
drop policy if exists "photos_member_insert" on public.checklist_photos;
drop policy if exists "issues_member_select" on public.issue_tickets;
drop policy if exists "issues_member_insert" on public.issue_tickets;
drop policy if exists "issues_member_update" on public.issue_tickets;
drop policy if exists "logs_member_select" on public.activity_logs;
drop policy if exists "logs_member_insert" on public.activity_logs;
drop policy if exists "notifications_own_select" on public.notifications;
drop policy if exists "notifications_own_update" on public.notifications;
drop policy if exists "external_tools_read_active" on public.external_tools;

-- user_profiles
create policy "profiles_read_own_or_admin"
on public.user_profiles for select
using (
  id = auth.uid()
  or public.current_app_role() in ('owner', 'office_admin')
);

create policy "profiles_update_own_or_admin"
on public.user_profiles for update
using (
  id = auth.uid()
  or public.current_app_role() in ('owner', 'office_admin')
);

-- projects
create policy "projects_member_select"
on public.projects for select
using (public.is_project_member(id));

create policy "projects_admin_insert"
on public.projects for insert
with check (public.current_app_role() in ('owner', 'office_admin'));

create policy "projects_admin_update"
on public.projects for update
using (
  public.current_app_role() in ('owner', 'office_admin')
  or exists (
    select 1 from public.project_members pm
    where pm.project_id = projects.id
      and pm.user_id = auth.uid()
      and pm.role_in_project in ('site_manager')
      and pm.is_active = true
  )
);

-- project_members
create policy "project_members_select"
on public.project_members for select
using (public.is_project_member(project_id));

create policy "project_members_admin_manage"
on public.project_members for all
using (public.current_app_role() in ('owner', 'office_admin'))
with check (public.current_app_role() in ('owner', 'office_admin'));

-- process_templates
create policy "templates_read_active"
on public.process_templates for select
using (is_active = true or public.current_app_role() in ('owner', 'office_admin'));

-- checklist_templates
create policy "checklist_templates_read_active"
on public.checklist_templates for select
using (is_active = true or public.current_app_role() in ('owner', 'office_admin'));

-- project_checklist_items
create policy "checklist_items_member_select"
on public.project_checklist_items for select
using (public.is_project_member(project_id));

create policy "checklist_items_member_update"
on public.project_checklist_items for update
using (
  public.current_app_role() in ('owner', 'office_admin')
  or exists (
    select 1 from public.project_members pm
    where pm.project_id = project_checklist_items.project_id
      and pm.user_id = auth.uid()
      and pm.is_active = true
      and (
        pm.role_in_project in ('site_manager')
        or project_checklist_items.assignee_id = auth.uid()
      )
  )
);

-- photos
create policy "photos_member_select"
on public.checklist_photos for select
using (public.is_project_member(project_id));

create policy "photos_member_insert"
on public.checklist_photos for insert
with check (public.is_project_member(project_id));

-- issues
create policy "issues_member_select"
on public.issue_tickets for select
using (public.is_project_member(project_id));

create policy "issues_member_insert"
on public.issue_tickets for insert
with check (public.is_project_member(project_id));

create policy "issues_member_update"
on public.issue_tickets for update
using (public.is_project_member(project_id));

-- activity logs
create policy "logs_member_select"
on public.activity_logs for select
using (project_id is null or public.is_project_member(project_id));

create policy "logs_member_insert"
on public.activity_logs for insert
with check (user_id = auth.uid());

-- notifications
create policy "notifications_own_select"
on public.notifications for select
using (user_id = auth.uid());

create policy "notifications_own_update"
on public.notifications for update
using (user_id = auth.uid());

-- external tools
create policy "external_tools_read_active"
on public.external_tools for select
using (is_active = true);


-- =========================================================
-- END
-- =========================================================
