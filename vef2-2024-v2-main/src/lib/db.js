import { readFile } from 'fs/promises';
import pg from 'pg';

const SCHEMA_FILE = './sql/schema.sql';
const DROP_SCHEMA_FILE = './sql/drop.sql';

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

export async function createSchema(schemaFile = SCHEMA_FILE) {
  const data = await readFile(schemaFile);

  return query(data.toString('utf-8'));
}

export async function dropSchema(dropFile = DROP_SCHEMA_FILE) {
  const data = await readFile(dropFile);

  return query(data.toString('utf-8'));
}

export async function createGame({
  date,
  homeName,
  awayName,
  homeScore,
  awayScore,
} = {}) {
  const q = `
  INSERT INTO games
    (date, homeName, awayName, homeScore, awayScore)
  VALUES
  ($1, $2, $3, $4, $5)
  RETURNING id, date, homeName, awayName, homeScore, awayScore`;
  const values = [date, homeName, awayName, homeScore, awayScore];

  const result = await query(q, values);

  if (result && result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
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




