import e, { NextFunction, Request, Response } from "express";
import slugify from 'slugify';
import {
    getTeamBySlug,
    getTeams,
    insertTeam,
    updateTeamBySlug,
    deleteTeamBySlug
} from "../lib/db.js";
import { teamMapper } from "../lib/mappers.js";
import { validateCreateTeam, validateUpdateTeam } from "../lib/validation.js";
import { Team } from "../types.js";


export async function listTeams(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const teams = await getTeams();
    console.log(teams);
    if (!teams) {
        return next(new Error('No teams found'));
    }

    return res.json(teams);
}

export async function getTeam(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const slug = req.params.slug;

    const team = await getTeamBySlug(slug);

    if (!team) {
        return next(new Error('Team not found'));
    }

    return res.json(team);
}

export async function createTeamHandler(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const name = req.body.name;
    const description = req.body.description;
    const slug = slugify(name, { lower: true });

    const team = await insertTeam(name, slug, description);

    if (!team) {
        return next(new Error('Team not created'));
    }

    return res.json(team);
}

export async function updateTeamHandler(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const name = req.body.name;
    const slug = req.params.slug;
    const description = req.body.description;

    const team = await updateTeamBySlug(slug, name, description);

    if (!name && !description)  {
        return next(new Error('Bad Request: Team not updated, needs a name'));
    }

    if (!team) {
        return next(new Error('Team not updated'));
    }

    return res.json(team);
}

export async function deleteTeam(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const slug = req.params.slug;

    const team = await deleteTeamBySlug(slug);

    if (!team) {
        return next(new Error('Team not deleted'));
    }

    return res.json(team);
}

export const createTeam = [validateCreateTeam, createTeamHandler].flat();
export const updateTeam = [validateUpdateTeam, updateTeamHandler].flat();
