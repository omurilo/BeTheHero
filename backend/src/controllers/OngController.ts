import { Request, Response } from 'express';
import dbConnection from 'database';

import EmailService from 'services/EmailService';
import PasswordService from 'services/PasswordService';

import { IOngDTO, ICountDTO } from 'interfaces';

export default {
  async index(req: Request, res: Response) {
    const { max = 10, page = 0 } = req.query;

    try {
      const [{ count }]: ICountDTO[] = await dbConnection('ongs').count({
        count: '*',
      });

      const ongs: IOngDTO[] = await dbConnection('ongs')
        .select('id', 'name', 'email', 'whatsapp', 'cidade', 'uf')
        .limit(max)
        .offset(page * max);

      return res.json({ ongs, listFullSize: count });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async create(req: Request, res: Response) {
    const { name, email, password, whatsapp, cidade, uf } = req.body;

    try {
      const Password = new PasswordService();
      const passwordHash = await Password.encryptPassword({ password });

      const [id]: IOngDTO[] = await dbConnection('ongs').insert({
        name,
        email,
        password: passwordHash,
        whatsapp,
        cidade,
        uf,
      });

      const ong = { name, email, id };

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

      return res.json(ong);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async show(req: Request, res: Response) {
    const { ongId } = req.headers;
    const { email } = req.body;

    try {
      const ong: IOngDTO = await dbConnection('ongs')
        .where({ id: ongId, email })
        .select('id', 'name', 'email', 'whatsapp', 'cidade', 'uf')
        .first();

      return res.json(ong);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  },
  async update(req: Request, res: Response) {
    const { ongId } = req.headers;
    const { email, name, password, whatsapp, cidade, uf } = req.body;

    const data = { name, password, whatsapp, cidade, uf };

    try {
      const ong: IOngDTO = await dbConnection('ongs')
        .where({ id: ongId, email })
        .update(data);

      return res.json(ong);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async delete(req: Request, res: Response) {
    const { ongId } = req.headers;
    const { email } = req.body;

    try {
      await dbConnection('ongs').where({ id: ongId, email }).del();

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
