import express from 'express';
import {
  getGames, getStandings,
} from '../lib/db.js';

export const indexRouter = express.Router();

async function indexRoute(req, res) {
  const user = req.user ?? null;
  const loggedIn = req.isAuthenticated();
  return res.render('index', {
    title: 'Boltadeildin',
    time: new Date().toISOString(),
    logoPath: '/images/logo.png',
    user,
    loggedIn,
  });
}

async function leikirRoute(req, res) {
  const user = req.user ?? null;
  const loggedIn = req.isAuthenticated();
  const games = await getGames();
  if (games === null) {
    return res.status(500).send('Villa við að sækja leiki');
  }


  return res.render('leikir', {
    title: 'Leikir',
    time: new Date().toISOString(),
    games,
    user,
    loggedIn,
  });
}

async function stadaRoute(req, res) {
  const stada = await getStandings();
  const user = req.user ?? null;
  const loggedIn = req.isAuthenticated();
  return res.render('stada', {
    title: 'Staðan',
    time: new Date().toISOString(),
    stada,
    user,
    loggedIn,
  });
}

indexRouter.get('/', indexRoute);
indexRouter.get('/leikir', leikirRoute);
indexRouter.get('/stada', stadaRoute);
