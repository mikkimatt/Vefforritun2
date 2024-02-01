import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { parseGameday } from './parse.js';

function template(title, body) {
  const html = /* html */ `
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <div class = "nav">
        <a href="index.html">Boltadeildin</a>
        <a href="leikir.html">Seinustu leikir</a>
        <a href="stada.html">Staðan í deildinni</a>
      </div>
      <link rel="stylesheet" href="./public/styles.css">
      <script type="module" src="./public/scripts.js"></script>
    </head>
    <body>
      ${body}
    </body>
  </html>`;

  return html;
}

export function indexTemplate() {
  const title = 'Boltadeildin';
  const body = /* html */ `
  <section>
    <h1>Velkomin í Boltadeildina!</h1>
    <div class="content">
      <p> Velkominn á heimasíðu boltadeildarinnar! <br></br>
      Hér má finna stöðuna úr síðustu leikjum og stöðuna í deildinni
      </p>
    </div>
    <div class="box">
      <a href="leikir.html"><h1>Seinustu leikir</h1></a>
    </div>
    <div class="box">
      <a href="stada.html"><h1>Staðan í deildinni</h1></a>
    </div>
  </section>`;

  return template(title, body);
}

export function stadaTemplate(standings) {
  const title = 'Boltadeildin';
  const standingsHtml = standings.toString();
  const body = /* html */ `
  <section>
    <h1>Staðan í deildinni!</h1>
    ${standingsHtml

    }
  </section>`;

  return template(title, body);
}

export async function leikirTemplate() {
  const title = 'Boltadeildin';
  const dataDir = './data';
  const jsonFiles = await readdir(dataDir);
  const parsedDataArray = await Promise.all(jsonFiles.map(async (file) => {
    const jsonData = await readFile(join(dataDir, file), 'utf-8');
    return parseGameday(jsonData);
  }));
  const validParsedDataArray = parsedDataArray.filter(data => data !== null);

  const dateHtml = validParsedDataArray.map(parsedData => {
    const gamesHtml = parsedData.games.map(game => {
      const homeTeam = game.home;
      const awayTeam = game.away;
      return `<p>${homeTeam.name} ${homeTeam.score} - ${awayTeam.name} ${awayTeam.score}</p>`;
  }).join('');
  return /* html */ `
  <div>
    <h2>${parsedData.date}</h2>
    <section>
      <h1>Leikir ${parsedData.date}</h1>
      ${gamesHtml}
    </section>
  </div>`;
  }).join('');

  const body = /* html */ `
    <section>
      <h1>Leikir seinustu vikna</h1>
      ${dateHtml}
    </section>`;
  console.log('Generated HTML', body)
  return template(title, body);
}
