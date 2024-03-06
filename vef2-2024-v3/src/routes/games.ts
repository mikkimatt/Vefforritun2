import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { validateCreateGame, validateUpdateGame,  } from "../lib/validation.js";
import { gameMapper } from "../lib/mappers.js";
import { 
    getGames, 
    getTeamBySlug, 
    getGameById, 
    getGamesByTeam, 
    insertGame, 
    updateGameById, 
    deleteGameById 
} from "../lib/db.js";
import { Game } from "../types.js";

export async function listGames(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const games = await getGames();
    
    if (!games) {
        return next(new Error('No games found'));
    }

    return res.json(games);
}

export async function getGame(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const id = parseInt(req.params.id);

    const game = await getGameById(id);

    if (!game) {
        return next(new Error('Game not found'));
    }

    return res.json(game);
}

export async function listGamesByTeam(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const slug = req.params.slug;

    const games = await getGamesByTeam(slug);

    if (!games) {
        return next(new Error('No games found'));
    }

    return res.json(games);
}

export async function createGameHandler(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const { date, home, away, home_score, away_score } = req.body;
    const game = await insertGame(date, home, away, home_score, away_score);

    if (!game) {
        return next(new Error('Game not created'));
    }

    if (home === away) {
        return next(new Error('Bad Request: Home and away team cannot be the same'));
    }

    return res.json(game);
}

export async function updateGameHandler(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const id = parseInt(req.params.id);
    const { date, home, away, home_score, away_score } = req.body;
    const game = await updateGameById(id, date, home, away, home_score, away_score);

    if (!home && !away && !home_score && !away_score && !date) {
        return next(new Error('Bad Request: No paramaters provided to update, must have at least one parameter: date, home, away, home_score, away_score'));
    }

    if (!game) {
        return next(new Error('Game not updated'));
    }

    if (home === away) {
        return next(new Error('Bad Request: Home and away team cannot be the same'));
    }

    return res.json(game);
}

export async function deleteGameHandler(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const id = parseInt(req.params.id);
    const game = await deleteGameById(id);

    if (!game) {
        return next(new Error('No game deleted'));
    }

    return res.json(game);
}

export const createGame = [ validateCreateGame, createGameHandler ].flat();
export const updateGame = [ validateUpdateGame, updateGameHandler ].flat();