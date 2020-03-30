/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Youch from 'youch';
import validate from 'express-validation';
import { Request, Response, NextFunction } from 'express';
import HttpException from './HttpException';

export default async (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  if (err instanceof validate.ValidationError) {
    console.log(err, err.message);
    return res.status(400).json(err.message);
  }

  if (process.env.NODE_ENV !== 'production') {
    const youch = new Youch(err, req);
    const jsonYouch = await youch.toJSON();

    return res.status(400).json(jsonYouch);
  }

  return res.status(500).json({ error: 'Internal server error!' });
};
