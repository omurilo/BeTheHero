import { Router } from 'express';

import {
  OngController,
  IncidentsController,
  SessionController,
} from 'controllers';

import { Authentication, Validation } from 'middlewares';
import { Ongs, Incidents } from 'validators';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    req,
    message: 'Typescript man, estamos aprendendo! Tipando tudo hauhauha!',
  });
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
routes.delete('/ongs', Validation(Ongs.deleteOngSchema), OngController.delete);

routes.post(
  '/incidents',
  Validation(Incidents.createIncidentSchema),
  IncidentsController.create
);
routes.put(
  '/incidents/:id',
  Validation(Incidents.updateIncidentSchema),
  IncidentsController.update
);
routes.delete(
  '/incidents/:id',
  Validation(Incidents.deleteIncidentSchema),
  IncidentsController.delete
);

export default routes;
