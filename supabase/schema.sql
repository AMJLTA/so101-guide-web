-- ============================================================================
-- SO101 社区 — 数据库 schema
-- ============================================================================
-- 在 Supabase 控制台 → SQL Editor 里整段粘贴运行一次即可。
-- 重复运行安全（用了 if not exists / or replace）。
-- ============================================================================

-- 1. 用户资料表 ------------------------------------------------------------
-- 每个 auth.users 对应一行 profile。username / avatar 由注册时的触发器填充。

create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  username    text unique not null,
  avatar_url  text,
  bio         text,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are viewable by everyone" on public.profiles;
create policy "profiles are viewable by everyone"
  on public.profiles for select using (true);

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- 注册时自动创建 profile，用户名优先取 GitHub 用户名，否则用 user_前8位id
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'user_name',
      new.raw_user_meta_data->>'preferred_username',
      'user_' || substr(new.id::text, 1, 8)
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. 评论 / 讨论表 ---------------------------------------------------------
-- thread_key 形如 'chapter:1'、'error:cuda out of memory'。
-- parent_id 预留给将来的楼中楼（v1 前端按时间平铺渲染）。

create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  thread_key  text not null,
  author_id   uuid not null references public.profiles(id) on delete cascade,
  body        text not null check (char_length(body) between 1 and 5000),
  parent_id   uuid references public.comments(id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists comments_thread_idx
  on public.comments (thread_key, created_at);

alter table public.comments enable row level security;

drop policy if exists "comments are viewable by everyone" on public.comments;
create policy "comments are viewable by everyone"
  on public.comments for select using (true);

drop policy if exists "authenticated users can insert own comments" on public.comments;
create policy "authenticated users can insert own comments"
  on public.comments for insert with check (auth.uid() = author_id);

drop policy if exists "users can update own comments" on public.comments;
create policy "users can update own comments"
  on public.comments for update using (auth.uid() = author_id);

drop policy if exists "users can delete own comments" on public.comments;
create policy "users can delete own comments"
  on public.comments for delete using (auth.uid() = author_id);


-- 3. 点赞表 ----------------------------------------------------------------

create table if not exists public.comment_votes (
  comment_id  uuid not null references public.comments(id) on delete cascade,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (comment_id, user_id)
);

alter table public.comment_votes enable row level security;

drop policy if exists "votes are viewable by everyone" on public.comment_votes;
create policy "votes are viewable by everyone"
  on public.comment_votes for select using (true);

drop policy if exists "users can vote" on public.comment_votes;
create policy "users can vote"
  on public.comment_votes for insert with check (auth.uid() = user_id);

drop policy if exists "users can unvote" on public.comment_votes;
create policy "users can unvote"
  on public.comment_votes for delete using (auth.uid() = user_id);


-- 4. 带点赞数 + 作者信息的视图（前端一次查询拿全） ------------------------

create or replace view public.comments_with_meta as
select
  c.*,
  p.username      as author_username,
  p.avatar_url    as author_avatar_url,
  coalesce(v.cnt, 0) as like_count
from public.comments c
join public.profiles p on p.id = c.author_id
left join (
  select comment_id, count(*)::int as cnt
  from public.comment_votes
  group by comment_id
) v on v.comment_id = c.id;

-- 视图继承底表的 RLS（security_invoker），保证读权限一致
alter view public.comments_with_meta set (security_invoker = true);


-- 5.（可选）每个 thread 的评论数，给学习页徽章用 ------------------------

create or replace view public.thread_counts as
select thread_key, count(*)::int as comment_count
from public.comments
group by thread_key;

alter view public.thread_counts set (security_invoker = true);
