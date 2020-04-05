/* eslint-disable @typescript-eslint/no-unused-vars */
import Youch from 'youch';
import { ValidationError } from 'yup';
import { Request, Response, NextFunction } from 'express';
import HttpException from './HttpException';

export default async (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode || 400).json({
      name: err.name,
      errors: err.errors,
      message: err.message,
      path: err.path,
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    const youch = new Youch(err, req);
    const jsonYouch = await youch.toJSON();

    return res.status(err.statusCode || 400).json(jsonYouch);
  }

  return res.status(500).json({ error: 'Internal server error!' });
};
