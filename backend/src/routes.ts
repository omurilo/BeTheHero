import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.send('Typescript man, é nois!');
});

export default routes;
