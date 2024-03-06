import { Game, Team } from "../types";

export function gameMapper(potentialGame: unknown): Game | null {
  const game = potentialGame as Game | null;

  if (!game || !game.id || !game.date || !game.home || !game.away) {
    return null;
  }

  const mapped: Game = {
    id: game.id,
    date: game.date,
    home: game.home,
    away: game.away,
    home_score: game.home_score ?? undefined,
    away_score: game.away_score ?? undefined,
    created: game.created,
    updated: game.updated,
  };

  return mapped;
}

export function gamesMapper(potentialGames: unknown): Array<Game> {
  const games = potentialGames as Array<unknown> | null;

  if (!games || !Array.isArray(games)) {
    return [];
  }

  const mapped = games.map(gameMapper);

  return mapped.filter((i): i is Game => Boolean(i));
}

export function teamMapper(potentialTeam: unknown): Team | null {
  const team = potentialTeam as Team | null;
  if (!team || !team.id || !team.name) {
    return null;
  }

  const mapped: Team = {
    id: team.id,
    name: team.name,
    description: team.description ?? undefined,
    created: team.created,
    updated: team.updated,
  };

  return mapped;
}

export function teamsMapper(potentialTeams: unknown): Array<Team> {
  const teams = potentialTeams as Array<unknown> | null;

  if (!teams || !Array.isArray(teams)) {
    return [];
  }

  const mapped = teams.map(teamMapper);

  return mapped.filter((i): i is Team => Boolean(i));
}

