import { BarChart3, TrendingUp, Target, Flame, Award } from 'lucide-react';
import type { Player, Match } from '@/lib/supabase';

interface Props {
  players: Player[];
  matches: Match[];
}

export function Stats({ players, matches }: Props) {
  const wins = matches.filter((m) => m.result === 'win').length;
  const losses = matches.filter((m) => m.result === 'loss').length;
  const winRate = matches.length > 0 ? Math.round((wins / matches.length) * 100) : 0;
  const topFragger = [...players].sort((a, b) => b.kd_ratio - a.kd_ratio)[0];
  const topPtsPlayer = [...players].sort((a, b) => b.pts - a.pts)[0];
  const bestMap = getBestSide(matches);
  const currentStreak = getStreak(matches);
  const totalPts = players.reduce((sum, p) => sum + p.pts, 0);

  const chartData = players.map((p) => ({
    name: p.nickname,
    kd: p.kd_ratio,
    winRate: p.win_rate,
  }));
  const maxKd = Math.max(...chartData.map((d) => d.kd), 8);

  return (
    <section id="stats" className="relative py-24 lg:py-32 bg-ink-900/30">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <div className="font-mono text-xs tracking-[0.2em] text-accent-400/70 mb-3">05 / ANALYTICS</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Performance Intelligence</h2>
          <p className="mt-3 text-slate-350 text-base leading-relaxed">
            Data-driven breakdown of team and individual Dota 2 performance metrics.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
          <div className="bg-ink-900 border border-ink-700 rounded p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-accent-400" />
                <h3 className="font-mono text-xs tracking-wider text-white uppercase">KDA by Player</h3>
              </div>
            </div>

            <div className="space-y-4">
              {chartData.map((d) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-sm text-white">{d.name}</span>
                    <span className="font-mono text-sm font-bold text-accent-400 tabular-nums">
                      {d.kd.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 bg-ink-850 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-600 to-accent-400 rounded-full transition-all duration-700"
                      style={{ width: `${(d.kd / maxKd) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <StatBox
              icon={<TrendingUp className="h-5 w-5" />}
              label="Season Record"
              value={`${wins} — ${losses}`}
              sub={`${winRate}% win rate`}
              accent
            />
            <StatBox
              icon={<Flame className="h-5 w-5" />}
              label="Current Streak"
              value={currentStreak}
              sub="Consecutive results"
            />
            <StatBox
              icon={<Target className="h-5 w-5" />}
              label="Top KDA"
              value={topFragger ? topFragger.nickname : '—'}
              sub={topFragger ? `${topFragger.kd_ratio.toFixed(2)} KDA` : ''}
            />
            <StatBox
              icon={<Award className="h-5 w-5" />}
              label="Highest PTS"
              value={topPtsPlayer ? topPtsPlayer.nickname : '—'}
              sub={topPtsPlayer ? `${topPtsPlayer.pts.toLocaleString()} PTS · #${topPtsPlayer.world_rank} world` : ''}
            />
            <StatBox
              icon={<BarChart3 className="h-5 w-5" />}
              label="Best Side"
              value={bestMap.map || '—'}
              sub={bestMap.map ? `${bestMap.winRate}% win rate` : ''}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBox({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-ink-900 border border-ink-700 rounded p-5 hover:border-accent-500/30 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded ${
            accent ? 'bg-accent-500/10 text-accent-400' : 'bg-ink-800 text-slate-350'
          }`}
        >
          {icon}
        </div>
        <span className="font-mono text-[10px] tracking-wider text-slate-450 uppercase">{label}</span>
      </div>
      <div className="font-mono text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-xs text-slate-450 mt-1">{sub}</div>
    </div>
  );
}

function getBestSide(matches: Match[]) {
  const mapStats: Record<string, { wins: number; total: number }> = {};
  for (const m of matches) {
    if (!m.map) continue;
    if (!mapStats[m.map]) mapStats[m.map] = { wins: 0, total: 0 };
    mapStats[m.map].total++;
    if (m.result === 'win') mapStats[m.map].wins++;
  }
  let best = { map: '', winRate: 0 };
  for (const [map, stats] of Object.entries(mapStats)) {
    if (stats.total < 2) continue;
    const rate = Math.round((stats.wins / stats.total) * 100);
    if (rate > best.winRate) best = { map, winRate: rate };
  }
  return best;
}

function getStreak(matches: Match[]) {
  const sorted = [...matches].sort(
    (a, b) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime()
  );
  if (sorted.length === 0) return '—';
  const first = sorted[0].result;
  let count = 0;
  for (const m of sorted) {
    if (m.result === first) count++;
    else break;
  }
  const prefix = first === 'win' ? 'W' : first === 'loss' ? 'L' : 'D';
  return `${count}${prefix}`;
}
