/*
# Team Command Center — players, matches, news

1. New Tables
- `players`: roster with role, country, stats (KD, win rate, matches, rating), bio, avatar, socials.
- `matches`: match archive with opponent, event, date, scores, result, map, format.
- `news`: team news articles with title, excerpt, content, category, date, author.
2. Security
- Single-tenant, no auth. RLS enabled on all tables.
- anon + authenticated have full CRUD (data is intentionally public/shared).
*/

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname text NOT NULL,
  real_name text,
  role text NOT NULL,
  country text NOT NULL,
  country_code text NOT NULL,
  avatar_url text,
  kd_ratio numeric(4,2) NOT NULL DEFAULT 1.00,
  win_rate integer NOT NULL DEFAULT 50,
  matches_played integer NOT NULL DEFAULT 0,
  rating numeric(3,1) NOT NULL DEFAULT 1.0,
  bio text,
  twitter_url text,
  twitch_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_players" ON players;
CREATE POLICY "anon_select_players" ON players FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_players" ON players;
CREATE POLICY "anon_insert_players" ON players FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_players" ON players;
CREATE POLICY "anon_update_players" ON players FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_players" ON players;
CREATE POLICY "anon_delete_players" ON players FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opponent text NOT NULL,
  event text NOT NULL,
  match_date date NOT NULL,
  team_score integer NOT NULL DEFAULT 0,
  opponent_score integer NOT NULL DEFAULT 0,
  result text NOT NULL CHECK (result IN ('win','loss','draw')),
  map text,
  format text,
  stage text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_matches" ON matches;
CREATE POLICY "anon_select_matches" ON matches FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_matches" ON matches;
CREATE POLICY "anon_insert_matches" ON matches FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_matches" ON matches;
CREATE POLICY "anon_update_matches" ON matches FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_matches" ON matches;
CREATE POLICY "anon_delete_matches" ON matches FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text,
  category text NOT NULL DEFAULT 'Team',
  author text,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_news" ON news;
CREATE POLICY "anon_select_news" ON news FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_news" ON news;
CREATE POLICY "anon_insert_news" ON news FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_news" ON news;
CREATE POLICY "anon_update_news" ON news FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_news" ON news;
CREATE POLICY "anon_delete_news" ON news FOR DELETE TO anon, authenticated USING (true);
