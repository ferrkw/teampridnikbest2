import { useState } from 'react';
import { Trophy, Target, MapPin, ChevronRight } from 'lucide-react';
import type { Match } from '@/lib/supabase';

interface Props {
  matches: Match[];
  loading: boolean;
}

type Filter = 'all' | 'win' | 'loss';

export function Matches({ matches, loading }: Props) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = matches.filter((m) => filter === 'all' || m.result === filter);

  return (
    <section id="matches" className="relative py-24 lg:py-32 bg-ink-900/30">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="font-mono text-xs tracking-[0.2em] text-accent-400/70 mb-3">03 / MATCHES</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Match Archive</h2>
            <p className="mt-3 text-slate-350 text-base leading-relaxed">
              Complete competitive record. Filter by result to analyze performance trends.
            </p>
          </div>

          <div className="flex gap-1 bg-ink-850 border border-ink-700 rounded p-1">
            {(['all', 'win', 'loss'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded transition-colors ${
                  filter === f
                    ? 'bg-accent-500 text-ink-950'
                    : 'text-slate-350 hover:text-white'
                }`}
              >
                {f === 'all' ? 'All' : f === 'win' ? 'Wins' : 'Losses'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 bg-ink-850 border border-ink-700 rounded animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-450 text-sm">No matches in this category.</div>
        ) : (
          <div className="space-y-2">
            {filtered.map((match, i) => (
              <MatchRow key={match.id} match={match} delay={i * 50} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MatchRow({ match, delay }: { match: Match; delay: number }) {
  const isWin = match.result === 'win';
  const isDraw = match.result === 'draw';
  const date = new Date(match.match_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="group relative flex items-center gap-4 sm:gap-6 bg-ink-900 border border-ink-700 rounded px-4 sm:px-6 py-4 hover:border-accent-500/30 transition-all duration-300 animate-slide-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div
        className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded shrink-0 ${
          isWin
            ? 'bg-accent-500/10 text-accent-400 border border-accent-500/25'
            : isDraw
            ? 'bg-slate-450/10 text-slate-350 border border-slate-450/25'
            : 'bg-ember-500/10 text-ember-400 border border-ember-500/25'
        }`}
      >
        {isWin ? <Trophy className="h-5 w-5" /> : isDraw ? <Target className="h-5 w-5" /> : <Target className="h-5 w-5" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded ${
              isWin
                ? 'bg-accent-500/10 text-accent-400'
                : isDraw
                ? 'bg-slate-450/10 text-slate-350'
                : 'bg-ember-500/10 text-ember-400'
            }`}
          >
            {isWin ? 'Victory' : isDraw ? 'Draw' : 'Defeat'}
          </span>
          {match.stage && (
            <span className="font-mono text-[10px] text-slate-450 tracking-wider uppercase">
              {match.stage}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white font-semibold text-sm sm:text-base">Pridnik</span>
          <span className="font-mono text-base sm:text-lg font-bold text-white tabular-nums">
            {match.team_score}
          </span>
          <span className="text-slate-450 text-xs">:</span>
          <span className="font-mono text-base sm:text-lg font-bold text-slate-350 tabular-nums">
            {match.opponent_score}
          </span>
          <span className="text-slate-350 font-semibold text-sm sm:text-base">{match.opponent}</span>
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-450">
          <MapPin className="h-3 w-3" />
          <span className="font-mono">{match.map}</span>
        </div>
        <span className="font-mono text-[10px] text-slate-450">{match.event}</span>
      </div>

      <div className="hidden md:block font-mono text-xs text-slate-450 shrink-0 w-24 text-right">
        {date}
      </div>

      <ChevronRight className="h-4 w-4 text-slate-450 group-hover:text-accent-400 group-hover:translate-x-1 transition-all shrink-0" />

      <div
        className={`absolute left-0 top-0 bottom-0 w-0.5 ${
          isWin ? 'bg-accent-500/50' : isDraw ? 'bg-slate-450/50' : 'bg-ember-500/50'
        }`}
      />
    </div>
  );
}
