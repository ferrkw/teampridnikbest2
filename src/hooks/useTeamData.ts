import { useEffect, useState } from 'react';
import { supabase, type Player, type Match, type NewsArticle, type HeroPoolEntry } from '@/lib/supabase';

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
        setPlayers(p.data as Player[]);
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
