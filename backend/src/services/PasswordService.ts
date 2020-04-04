import * as bcrypt from 'bcrypt';

import {
  IPasswordEncryptDTO,
  IPasswordDecryptDTO,
  IPasswordService,
} from 'interfaces';

class PasswordService implements IPasswordService {
  async encryptPassword({ password }: IPasswordEncryptDTO): Promise<string> {
    try {
      const passwordHash = await bcrypt.hash(password, 10);

      return passwordHash;
    } catch (error) {
      throw new Error('Not its possible hash a password!');
    }
  }

  async checkPassword({
    password,
    passwordHash,
  }: IPasswordDecryptDTO): Promise<boolean> {
    try {
      const verified = await bcrypt.compare(password, passwordHash);

      return verified;
    } catch (error) {
      throw new Error('Not its possible decrypt a password!');
    }
  }
}

export default PasswordService;
