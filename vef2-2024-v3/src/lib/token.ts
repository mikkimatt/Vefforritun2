import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function generateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const secret = getSecret();

  const token = jwt.sign({}, secret, {
    expiresIn: "1h",
  });
  return res.json({ token });
}

export function getSecret(){
const secret = process.env.SECRET;
console.log(process.env.SECRET);
  console.log(secret);
    if (!secret) {
        console.error('No secret provided');
        process.exit(1);
    }
    return secret;
}
