/*
# Add Steam persona name and MMR columns to players

1. New Columns
- `steam_persona` (text) — current Steam/Dota display name from OpenDota API
- `steam_mmr` (integer) — computed MMR from OpenDota API
- `steam_rank_tier` (integer) — rank tier from OpenDota API (e.g. 21 = Legend, 12 = Crusader)
- `steam_avatar` (text) — full-size Steam avatar URL from OpenDota API
- `steam_wins` (integer) — match wins from OpenDota API
- `steam_losses` (integer) — match losses from OpenDota API
2. Modified Tables
- `players` — adds the columns above (all nullable, since not all players expose match data)
3. Security
- No RLS changes. Existing policies remain unchanged.
*/

ALTER TABLE players
  ADD COLUMN IF NOT EXISTS steam_persona text,
  ADD COLUMN IF NOT EXISTS steam_mmr integer,
  ADD COLUMN IF NOT EXISTS steam_rank_tier integer,
  ADD COLUMN IF NOT EXISTS steam_avatar text,
  ADD COLUMN IF NOT EXISTS steam_wins integer,
  ADD COLUMN IF NOT EXISTS steam_losses integer;