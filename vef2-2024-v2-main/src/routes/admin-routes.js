import express from 'express';
import passport from 'passport';
import { createGame } from '../lib/db.js';

export const adminRouter = express.Router();

async function indexRoute(req, res) {
  return res.render('login', {
    title: 'Innskráning',
  });
}

async function createGames(req, res) {
  const {
    date, home, away, homeScore, awayScore,
  } = req.body;
  if (!date || !home || !away || !homeScore || !awayScore) {
    return res.status(400).send('Ófullnægjandi upplýsingar');
  }


  if(home === away) {
    return res.status(400).send('Heimilið og útilið geta ekki verið sama lið');
  }

  if(date > new Date().toISOString().split('T')[0]){
    return res.status(400).send('Ekki hægt að búa til leik í framtíðinni');
  }

  const result = await createGame([date, home, away, homeScore, awayScore]);

  if (result) {
    return res.redirect('/leikir');
  }

  return res.status(500).send('Villa við að búa til leik');

}


async function adminRoute(req, res) {
  const user = req.user ?? null;
  const loggedIn = req.isAuthenticated();

  return res.render('admin', {
    title: 'Admin upplýsingar, mjög leynilegt',
    user,
    loggedIn,
  });
}

// TODO færa á betri stað
// Hjálpar middleware sem athugar hvort notandi sé innskráður og hleypir okkur
// þá áfram, annars sendir á /login
function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

adminRouter.get('/login', indexRoute);
adminRouter.get('/admin', ensureLoggedIn, adminRoute);
adminRouter.post('/admin', ensureLoggedIn, createGames);
adminRouter.post(
  '/login',

  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/login',
  }),

  // Ef við komumst hingað var notandi skráður inn, senda á /admin
  (req, res) => {
    res.redirect('/admin');
  },


);

adminRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
});
