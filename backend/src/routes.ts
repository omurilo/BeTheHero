import { Router } from 'express';

import {
  OngController,
  IncidentsController,
  SessionController,
} from 'controllers';

import { Authentication, Validation } from 'middlewares';
import { Ongs } from 'validators';

const routes = Router();

routes.get('/', (req, res) => {
  return res.send('Typescript man, é nois!');
});

/** Public Routes */
routes.post('/login', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', Validation(Ongs.createOngSchema), OngController.create);

routes.get('/incidents', IncidentsController.index);
routes.get('/incidents/:id', IncidentsController.show);

/** Private Routes */
routes.use(Authentication);

routes.get('/profile', OngController.show);
routes.put('/ongs', Validation(Ongs.updateOngSchema), OngController.update);
routes.delete('/ongs', OngController.delete);

routes.post('/incidents', IncidentsController.create);
routes.put('/incidents/:id', IncidentsController.update);
routes.delete('/incidents/:id', IncidentsController.delete);

export default routes;
