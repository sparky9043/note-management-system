import express from 'express';
import pingRouter from './router/ping';
import notesRouter from './router/notes';

const app = express();
app.use(express.json());

app.use('/api/ping', pingRouter);
app.use('/api/notes', notesRouter);

export default app;