import { Swords, Shield, Eye, Crown, Globe, Twitter, Twitch, Star, Trophy } from 'lucide-react';
import type { Player } from '@/lib/supabase';

interface Props {
  players: Player[];
  loading: boolean;
}

const roleIcons: Record<string, React.ReactNode> = {
  'Carry': <Swords className="h-4 w-4" />,
  'Mid': <Crown className="h-4 w-4" />,
  'Offlane': <Shield className="h-4 w-4" />,
  'Soft Support': <Eye className="h-4 w-4" />,
  'Hard Support': <Star className="h-4 w-4" />,
};

function getInitials(nickname: string) {
  return nickname.slice(0, 2).toUpperCase();
}

export function Roster({ players, loading }: Props) {
  return (
    <section id="roster" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          tag="01 / ROSTER"
          title="Active Lineup"
          subtitle="Five players. One Ancient. Meet the operators behind Pridnik's Dota 2 dominance."
        />

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-80 bg-ink-850 border border-ink-700 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {players.map((player, i) => (
              <PlayerCard key={player.id} player={player} delay={i * 80} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PlayerCard({ player, delay }: { player: Player; delay: number }) {
  const icon = roleIcons[player.role] || <Swords className="h-4 w-4" />;
  const isTopRanked = player.world_rank !== null && player.world_rank <= 3;

  return (
    <div
      className="group relative bg-ink-900 border border-ink-700 rounded overflow-hidden hover:border-accent-500/40 transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="relative h-28 bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-accent-500/10 blur-2xl group-hover:bg-accent-500/20 transition-colors" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-ink-950/60 border border-ink-700 rounded text-accent-400">
          {icon}
          <span className="font-mono text-[9px] tracking-wider uppercase">{player.role}</span>
        </div>
        {isTopRanked && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-accent-500/15 border border-accent-500/40 rounded text-accent-400">
            <Trophy className="h-3 w-3" />
            <span className="font-mono text-[9px] tracking-wider">TOP {player.world_rank}</span>
          </div>
        )}
      </div>

      <div className="px-5 pb-5 -mt-12 relative">
        <div className="flex items-end justify-between mb-4">
          <div className="flex h-16 w-16 items-center justify-center bg-ink-850 border-2 border-ink-700 group-hover:border-accent-500/50 rounded overflow-hidden transition-colors">
            {player.avatar_url ? (
              <img
                src={player.avatar_url}
                alt={player.nickname}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-mono text-xl font-bold text-accent-400">
                {getInitials(player.nickname)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-slate-450">
            <Globe className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] tracking-wider">{player.country_code}</span>
          </div>
        </div>

        <h3 className="font-mono text-lg font-bold text-white tracking-tight">{player.nickname}</h3>
        <p className="text-xs text-slate-450 mt-0.5">{player.real_name}</p>
        {player.dota_role && (
          <p className="text-[10px] text-accent-400/70 font-mono mt-1 tracking-wide">{player.dota_role}</p>
        )}

        {/* PTS & World Rank — prominent display */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-accent-500/8 border border-accent-500/20 rounded p-3 text-center">
            <div className="font-mono text-xl font-bold text-accent-400 tabular-nums">
              {player.pts.toLocaleString()}
            </div>
            <div className="font-mono text-[8px] tracking-wider text-accent-400/60 uppercase mt-0.5">PTS</div>
          </div>
          <div className={`rounded p-3 text-center border ${isTopRanked ? 'bg-accent-500/8 border-accent-500/20' : 'bg-ink-850/60 border-ink-700/50'}`}>
            <div className={`font-mono text-xl font-bold tabular-nums ${isTopRanked ? 'text-accent-400' : 'text-white'}`}>
              #{player.world_rank ?? '—'}
            </div>
            <div className="font-mono text-[8px] tracking-wider text-slate-450 uppercase mt-0.5">WORLD RANK</div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <Stat label="KDA" value={player.kd_ratio.toFixed(2)} />
          <Stat label="WIN%" value={`${player.win_rate}`} />
          <Stat label="GAMES" value={`${player.matches_played}`} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          {player.twitter_url && (
            <a
              href={player.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center border border-ink-600 rounded text-slate-350 hover:text-accent-400 hover:border-accent-500/40 transition-colors"
              aria-label={`${player.nickname} on Twitter`}
            >
              <Twitter className="h-3.5 w-3.5" />
            </a>
          )}
          {player.twitch_url && (
            <a
              href={player.twitch_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center border border-ink-600 rounded text-slate-350 hover:text-accent-400 hover:border-accent-500/40 transition-colors"
              aria-label={`${player.nickname} on Twitch`}
            >
              <Twitch className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-500/0 group-hover:bg-accent-500/60 transition-colors" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink-850/60 border border-ink-700/50 rounded py-2">
      <div className="font-mono text-sm font-bold text-white">{value}</div>
      <div className="font-mono text-[8px] tracking-wider text-slate-450 uppercase mt-0.5">{label}</div>
    </div>
  );
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <div className="font-mono text-xs tracking-[0.2em] text-accent-400/70 mb-3">{tag}</div>
      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h2>
      <p className="mt-3 text-slate-350 text-base leading-relaxed">{subtitle}</p>
    </div>
  );
}
