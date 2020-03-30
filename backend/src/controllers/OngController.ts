import Knex from 'knex';
import { Request, Response } from 'express';
import { dbConfig } from 'config';

import EmailService from 'services/EmailService';
import PasswordService from 'services/PasswordService';

import { IOngDTO } from 'interfaces';

const dbConnection: Knex = Knex(
  dbConfig[process.env.NODE_ENV || 'development'] as Knex.Config
);

export default {
  async index(req: Request, res: Response) {
    const { max = 10, page = 0 } = req.query;

    try {
      const ongs: IOngDTO[] = await dbConnection('ongs')
        .select('id', 'name', 'email', 'whatsapp', 'cidade', 'uf')
        .returning(['id', 'name', 'email', 'whatsapp', 'cidade', 'uf'])
        .limit(max)
        .offset(page * max);

      return res.json(ongs);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  async create(req: Request, res: Response) {
    const { name, email, password, whatsapp, cidade, uf } = req.body;
    const Password = new PasswordService();

    const passwordHash = await Password.encryptPassword({ password });

    try {
      const ong: IOngDTO[] = await dbConnection('ongs').insert(
        {
          name,
          email,
          password: passwordHash,
          whatsapp,
          cidade,
          uf,
        },
        ['id']
      );

      const response = ong[0].id ? ong[0] : { name, email };

      const Mail = new EmailService();

      Mail.sendMail({
        from: {
          name: 'Be The Hero',
          email: 'contact@bethehero.com',
        },
        to: {
          name,
          email,
        },
        message: {
          subject: 'Bem vindo ao Be The Hero',
          template: 'createAccount',
          context: { name },
        },
      });

      return res.json({ inserted: response, success: true });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const ong: IOngDTO = await dbConnection('ongs')
        .where({ id })
        .select('id', 'name', 'email', 'whatsapp', 'cidade', 'uf');

      return res.json({ ong });
    } catch (error) {
      return res.status(error.status).json({ error });
    }
  },
  async update(req: Request, res: Response) {
    const { ongId } = req.headers;
    const data = req.body;

    try {
      const ong: IOngDTO = await dbConnection('ongs')
        .where({ id: ongId, email: data.email })
        .update(data);

      return res.json({ ong });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  async delete(req: Request, res: Response) {
    const { ongId } = req.headers;
    const data = req.body;

    try {
      await dbConnection('ongs').where({ id: ongId, email: data.email }).del();

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};
