import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from 'middlewares';

export default (schema: yup.ObjectSchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate(req, { abortEarly: false });

    return next();
  } catch (error) {
    throw ErrorHandler(error, req, res, next);
  }
};
