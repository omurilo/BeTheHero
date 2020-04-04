import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { authConfig } from '../config';

import { IAuthenticationService, IGenerateTokenDTO } from 'interfaces';

class AuthenticationService implements IAuthenticationService {
  async generateToken({
    id,
    email,
    options,
  }: IGenerateTokenDTO): Promise<string> {
    const signOptions: jwt.SignOptions = {
      expiresIn: authConfig.ttl,
      ...options,
    };

    const token: string = await new Promise((resolve, reject) => {
      jwt.sign({ id, email }, authConfig.secret, signOptions, function (
        err,
        result
      ) {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });

    return token;
  }

  async verifyToken(token: string): Promise<any> {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    return decoded;
  }
}

export default AuthenticationService;
