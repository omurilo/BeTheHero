import { Request, Response } from 'express';
import dbConnection from 'database';
import EmailService from 'services/EmailService';

import { IOngDTO, IIncidentsDTO, ICountDTO } from 'interfaces';

export default {
  async index(req: Request, res: Response) {
    const { max = 10, page = 0 } = req.query;

    try {
      const [{ count }]: ICountDTO[] = await dbConnection('incidents').count({
        count: '*',
      });

      const incidents: IIncidentsDTO[] = await dbConnection('incidents')
        .join('ongs', { 'incidents.ong_id': 'ongs.id' })
        .limit(max)
        .offset(page * max)
        .select(
          'incidents.*',
          'ongs.name',
          'ongs.email',
          'ongs.whatsapp',
          'ongs.cidade',
          'ongs.uf'
        );

      return res.json({ incidents, listFullSize: count });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  async create(req: Request, res: Response) {
    const { ongId } = req.headers;
    const { title, description, value } = req.body;

    try {
      const [id]: IIncidentsDTO[] = await dbConnection('incidents').insert({
        title,
        description,
        value,
        ong_id: ongId,
      });

      const incident = { id, title, description, value, ong_id: ongId };

      const { name, email }: IOngDTO = await dbConnection('ongs')
        .where({ id: ongId })
        .select('name', 'email')
        .first();

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
          context: { name, incident },
        },
      });

      return res.json(incident);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const incident: IIncidentsDTO = await dbConnection('incidents')
        .join('ongs', { 'incidents.ong_id': 'ongs.id' })
        .where('incidents.id', id)
        .select(
          'incidents.*',
          'ongs.name',
          'ongs.email',
          'ongs.whatsapp',
          'ongs.cidade',
          'ongs.uf'
        )
        .first();

      return res.json(incident);
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

      return res.json(incident);
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
