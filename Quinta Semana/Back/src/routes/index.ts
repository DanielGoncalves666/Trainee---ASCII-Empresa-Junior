import {Router} from 'express';

// eslint-disable-next-line new-cap
const routes = Router();

routes.get('/', (request, response) => response.json({message: 'Hello GoStack'}));

export default routes;
