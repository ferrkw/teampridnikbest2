import { Crosshair } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-ink-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center bg-accent-500/10 border border-accent-500/30 rounded clip-tag">
            <Crosshair className="h-8 w-8 text-accent-400 animate-spin-slow" />
          </div>
          <div className="absolute inset-0 rounded border border-accent-500/20 animate-ping-slow" />
        </div>
        <div className="font-mono text-xs tracking-[0.2em] text-slate-450 uppercase animate-pulse">
          Initializing Command Center
        </div>
      </div>
    </div>
  );
}
