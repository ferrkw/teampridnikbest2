import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export interface Player {
  id: string;
  nickname: string;
  real_name: string | null;
  role: string;
  dota_role: string | null;
  country: string;
  country_code: string;
  avatar_url: string | null;
  kd_ratio: number;
  win_rate: number;
  matches_played: number;
  rating: number;
  pts: number;
  world_rank: number | null;
  bio: string | null;
  twitter_url: string | null;
  twitch_url: string | null;
  sort_order: number;
  created_at: string;
  steam_id: string | null;
  steam_persona: string | null;
  steam_mmr: number | null;
  steam_rank_tier: number | null;
  steam_avatar: string | null;
  steam_wins: number | null;
  steam_losses: number | null;
}

export interface HeroPoolEntry {
  id: string;
  player_id: string;
  hero_name: string;
  hero_emoji: string;
  games_played: number;
  win_rate: number;
  kda: number;
  signature: boolean;
  created_at: string;
}

export interface Match {
  id: string;
  opponent: string;
  event: string;
  match_date: string;
  team_score: number;
  opponent_score: number;
  result: 'win' | 'loss' | 'draw';
  map: string | null;
  format: string | null;
  stage: string | null;
  created_at: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  category: string;
  author: string | null;
  published_at: string;
  created_at: string;
}
