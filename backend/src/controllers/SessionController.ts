import Knex from 'knex';
import { Request, Response } from 'express';
import { dbConfig } from 'config';

import PasswordService from 'services/PasswordService';

import { IOngPassordDTO } from 'interfaces';

const dbConnection: Knex = Knex(
  dbConfig[process.env.NODE_ENV || 'development'] as Knex.Config
);

export default {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const [ong]: IOngPassordDTO[] = await dbConnection('ongs')
        .where({ email })
        .select('id', 'email', 'name', 'cidade', 'uf', 'password');

      const Password = new PasswordService();

      const validPassword = await Password.checkPassword({
        password,
        passwordHash: ong.password,
      });

      if (validPassword) {
        const token = await Password.generateToken({ id: ong.id, email });
        return res.status(200).json({
          token,
          ong: {
            id: ong.id,
            email: ong.email,
            name: ong.name,
            cidade: ong.cidade,
            uf: ong.uf,
          },
        });
      } else {
        throw new Error('Not its possible generate a token!');
      }
    } catch (error) {
      return res.status(401).json({
        error: 'Email/password not found or is incorrect',
      });
    }
  },
};
