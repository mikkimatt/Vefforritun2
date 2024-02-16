import { writeFile, readFile, readdir } from 'fs/promises';
import moment from 'moment';

const dataFolder = './data';
const validTeamsFilePath = './data/teams.json';

// valid data

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


// föll fyrir valid teams

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

// valid games

function isValidGame(game) {
  if (game === undefined) { return undefined;}
  if (game === null) { return null;}
  return (
    Object.prototype.hasOwnProperty.call(game, 'home') &&
    Object.prototype.hasOwnProperty.call(game, 'away') &&
    Object.prototype.hasOwnProperty.call(game.home, 'score') &&
    Object.prototype.hasOwnProperty.call(game.home, 'name') &&
    Object.prototype.hasOwnProperty.call(game.away, 'name') &&
    Object.prototype.hasOwnProperty.call(game.away, 'score') &&
    typeof game.home.name === 'string' &&
    typeof game.home.score === 'number' &&
    typeof game.away.name === 'string' &&
    typeof game.away.score === 'number' &&
    game.home.name !== game.away.name &&
    game.home.score >= 0 &&
    game.away.score >= 0
  );
}

// create inserts
async function createInserts() {
  const files = await readdir(dataFolder);
  const validTeams = await readFile(`${dataFolder}/teams.json`, 'utf8');
  const gameInserts = [];
  const teamInserts = [];
  const promises = [];

  JSON.parse(validTeams).forEach(team => {
    teamInserts.push(`INSERT INTO teams (name) VALUES ('${team}');`);
  });
  files.forEach(file => {
    if (file !== 'teams.json') {
      promises.push(readFile(`${dataFolder}/${file}`, 'utf8'));
    }
  });

  await Promise.all(files.map(async (file) => {
    const data = await readFile(`${dataFolder}/${file}`, 'utf8');
    const gameday = JSON.parse(data);

    if (isValid(gameday)) {
      const validGameday = teamsIsValid(await getValidTeams(), gameday);

      Object.keys(validGameday.games).forEach((gameKey) => {
        const game = validGameday.games[gameKey];
        if (isValidGame(game)) { // Validate each individual game
          gameInserts.push(
            `INSERT INTO games (date, homeName, awayName, homeScore, awayScore) VALUES ('${validGameday.date}', '${game.home.name}', '${game.away.name}', ${game.home.score}, ${game.away.score});`
          );
        }
      });
    }
  }));
  console.log(gameInserts);
  await writeFile('./sql/games.sql', gameInserts.join('\n'));
  await writeFile('./sql/teams.sql', teamInserts.join('\n'));
}


createInserts();
