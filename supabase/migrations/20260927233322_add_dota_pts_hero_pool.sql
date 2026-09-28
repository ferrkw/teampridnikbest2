/*
# Add Dota 2 PTS, world rank, hero pool

1. Modified Tables
- `players`: add `pts` (integer, Dota 2 points), `world_rank` (integer, world ranking by PTS), `dota_role` (text, Dota 2 position).
- `players`: change role/country to match Dota 2 context (updated via DML, not DDL).
2. New Tables
- `hero_pool`: per-player hero pool with hero name, hero emoji/icon, games played, win rate, KDA.
3. Security
- `hero_pool`: RLS enabled, anon + authenticated full CRUD (single-tenant public data).
*/

ALTER TABLE players ADD COLUMN IF NOT EXISTS pts integer NOT NULL DEFAULT 0;
ALTER TABLE players ADD COLUMN IF NOT EXISTS world_rank integer;
ALTER TABLE players ADD COLUMN IF NOT EXISTS dota_role text;

CREATE TABLE IF NOT EXISTS hero_pool (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  hero_name text NOT NULL,
  hero_emoji text NOT NULL DEFAULT '⚔️',
  games_played integer NOT NULL DEFAULT 0,
  win_rate integer NOT NULL DEFAULT 0,
  kda numeric(4,2) NOT NULL DEFAULT 0.00,
  signature boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hero_pool ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_hero_pool" ON hero_pool;
CREATE POLICY "anon_select_hero_pool" ON hero_pool FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_hero_pool" ON hero_pool;
CREATE POLICY "anon_insert_hero_pool" ON hero_pool FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_hero_pool" ON hero_pool;
CREATE POLICY "anon_update_hero_pool" ON hero_pool FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_hero_pool" ON hero_pool;
CREATE POLICY "anon_delete_hero_pool" ON hero_pool FOR DELETE TO anon, authenticated USING (true);
