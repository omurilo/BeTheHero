import Knex from 'knex';
import { Request, Response } from 'express';
import { dbConfig } from 'config';

import EmailService from 'services/EmailService';

import { IOngDTO, IIncidentsDTO } from 'interfaces';

const dbConnection: Knex = Knex(
  dbConfig[process.env.NODE_ENV || 'development'] as Knex.Config
);

export default {
  async index(req: Request, res: Response) {
    const { max = 10, page = 0 } = req.query;

    try {
      const incidents: IIncidentsDTO[] = await dbConnection('incidents')
        .select('id', 'title', 'description', 'value', 'ong_id')
        .returning(['id', 'title', 'description', 'value', 'ong_id'])
        .limit(max)
        .offset(page * max);

      return res.json({ incidents });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  async create(req: Request, res: Response) {
    const { title, description, value, ongId } = req.body;

    try {
      const incident: IIncidentsDTO[] = await dbConnection('incidents').insert(
        {
          title,
          description,
          value,
          ong_id: ongId,
        },
        ['id']
      );

      const response = incident[0].id
        ? incident[0]
        : { title, description, value, ong_id: ongId };

      const { name, email }: IOngDTO = await dbConnection('ongs')
        .where({ id: ongId })
        .select('name', 'email');

      const Mail = new EmailService();

      Mail.sendMail({
        from: {
          name: 'Be The Hero',
          email: 'contact@bethehero.com',
        },
        to: {
          name: name,
          email: email,
        },
        message: {
          subject: 'Bem vindo ao Be The Hero',
          template: 'createAccount',
          context: { name: name, incident: { title, description, value } },
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
      const incident: IIncidentsDTO = await dbConnection('incidents')
        .where({ id })
        .select('id', 'title', 'description', 'value', 'ong_id');

      return res.json({ incident });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  async update(req: Request, res: Response) {
    const { ongId } = req.headers;
    const { id } = req.params;
    const data = req.body;

    delete data.email;

    try {
      const incident: IIncidentsDTO = await dbConnection('incidents')
        .where({ id, ong_id: ongId })
        .update(data);

      return res.json({ incident });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  async delete(req: Request, res: Response) {
    const { ongId } = req.headers;
    const { id } = req.params;

    try {
      await dbConnection('incidents').where({ ong_id: ongId, id }).del();

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};