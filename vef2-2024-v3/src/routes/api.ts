import express, { Request, Response, NextFunction } from 'express';
import { 
  createGame,
  deleteGameHandler,
  getGame,
  listGames,
  listGamesByTeam,
  updateGame
} from './games.js';
import { 
  createTeam,
  deleteTeam,
  getTeam,
  listTeams,
  updateTeam 
} from './teams.js';
import { expressjwt } from 'express-jwt';
import { generateToken, getSecret } from '../lib/token.js';

export const router = express.Router();

/*
router.use(expressjwt({ secret: getSecret(), algorithms: ['HS256'] }).unless({ path: ['/token', '/'] }));
*/
export async function index(req: Request, res: Response) {
  return res.json([
    {
      href: '/teams',
      methods: ['GET', 'POST'],
    },
    {
      href: '/teams/:slug',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
    {
      href: '/games',
      methods: ['GET', 'POST'],
    },
    {
      href: '/games/:id',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
  ]);
}

router.use('/token', generateToken);

router.get('/', index);

router.get('/teams', listTeams);
router.get('/teams/:slug', getTeam);
router.post('/teams', createTeam);
router.patch('/teams/:slug', updateTeam);
router.delete('/teams/:slug', deleteTeam);


router.get('/games', listGames);
router.get('/games/:id', getGame);
router.post('/games', createGame);
router.patch('/games/:id', updateGame);
router.delete('/games/:id', deleteGameHandler);
