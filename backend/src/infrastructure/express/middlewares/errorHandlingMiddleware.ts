import { NextFunction, Response } from 'express';
import { StatusCodes } from "http-status-codes";


export function errorHandlingMiddleware(error: any, res: Response, next: NextFunction) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  res.json({ error: 'Something went wrong' });
  console.log(error);
}
