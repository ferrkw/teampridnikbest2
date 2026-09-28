import { useEffect, useState } from 'react';
import { Crosshair, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Roster', href: '#roster' },
  { label: 'Heroes', href: '#heroes' },
  { label: 'Matches', href: '#matches' },
  { label: 'News', href: '#news' },
  { label: 'Stats', href: '#stats' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink-950/90 backdrop-blur-md border-b border-ink-700' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#overview" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center bg-accent-500/10 border border-accent-500/30 rounded clip-tag group-hover:bg-accent-500/20 transition-colors">
              <Crosshair className="h-5 w-5 text-accent-400" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-mono text-sm font-bold tracking-widest text-white">PRIDNIK</span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-accent-400/70">TACTICAL CORE</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-slate-350 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute inset-x-4 -bottom-px h-px bg-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <span className="flex items-center gap-2 font-mono text-xs text-slate-450">
              <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse-slow" />
              ACTIVE ROSTER
            </span>
          </div>

          <button
            className="md:hidden flex items-center justify-center h-10 w-10 text-slate-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink-700 bg-ink-900/95 backdrop-blur-md">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-slate-350 hover:text-white hover:bg-ink-800 rounded transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
