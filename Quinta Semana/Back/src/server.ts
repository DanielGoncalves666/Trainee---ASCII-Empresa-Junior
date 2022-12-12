import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);
// Routes se torna um middleware, todas as rotas são adicionadas aqui

app.listen(3333, () => {
	console.log('Server Started on port 3333!');
});
