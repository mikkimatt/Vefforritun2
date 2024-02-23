import pg from 'pg';
import { environment } from './environment.js';
import { logger } from './logger.js';

const env = environment(process.env, logger);

if (!env?.connectionString) {
  process.exit(-1);
}

const { connectionString } = env;

const pool = new pg.Pool({ connectionString });

pool.on('error', (err) => {
  console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
  process.exit(-1);
});

export async function query(q, values = []) {
  let client;
  try {
    client = await pool.connect();
  } catch (e) {
    console.error('unable to get client from pool', e);
    return null;
  }

  try {
    const result = await client.query(q, values);
    return result;
  } catch (e) {
    console.error('unable to query', e);
    console.info(q, values);
    return null;
  } finally {
    client.release();
  }
}

export async function getGames() {
  const q = `
    SELECT
      date,
      home_team.name AS home_name,
      games.homeScore AS home_score,
      away_team.name AS away_name,
      games.awayScore AS away_score
    FROM
      games
    LEFT JOIN
      teams AS home_team ON home_team.id = games.home
    LEFT JOIN
      teams AS away_team ON away_team.id = games.away
  `;

  const result = await query(q);

  const games = [];
  if (result && (result.rows?.length ?? 0) > 0) {
    for (const row of result.rows) {
      const game = {
        date: row.date,
        home: {
          name: row.home_name,
          score: row.home_score,
        },
        away: {
          name: row.away_name,
          score: row.away_score,
        },
      };
      games.push(game);
    }

    return games;
  }
  return null;
}

export async function getAllTeams(){
  const q = `SELECT * FROM teams
  ORDER BY date ASC;`;
  const result = await query(q)

  if(result){
    return result.rows
  }

  return null;
}


export async function getStandings(){
  const q = `SELECT
  teams.name,
  COUNT(games.id) AS games,
  SUM(CASE WHEN games.homeScore > games.awayScore THEN 3 ELSE 0 END) +
  SUM(CASE WHEN games.homeScore = games.awayScore THEN 1 ELSE 0 END) AS points,
  SUM(CASE WHEN games.homeScore > games.awayScore THEN 1 ELSE 0 END) AS wins,
  SUM(CASE WHEN games.homeScore < games.awayScore THEN 1 ELSE 0 END) AS losses,
  SUM(CASE WHEN games.homeScore = games.awayScore THEN 1 ELSE 0 END) AS draws
  FROM
  teams
  LEFT JOIN games ON teams.id = games.home OR teams.id = games.away
  GROUP BY teams.name
  ORDER BY points DESC;`;
  const result = await query(q);

  if(result){
    return result.rows
  }

  return null;
}

export async function createGame(game){
  const q = `
  INSERT INTO games
    (date, home, away, homeScore, awayScore)
  VALUES
  ($1, $2, $3, $4, $5)`
  const result = await query(q, game);
  return result;
}

export async function updateGame(
  id,
  { date, home, away, homeScore, awayScore } = {}
) {
  const q = `
    UPDATE games
      SET
        date = $1,
        home = $2,
        away = $3,
        homeScore = $4,
        awayScore = $5,
        updated = CURRENT_TIMESTAMP
    WHERE
      id = $6
    RETURNING id, date, home, away, homeScore, awayScore;
  `;
  const values = [date, home, away, homeScore, awayScore, id];
  const result = await query(q, values);

  if (result && result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}

export async function end() {
  await pool.end();
}


