-- TARA Training Platform Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Users table (email as primary identifier - NO AUTH)
create table if not exists users (
  email text primary key,
  display_name text,
  current_module_id text,
  current_task_id text,
  last_active_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Modules (static curriculum - seeded from this file)
create table if not exists modules (
  id text primary key,
  title text not null,
  description text,
  order_index int,
  task_count int,
  shield_segment text,
  prerequisites text[]
);

-- Tasks within modules
create table if not exists tasks (
  id text primary key,
  module_id text references modules(id),
  title text not null,
  instructions text,
  why_it_matters text,
  tips text[],
  tara_deep_link text,
  order_index int,
  verification_type text,
  verification_config jsonb,
  xp_reward int default 10
);

-- User progress per module
-- Note: module_id is NOT a foreign key because modules are managed as static content in code
create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_email text references users(email) on delete cascade,
  module_id text not null,
  status text default 'not_started',
  started_at timestamptz,
  completed_at timestamptz,
  time_spent_seconds int default 0,
  unique(user_email, module_id)
);

-- Task completions
-- Note: task_id is NOT a foreign key because tasks are managed as static content in code
create table if not exists task_completions (
  id uuid primary key default gen_random_uuid(),
  user_email text references users(email) on delete cascade,
  task_id text not null,
  completed_at timestamptz default now(),
  verification_method text,
  xp_earned int,
  unique(user_email, task_id)
);

-- Assessment results
create table if not exists assessment_results (
  id uuid primary key default gen_random_uuid(),
  user_email text references users(email) on delete cascade,
  assessment_type text,
  score int,
  total_questions int,
  answers jsonb,
  time_taken_seconds int,
  created_at timestamptz default now()
);

-- Gamification stats
create table if not exists user_gamification (
  user_email text primary key references users(email) on delete cascade,
  total_xp int default 0,
  current_streak int default 0,
  longest_streak int default 0,
  last_activity_date date,
  shield_segments_unlocked text[],
  badges_earned text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Badges catalog (static)
create table if not exists badges (
  id text primary key,
  name text not null,
  description text,
  icon_url text,
  criteria jsonb
);

-- Disable RLS for simplicity (no auth, public access)
alter table users enable row level security;
alter table modules enable row level security;
alter table tasks enable row level security;
alter table user_progress enable row level security;
alter table task_completions enable row level security;
alter table assessment_results enable row level security;
alter table user_gamification enable row level security;
alter table badges enable row level security;

-- Create policies for public access (anon key)
create policy "Allow all for users" on users for all using (true);
create policy "Allow all for modules" on modules for all using (true);
create policy "Allow all for tasks" on tasks for all using (true);
create policy "Allow all for user_progress" on user_progress for all using (true);
create policy "Allow all for task_completions" on task_completions for all using (true);
create policy "Allow all for assessment_results" on assessment_results for all using (true);
create policy "Allow all for user_gamification" on user_gamification for all using (true);
create policy "Allow all for badges" on badges for all using (true);

-- Seed initial module data
insert into modules (id, title, description, order_index, task_count, shield_segment, prerequisites) values
  ('initial-onboarding', 'Initial Onboarding', 'Get comfortable with the TARA platform interface and navigation.', 1, 4, 'orientation', '{}'),
  ('project-setup', 'Project Setup', 'Learn to create and configure TARA projects for threat analysis.', 2, 3, 'project-setup', '{"initial-onboarding"}'),
  ('document-management', 'Document Management', 'Upload and manage specification documents for AI analysis.', 3, 3, 'documents', '{"project-setup"}'),
  ('architecture-modeling', 'Architecture Modeling', 'Build system architecture with zones, components, and data flows.', 4, 5, 'architecture', '{"document-management"}'),
  ('asset-identification', 'Asset Identification', 'Identify and classify data assets that need protection.', 5, 3, 'assets', '{"architecture-modeling"}'),
  ('threat-generation', 'Threat Generation', 'Generate and review STRIDE threat scenarios using AI.', 6, 5, 'threats', '{"asset-identification"}'),
  ('attack-path-analysis', 'Attack Path Analysis', 'Understand how attackers chain steps to reach targets.', 7, 3, 'attack-paths', '{"threat-generation"}'),
  ('risk-assessment', 'Risk Assessment', 'Calculate risk using ISO 18045 exploitability scoring.', 8, 4, 'risks', '{"attack-path-analysis"}'),
  ('mitigation-planning', 'Mitigation Planning', 'Plan security controls to address identified risks.', 9, 4, 'mitigations', '{"risk-assessment"}'),
  ('requirements-generation', 'Requirements Generation', 'Generate verifiable security requirements from mitigations.', 10, 4, 'requirements', '{"mitigation-planning"}'),
  ('sbom-vulnerability', 'SBOM & Vulnerabilities', 'Manage SBOM packages and triage CVE vulnerabilities.', 11, 5, 'sbom', '{"requirements-generation"}'),
  ('compliance-verification', 'Compliance & Verification', 'Apply compliance packs and run verification checks.', 12, 4, 'compliance', '{"sbom-vulnerability"}'),
  ('report-generation', 'Report Generation', 'Generate regulatory compliance reports for FDA, EU CRA.', 13, 3, 'reports', '{"compliance-verification"}')
on conflict (id) do nothing;

-- Seed badges
insert into badges (id, name, description, criteria) values
  ('first-module', 'First Steps', 'Complete your first module', '{"type": "module_complete", "value": 1}'),
  ('halfway', 'Halfway There', 'Complete 50% of all modules', '{"type": "module_complete", "value": 7}'),
  ('completionist', 'Security Master', 'Complete all modules', '{"type": "module_complete", "value": 13}'),
  ('speed-runner', 'Speed Runner', 'Complete a module in under 15 minutes', '{"type": "time_challenge", "value": 900}'),
  ('streak-3', 'Getting Consistent', 'Maintain a 3-day learning streak', '{"type": "streak", "value": 3}'),
  ('streak-7', 'Week Warrior', 'Maintain a 7-day learning streak', '{"type": "streak", "value": 7}'),
  ('xp-500', 'XP Hunter', 'Earn 500 XP', '{"type": "xp", "value": 500}'),
  ('xp-1000', 'XP Master', 'Earn 1000 XP', '{"type": "xp", "value": 1000}')
on conflict (id) do nothing;
