import { Crosshair, Twitter, Twitch, Youtube, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-ink-700 bg-ink-950">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center bg-accent-500/10 border border-accent-500/30 rounded clip-tag">
                <Crosshair className="h-5 w-5 text-accent-400" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-mono text-sm font-bold tracking-widest text-white">PRIDNIK</span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-accent-400/70">TACTICAL CORE</span>
              </div>
            </div>
            <p className="text-sm text-slate-450 leading-relaxed max-w-xs">
              Official tactical command center for Team Pridnik esports organization.
              Competitive since 2019.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.18em] text-slate-450 uppercase mb-4">
              Navigation
            </h4>
            <div className="space-y-2">
              {[
                { label: 'Overview', href: '#overview' },
                { label: 'Roster', href: '#roster' },
                { label: 'Heroes', href: '#heroes' },
                { label: 'Matches', href: '#matches' },
                { label: 'News', href: '#news' },
                { label: 'Stats', href: '#stats' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-350 hover:text-accent-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.18em] text-slate-450 uppercase mb-4">
              Connect
            </h4>
            <div className="flex gap-2">
              {[
                { icon: <Twitter className="h-4 w-4" />, label: 'Twitter' },
                { icon: <Twitch className="h-4 w-4" />, label: 'Twitch' },
                { icon: <Youtube className="h-4 w-4" />, label: 'YouTube' },
                { icon: <Github className="h-4 w-4" />, label: 'GitHub' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center border border-ink-600 rounded text-slate-350 hover:text-accent-400 hover:border-accent-500/40 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-wider text-slate-450 uppercase">
            © 2026 Team Pridnik. All rights reserved.
          </p>
          <p className="font-mono text-[10px] tracking-wider text-slate-450 uppercase">
            Built for competition. Designed for dominance.
          </p>
        </div>
      </div>
    </footer>
  );
}
