import { Request, Response, NextFunction } from 'express';
import AuthenticationService from 'services/AuthenticationService';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided!' });
  }
  const [, token] = authorization.split(' ');

  try {
    const Auth = new AuthenticationService();
    const decoded: any = await Auth.verifyToken(token);

    req.body.email = decoded.email;
    req.headers.ongId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};
