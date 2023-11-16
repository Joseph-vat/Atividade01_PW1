import express from 'express';
import { routesTechnology } from './routerTechnology';
import { routesUser } from './routerUser';

const routes = express();

routes.use(routesTechnology);
routes.use(routesUser);

export { routes };