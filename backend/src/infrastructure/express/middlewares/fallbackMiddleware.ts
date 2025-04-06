import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function fallbackMiddleware(req: Request, res: Response) {
  res.sendStatus(StatusCodes.NOT_FOUND);
}
