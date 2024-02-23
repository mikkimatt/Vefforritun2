import express from 'express';
import {
  getGames, getStandings,
} from '../lib/db.js';

export const indexRouter = express.Router();

async function indexRoute(req, res) {
  return res.render('index', {
    title: 'Boltadeildin',
    time: new Date().toISOString(),
    logoPath: '/images/logo.png',
  });
}

async function leikirRoute(req, res) {
  const games = await getGames();
  if (games === null) {
    return res.status(500).send('Villa við að sækja leiki');
  }

  return res.render('leikir', {
    title: 'Leikir',
    time: new Date().toISOString(),
    games,
  });
}

async function stadaRoute(req, res) {
  const stada = await getStandings();
  return res.render('stada', {
    title: 'Staðan',
    time: new Date().toISOString(),
    stada,
  });
}

indexRouter.get('/', indexRoute);
indexRouter.get('/leikir', leikirRoute);
indexRouter.get('/stada', stadaRoute);
