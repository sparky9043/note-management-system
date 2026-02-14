import express from 'express';
import pingRouter from './router/ping';

const app = express();

app.use('/api/ping', pingRouter);

export default app;