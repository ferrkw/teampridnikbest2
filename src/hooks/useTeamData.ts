import { useEffect, useState } from 'react';
import { supabase, type Player, type Match, type NewsArticle, type HeroPoolEntry } from '@/lib/supabase';
import { fetchOpenDotaPlayer } from '@/lib/opendota';

export function useTeamData() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [heroPool, setHeroPool] = useState<HeroPoolEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [p, m, n, h] = await Promise.all([
        supabase.from('players').select('*').order('sort_order', { ascending: true }),
        supabase.from('matches').select('*').order('match_date', { ascending: false }),
        supabase.from('news').select('*').order('published_at', { ascending: false }),
        supabase.from('hero_pool').select('*').order('games_played', { ascending: false }),
      ]);

      if (cancelled) return;

      if (p.error || m.error || n.error || h.error) {
        setError(p.error?.message || m.error?.message || n.error?.message || h.error?.message || 'Failed to load data');
      } else {
        const enrichedPlayers = await Promise.all(
          (p.data as Player[]).map(async (player) => {
            if (!player.steam_id) return player;

            const steamData = await fetchOpenDotaPlayer(player.steam_id);

            if (!steamData) return player;

            return {
              ...player,
              steam_persona: steamData.steam_persona ?? player.steam_persona,
              steam_avatar: steamData.steam_avatar ?? player.steam_avatar,
              steam_mmr: steamData.steam_mmr ?? player.steam_mmr,
              steam_rank_tier: steamData.steam_rank_tier ?? player.steam_rank_tier,
              steam_wins: steamData.steam_wins ?? player.steam_wins,
              steam_losses: steamData.steam_losses ?? player.steam_losses,
              win_rate: steamData.win_rate ?? player.win_rate,
              matches_played: steamData.matches_played ?? player.matches_played,
            };
          })
        );

        setPlayers(enrichedPlayers);
        setMatches(m.data as Match[]);
        setNews(n.data as NewsArticle[]);
        setHeroPool(h.data as HeroPoolEntry[]);
      }

      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { players, matches, news, heroPool, loading, error };
}
