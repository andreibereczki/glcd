import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies['token'];

  if (token === undefined) {
    res.status(StatusCodes.UNAUTHORIZED).end();
    return;
  }

  try {
    jwt.verify(token, 'glass-lewis-super-secret-key');
  } catch (e) {
    res.status(StatusCodes.UNAUTHORIZED).end();
    return;
  }

  next();
}
