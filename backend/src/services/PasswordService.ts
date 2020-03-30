import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { authConfig } from '../config';

import {
  IPasswordEncryptDTO,
  IPasswordDecryptDTO,
  IPasswordService,
  IGenerateTokenDTO,
} from 'interfaces';

class PasswordService implements IPasswordService {
  async encryptPassword({ password }: IPasswordEncryptDTO) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);

      return passwordHash;
    } catch (error) {
      throw new Error('Not its possible hash a password!');
    }
  }

  async checkPassword({ password, passwordHash }: IPasswordDecryptDTO) {
    try {
      const verified = await bcrypt.compare(password, passwordHash);

      return verified;
    } catch (error) {
      throw new Error('Not its possible decrypt a password!');
    }
  }

  async generateToken({ id, email }: IGenerateTokenDTO) {
    const token: string = await new Promise((resolve, reject) => {
      jwt.sign(
        { id, email },
        authConfig.secret,
        {
          expiresIn: authConfig.ttl,
        },
        function (err, result) {
          if (err) {
            return reject(err);
          }

          return resolve(result);
        }
      );
    });

    return token;
  }
}

export default PasswordService;
