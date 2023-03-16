import { NextFunction, Request, Response } from 'express';

export function loggerFunctMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('endpoint => ', req.url);
  console.log('params =>', req.params);
  console.log('queryParams =>', req.query);
  next();
}
