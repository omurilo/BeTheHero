import { Router } from 'express';

import { OngController, SessionController } from 'controllers';

import { Authentication } from 'middlewares';

const routes = Router();

routes.get('/', (req, res) => {
  return res.send('Typescript man, é nois!');
});

/** Public Routes */
routes.post('/login', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

/** Private Routes */
routes.use(Authentication);

routes.put('/ongs', OngController.update);
routes.delete('/ongs', OngController.delete);

export default routes;
