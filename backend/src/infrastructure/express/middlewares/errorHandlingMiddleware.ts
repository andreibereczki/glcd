import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export function errorHandlingMiddleware(error: any, req: Request, res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  res.json({ error: 'Something went wrong' });
}
