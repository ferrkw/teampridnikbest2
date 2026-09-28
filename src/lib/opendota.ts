export interface OpenDotaPlayerResponse {
  profile?: {
    personaname?: string | null;
    avatarfull?: string | null;
  };
  mmr_estimate?: {
    estimate?: number | null;
  };
  rank_tier?: number | null;
  competitive_rank?: number | null;
  solo_competitive_rank?: number | null;
  leaderboard_rank?: number | null;
  wl?: {
    win?: number | null;
    lose?: number | null;
  };
  profile?: {
    account_id?: number | null;
    personaname?: string | null;
    avatarfull?: string | null;
  };
}

export function steam64ToAccountId(steamId: string): number {
  const normalized = steamId.trim();
  if (!normalized) return 0;

  const numeric = BigInt(normalized.replace(/\D/g, ''));
  const steam32Offset = BigInt('76561197960265728');
  const accountId = numeric - steam32Offset;

  if (accountId < 0n) {
    return 0;
  }

  return Number(accountId);
}

export async function fetchOpenDotaPlayer(steamId: string) {
  const accountId = steam64ToAccountId(steamId);

  if (!accountId) {
    return null;
  }

  const res = await fetch(`https://api.opendota.com/api/players/${accountId}`);

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as OpenDotaPlayerResponse;

  if (!data || !data.profile) {
    return null;
  }

  const wins = data.wl?.win ?? 0;
  const losses = data.wl?.lose ?? 0;
  const totalMatches = wins + losses;
  const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

  return {
    steam_persona: data.profile.personaname ?? null,
    steam_avatar: data.profile.avatarfull ?? null,
    steam_mmr: data.mmr_estimate?.estimate ?? null,
    steam_rank_tier: data.rank_tier ?? data.competitive_rank ?? data.solo_competitive_rank ?? null,
    steam_wins: wins,
    steam_losses: losses,
    win_rate: winRate,
    matches_played: totalMatches,
    kd_ratio: 0,
  };
}
