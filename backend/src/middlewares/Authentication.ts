import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { authConfig } from '../config';
import { promisify } from 'util';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: 'Unauthorized: Token not provided! ' });
  }
  const [, token] = authorization.split(' ');

  try {
    const decoded: any = await promisify(jwt.verify)(token, authConfig.secret);

    if (!decoded) {
      throw new Error();
    }

    req.body.email = decoded.email;
    req.headers.ongId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
