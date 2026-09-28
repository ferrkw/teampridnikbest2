import { useState } from 'react';
import { Swords, Star, ChevronDown, ChevronUp } from 'lucide-react';
import type { Player, HeroPoolEntry } from '@/lib/supabase';

interface Props {
  players: Player[];
  heroPool: HeroPoolEntry[];
  loading: boolean;
}

export function HeroesPool({ players, heroPool, loading }: Props) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [expandedAll, setExpandedAll] = useState(true);

  if (loading) {
    return (
      <section id="heroes" className="relative py-24 lg:py-32 bg-ink-900/30">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="font-mono text-xs tracking-[0.2em] text-accent-400/70 mb-3">02 / HERO POOL</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-10">Hero Pool</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-48 bg-ink-850 border border-ink-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const activePlayerId = selectedPlayer || (players[0]?.id ?? null);
  const activePlayer = players.find((p) => p.id === activePlayerId) || null;
  const activeHeroes = heroPool.filter((h) => h.player_id === activePlayerId);

  return (
    <section id="heroes" className="relative py-24 lg:py-32 bg-ink-900/30">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <div className="font-mono text-xs tracking-[0.2em] text-accent-400/70 mb-3">02 / HERO POOL</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Hero Pool</h2>
          <p className="mt-3 text-slate-350 text-base leading-relaxed">
            Signature heroes and most-played picks for each Pridnik operator. Click a player to view their pool.
          </p>
        </div>

        {/* Player selector tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {players.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlayer(p.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded font-mono text-sm transition-all ${
                activePlayerId === p.id
                  ? 'bg-accent-500 text-ink-950 font-bold'
                  : 'bg-ink-900 border border-ink-700 text-slate-350 hover:border-accent-500/30 hover:text-white'
              }`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded overflow-hidden ${activePlayerId === p.id ? 'ring-1 ring-ink-950/30' : ''}`}>
                {p.avatar_url ? (
                  <img src={p.avatar_url} alt={p.nickname} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-mono text-[10px] font-bold text-accent-400">
                    {p.nickname.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </span>
              {p.nickname}
              <span className={`font-mono text-[10px] ${activePlayerId === p.id ? 'text-ink-950/60' : 'text-slate-450'}`}>
                #{p.world_rank}
              </span>
            </button>
          ))}
        </div>

        {/* Active player hero pool */}
        {activePlayer && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-ink-850 border border-accent-500/30 rounded overflow-hidden">
                  {activePlayer.avatar_url ? (
                    <img src={activePlayer.avatar_url} alt={activePlayer.nickname} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-mono text-sm font-bold text-accent-400">
                      {activePlayer.nickname.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-mono text-lg font-bold text-white">{activePlayer.nickname}'s Hero Pool</h3>
                  <p className="text-xs text-slate-450">{activePlayer.dota_role}</p>
                </div>
              </div>
              <button
                onClick={() => setExpandedAll(!expandedAll)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono tracking-wider text-slate-350 hover:text-white border border-ink-700 rounded transition-colors"
              >
                {expandedAll ? 'COLLAPSE' : 'EXPAND'}
                {expandedAll ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {activeHeroes.map((hero, i) => (
                <HeroCard key={hero.id} hero={hero} delay={i * 60} />
              ))}
            </div>
          </div>
        )}

        {/* All players overview — compact grid */}
        {expandedAll && (
          <div className="mt-12 pt-8 border-t border-ink-700">
            <div className="flex items-center gap-2 mb-6">
              <Swords className="h-4 w-4 text-accent-400/60" />
              <h3 className="font-mono text-xs tracking-[0.18em] text-slate-350 uppercase">All Players — Signature Heroes</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {players.map((p) => {
                const sigs = heroPool.filter((h) => h.player_id === p.id && h.signature);
                return (
                  <div key={p.id} className="bg-ink-900 border border-ink-700 rounded p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded overflow-hidden border border-ink-700">
                        {p.avatar_url ? (
                          <img src={p.avatar_url} alt={p.nickname} className="h-full w-full object-cover" />
                        ) : (
                          <span className="font-mono text-[10px] font-bold text-accent-400">
                            {p.nickname.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-sm font-bold text-white">{p.nickname}</span>
                      <Star className="h-3 w-3 text-accent-400 ml-auto" />
                    </div>
                    <div className="space-y-1.5">
                      {sigs.map((h) => (
                        <div key={h.id} className="flex items-center gap-2 text-xs">
                          <span className="text-lg leading-none">{h.hero_emoji}</span>
                          <span className="text-slate-200 truncate">{h.hero_name}</span>
                          <span className="ml-auto font-mono text-[10px] text-accent-400 tabular-nums">{h.win_rate}%</span>
                        </div>
                      ))}
                      {sigs.length === 0 && (
                        <p className="text-xs text-slate-450 italic">No signature heroes</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function HeroCard({ hero, delay }: { hero: HeroPoolEntry; delay: number }) {
  return (
    <div
      className={`group relative bg-ink-900 border rounded p-4 transition-all duration-300 animate-fade-up ${
        hero.signature ? 'border-accent-500/30 hover:border-accent-500/60' : 'border-ink-700 hover:border-accent-500/20'
      }`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {hero.signature && (
        <div className="absolute top-2 right-2 flex items-center gap-1 text-accent-400">
          <Star className="h-3 w-3 fill-accent-400" />
        </div>
      )}

      <div className="text-3xl mb-3">{hero.hero_emoji}</div>
      <h4 className="text-sm font-bold text-white leading-tight mb-3 pr-4">{hero.hero_name}</h4>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] text-slate-450 uppercase tracking-wider">Games</span>
          <span className="font-mono font-bold text-white tabular-nums">{hero.games_played}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] text-slate-450 uppercase tracking-wider">Win Rate</span>
          <span className="font-mono font-bold text-accent-400 tabular-nums">{hero.win_rate}%</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] text-slate-450 uppercase tracking-wider">KDA</span>
          <span className="font-mono font-bold text-white tabular-nums">{hero.kda.toFixed(2)}</span>
        </div>
      </div>

      {/* Win rate bar */}
      <div className="mt-3 h-1 bg-ink-850 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-600 to-accent-400 rounded-full transition-all duration-700"
          style={{ width: `${hero.win_rate}%` }}
        />
      </div>

      {hero.signature && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-500/40" />
      )}
    </div>
  );
}
