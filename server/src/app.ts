import express from 'express';
import pingRouter from './router/ping';
import notesRouter from './router/notes';
import middleware from './utils/middleware';

const app = express();
app.use(express.json());

app.use('/api/ping', pingRouter);
app.use('/api/notes', notesRouter);

app.use(middleware.errorHandler);

export default app;