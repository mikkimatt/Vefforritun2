import { Request, Response, NextFunction } from "express";
import { checkSchema, validationResult } from "express-validator";
import {
  createTeamSchema,
  updateTeamSchema,
  createGameSchema,
  updateGameSchema,
} from "./schema.js";

function handleErrors(errors: any, res: Response) {
  const err = errors.array().reduce((acc: any, cur: any, index: number) => {
    acc[index] = cur.msg;
    return acc;
  }, {} as Array<string>);
  return res.status(400).json({ errors: err });
}

// Hjálp frá copilot
async function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
  schema: any
): Promise<void | Response<any, Record<string, any>>> {
  const reqType = req.method;
  if (reqType === "POST") {
    await checkSchema(schema).run(req);
  } else if (reqType === "PATCH") {
    await checkSchema(schema).run(req);
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleErrors(errors, res);
  }
  next();
}

export async function validateCreateTeam(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> {
  await checkSchema(createTeamSchema).run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleErrors(errors, res);
  }
  next();
}

export async function validateCreateGame(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> {
    await checkSchema(createGameSchema).run(req);
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return handleErrors(errors, res);
    }
    next();
}

export async function validateUpdateTeam(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> {
  await checkSchema(updateTeamSchema).run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleErrors(errors, res);
  }
  next();
}

export async function validateUpdateGame(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> {
  await checkSchema(updateGameSchema).run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleErrors(errors, res);
  }
  next();
}
