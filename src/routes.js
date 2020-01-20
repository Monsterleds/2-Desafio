import { Router } from 'express';

import auth from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.use(auth);
routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);

export default routes;
