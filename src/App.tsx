import { AlertCircle } from 'lucide-react';
import { useTeamData } from '@/hooks/useTeamData';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Roster } from '@/components/Roster';
import { HeroesPool } from '@/components/HeroesPool';
import { Matches } from '@/components/Matches';
import { News } from '@/components/News';
import { Stats } from '@/components/Stats';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';

function App() {
  const { players, matches, news, heroPool, loading, error } = useTeamData();

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />

      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 bg-ember-500/10 border border-ember-500/30 rounded text-ember-400 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Unable to load team data. Please refresh.</span>
        </div>
      )}

      <main>
        <Hero players={players} matches={matches} />
        <Roster players={players} loading={false} />
        <HeroesPool players={players} heroPool={heroPool} loading={false} />
        <Matches matches={matches} loading={false} />
        <News news={news} loading={false} />
        <Stats players={players} matches={matches} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
