import { useState } from 'react';
import { ArrowRight, Calendar, User, X } from 'lucide-react';
import type { NewsArticle } from '@/lib/supabase';

interface Props {
  news: NewsArticle[];
  loading: boolean;
}

export function News({ news, loading }: Props) {
  const [selected, setSelected] = useState<NewsArticle | null>(null);

  if (loading) {
    return (
      <section id="news" className="relative py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="font-mono text-xs tracking-[0.2em] text-accent-400/70 mb-3">04 / NEWS</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-10">Latest Intel</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 bg-ink-850 border border-ink-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <div className="font-mono text-xs tracking-[0.2em] text-accent-400/70 mb-3">04 / NEWS</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Latest Intel</h2>
          <p className="mt-3 text-slate-350 text-base leading-relaxed">
            Official announcements, tournament coverage, and roster updates from Team Pridnik.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {news.map((article, i) => (
            <NewsCard key={article.id} article={article} onClick={() => setSelected(article)} delay={i * 80} />
          ))}
        </div>
      </div>

      {selected && <NewsModal article={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function NewsCard({
  article,
  onClick,
  delay,
}: {
  article: NewsArticle;
  onClick: () => void;
  delay: number;
}) {
  const date = new Date(article.published_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <button
      onClick={onClick}
      className="group relative text-left bg-ink-900 border border-ink-700 rounded p-6 hover:border-accent-500/30 transition-all duration-300 animate-fade-up overflow-hidden"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent-500/5 blur-3xl group-hover:bg-accent-500/10 transition-colors" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-1 bg-accent-500/10 text-accent-400 rounded">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-slate-450">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent-400 transition-colors">
          {article.title}
        </h3>
        <p className="mt-3 text-sm text-slate-350 leading-relaxed line-clamp-2">{article.excerpt}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-slate-450">
            <User className="h-3 w-3" />
            {article.author || 'Staff'}
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] tracking-wider text-accent-400 uppercase group-hover:gap-2 transition-all">
            Read
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-500/0 group-hover:bg-accent-500/40 transition-colors" />
    </button>
  );
}

function NewsModal({ article, onClose }: { article: NewsArticle; onClose: () => void }) {
  const date = new Date(article.published_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-ink-900 border border-ink-700 rounded max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-ink-900/95 backdrop-blur border-b border-ink-700">
          <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-1 bg-accent-500/10 text-accent-400 rounded">
            {article.category}
          </span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-slate-350 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-center gap-3 mb-4 font-mono text-[10px] text-slate-450">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3 w-3" />
              {article.author || 'Staff'}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white leading-tight mb-4">{article.title}</h2>
          <p className="text-slate-350 text-sm leading-relaxed mb-4 italic">{article.excerpt}</p>
          <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
            {article.content}
          </p>
        </div>
      </div>
    </div>
  );
}
