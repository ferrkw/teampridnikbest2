import { Activity, TrendingUp, Users, Trophy, Award } from 'lucide-react';
import type { Player, Match } from '@/lib/supabase';

interface Props {
  players: Player[];
  matches: Match[];
}

export function Hero({ players, matches }: Props) {
  const wins = matches.filter((m) => m.result === 'win').length;
  const totalMatches = matches.length;
  const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;
  const avgKd =
    players.length > 0
      ? (players.reduce((sum, p) => sum + p.kd_ratio, 0) / players.length).toFixed(2)
      : '0.00';
  const topPlayer = [...players].sort((a, b) => (b.world_rank ?? 999) - (a.world_rank ?? 999)).reverse()[0];
  const totalPts = players.reduce((sum, p) => sum + p.pts, 0);
  const upcomingMatch = matches[0];

  return (
    <section id="overview" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 radial-glow" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
      <div className="absolute top-1/4 left-0 h-32 w-32 rounded-full bg-accent-500/10 blur-[80px]" />
      <div className="absolute bottom-1/4 right-0 h-40 w-40 rounded-full bg-ember-500/8 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-accent-500/10 border border-accent-500/25 rounded clip-tag">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse" />
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent-400 uppercase">
                Season 2026 — Active
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] text-balance">
              Team Pridnik
              <span className="block text-slate-450 text-2xl sm:text-3xl lg:text-4xl font-normal mt-3 tracking-tight">
                Tactical Command Center
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base sm:text-lg text-slate-350 leading-relaxed">
              Official operations hub for the Pridnik esports organization. Live roster
              statistics, match archives, and team intelligence — all in one tactical interface.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#roster"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 text-ink-950 font-semibold text-sm rounded clip-tag hover:bg-accent-400 transition-colors"
              >
                <Users className="h-4 w-4" />
                View Roster
              </a>
              <a
                href="#matches"
                className="inline-flex items-center gap-2 px-6 py-3 border border-ink-600 text-slate-200 font-semibold text-sm rounded clip-tag hover:border-accent-500/40 hover:text-white transition-colors"
              >
                <Trophy className="h-4 w-4" />
                Match Archive
              </a>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-200 space-y-3">
            <StatCard
              icon={<TrendingUp className="h-4 w-4" />}
              label="Win Rate"
              value={`${winRate}%`}
              sub={`${wins}W — ${totalMatches - wins}L`}
            />
            <StatCard
              icon={<Activity className="h-4 w-4" />}
              label="Avg. KDA"
              value={avgKd}
              sub={`${players.length} active players`}
            />
            <StatCard
              icon={<Award className="h-4 w-4" />}
              label="Team PTS"
              value={totalPts.toLocaleString()}
              sub={topPlayer ? `#${topPlayer.world_rank} ${topPlayer.nickname} leads` : ''}
            />
            <StatCard
              icon={<Trophy className="h-4 w-4" />}
              label="Last Match"
              value={upcomingMatch ? (upcomingMatch.result === 'win' ? 'VICTORY' : 'DEFEAT') : '—'}
              sub={upcomingMatch ? `${upcomingMatch.opponent} — ${upcomingMatch.map}` : 'No matches yet'}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-600 to-transparent" />
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="group relative bg-ink-900/60 border border-ink-700 rounded p-5 backdrop-blur-sm hover:border-accent-500/30 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-[0.18em] text-slate-450 uppercase">
          {label}
        </span>
        <span className="text-accent-400/70 group-hover:text-accent-400 transition-colors">
          {icon}
        </span>
      </div>
      <div className="font-mono text-3xl font-bold text-white tracking-tight">{value}</div>
      <div className="mt-1.5 text-xs text-slate-450">{sub}</div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-0.5 bg-accent-500/40" />
    </div>
  );
}
