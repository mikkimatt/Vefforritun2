import pg from 'pg';
import { Game, Team } from '../types.js';
import { gameMapper, gamesMapper, teamMapper, teamsMapper } from './mappers.js';
import e from 'express';


/* DB queries */
let savedPool: pg.Pool | undefined;

export function getPool(): pg.Pool {
  if (savedPool) {
    return savedPool;
  }

  const { DATABASE_URL: connectionString } = process.env;
  if (!connectionString) {
    console.error('vantar DATABASE_URL í .env');
    throw new Error('missing DATABASE_URL');
  }

  savedPool = new pg.Pool({ connectionString });

  savedPool.on('error', (err) => {
    console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
    throw new Error('error in db connection');
  });

  return savedPool;
}

export async function query(
  q: string,
  values: Array<unknown> = [],
  silent = false,
) {
  const pool = getPool();

  let client;
  try {
    client = await pool.connect();
  } catch (e) {
    if (!silent) console.error('unable to get client from pool', e);
    return null;
  }

  try {
    const result = await client.query(q, values);
    return result;
  } catch (e) {
    if (!silent) console.error('unable to query', e);
    if (!silent) console.info(q, values);
    return null;
  } finally {
    client.release();
  }
}

/* Teams */

export async function getTeams(): Promise<Array<Team> | null> {
  const result = await query('select * from teams order by id');
  if (!result || !result.rows) {
    return [];
  }

  return teamsMapper(result.rows);
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
    const result = await query('select * from teams where slug = $1', [slug]);
    if (!result || !result.rows || result.rows.length !== 1) {
        return null;
    }
    
    return teamMapper(result.rows[0]);
    }

    
export async function insertTeam(name: string, slug: string, description: string): Promise<Team | null> {
  const result = await query('insert into teams (name, slug, description) values ($1, $2, $3) returning *', [name, slug, description]);
  if (!result || !result.rows || result.rows.length !== 1) {
    return null;
  }

  return teamMapper(result.rows[0]);
}

export async function updateTeamBySlug(slug: string, name: string, description: string): Promise<Team | null> {
    const result = await query('update teams set name = $1, description = $2 where slug = $3 returning *', [name, description, slug]);
    if (!result || !result.rows || result.rows.length !== 1) {
        return null;
    }
    
    return teamMapper(result.rows[0]);
    }

export async function deleteTeamBySlug(slug: string): Promise<Team | null> {
    const result = await query('delete from teams where slug = $1 returning *', [slug]);
    if (!result || !result.rows || result.rows.length !== 1) {
        return null;
    }
    
    return teamMapper(result.rows[0]);
}


/* Games */
export async function getGames(): Promise<Array<Game> | null> {
    const result = await query('select * from games order by date');
    if (!result || !result.rows) {
        return [];
    }
    return gamesMapper(result.rows);
}

export async function getGameById(id: number): Promise<Game | null> {
  const result = await query('select * from games where id = $1', [id]);
  if (!result || !result.rows || result.rows.length !== 1) {
    return null;
  }

  return gameMapper(result.rows[0]);
}

export async function getGamesByTeam(slug: string): Promise<Array<Game> | null> {
    const result = await query('select * from games where home = $1 or away = $1 order by date', [slug]);
    if (!result || !result.rows) {
        return [];
    }
    
    return gamesMapper(result.rows);
}

export async function insertGame(date: string, home: string, away: string, home_score: number, awayScore: number): Promise<Game | null> {
    const result = await query('insert into games (date, home, away, home_score, away_score) values ($1, $2, $3, $4, $5) returning *', [date, home, away]);
    if (!result || !result.rows || result.rows.length !== 1) {
        return null;
    }
    
    return gameMapper(result.rows[0]);
}

export async function updateGameById(id: number, date: string, home: string, away: string, home_score: number, away_score: number): Promise<Game | null> {
    const result = await query('update games set date = $1, home = $2, away = $3, home_score = $4, away_score = $5 where id = $6 returning *', [date, home, away, home_score, away_score, id]);
    if (!result || !result.rows || result.rows.length !== 1) {
        return null;
    }
    
    return gameMapper(result.rows[0]);
}

export async function deleteGameById(id: number): Promise<Game | null> {
    const result = await query('delete from games where id = $1 returning *', [id]);
    if (!result || !result.rows || result.rows.length !== 1) {
        return null;
    }
    
    return gameMapper(result.rows[0]);
}
