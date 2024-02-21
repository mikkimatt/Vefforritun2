import pg from 'pg';
import moment from 'moment';

const { DATABASE_URL: connectionString } = process.env;
const db = new pg.Pool({ connectionString});

db.on('error', (err) => {
  console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
  process.exit(-1);
});

export async function query(q, values = []) {
  let client;
  try {
    client = await db.connect();
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

export async function getAllGames() {
  const q = `SELECT
  games.id, date, home_score, away_score, home, away
 FROM
   games
 LEFT JOIN teams home ON home.id = home
 LEFT JOIN teams away ON away.id = away
 ORDER BY date ASC;`;
  const result = await query(q);

  if (result) {
    return result.rows, ({ date }) => moment(date).format('DD MMMM YYYY')) :
    result.rows;
  }

  return [];
}

export async function createGame(game){
  const q = `
  INSERT INTO games
    (date, homeName, awayName, homeScore, awayScore)
  VALUES
  ($1, $2, $3, $4, $5)`
  const result = await query(q, game);
  return result;
}

export async function updateGame(
  id,
  { date, homeName, awayName, homeScore, awayScore } = {}
) {
  const q = `
    UPDATE events
      SET
        date = $1,
        homeName = $2,
        awayName = $3,
        homeScore = $4,
        awayScore = $5,
        updated = CURRENT_TIMESTAMP
    WHERE
      id = $6
    RETURNING id, date, homeName, awayName, homeScore, awayScore;
  `;
  const values = [date, homeName, awayName, homeScore, awayScore, id];
  const result = await query(q, values);

  if (result && result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}




