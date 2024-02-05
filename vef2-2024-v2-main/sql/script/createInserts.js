import { writeFile, readFile, readdir } from 'fs/promises';
import moment from 'moment';

const dataFolder = './data';
const validTeamsFilePath = './data/teams.json';

function isValid(data) {
  return (
    data !== null &&
    Object.prototype.hasOwnProperty.call(data, 'date') &&
    Object.prototype.hasOwnProperty.call(data, 'games') &&
    Array.isArray(data.games) &&
    data.games.length > 0 &&
    moment(data.date).isValid()
  );
}

function teamsIsValid(validTeams, gameday) {
  Object.keys(gameday.games).forEach((gameKey) => {
    const game = gameday.games[gameKey];
    if (!validTeams.includes(game.home.name) || !validTeams.includes(game.away.name)) {
      delete gameday.games[gameKey];
    }
  });

  return gameday;
}

async function getValidTeams() {
  try {
    const validTeamsData = await readFile(validTeamsFilePath, 'utf8');
    return JSON.parse(validTeamsData);
  } catch (error) {
    console.error('Error reading valid teams file:', error);
    return [];
  }
}

async function createInserts() {
  const files = await readdir(dataFolder);
  const inserts = [];

  await Promise.all(files.map(async (file) => {
    const data = await readFile(`${dataFolder}/${file}`, 'utf8');
    const gameday = JSON.parse(data);

    if (isValid(gameday)) {
      console.log('Valid gameday:', gameday);
      const validGameday = teamsIsValid(await getValidTeams(), gameday);

      Object.keys(validGameday.games).forEach((gameKey) => {
        const game = validGameday.games[gameKey];
        inserts.push(
          `INSERT INTO games (date, home, away, home_goals, away_goals) VALUES ('${validGameday.date}', '${game.home.name}', '${game.away.name}', ${game.home.score}, ${game.away.score});`
        );
      });
    }
  }));

  console.log('Inserts:', inserts);
  await writeFile('./games.sql', inserts.join('\n'));
}


createInserts();
