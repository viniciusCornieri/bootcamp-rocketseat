import express, { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import uploadConfig from '../config/upload';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/files', express.static(uploadConfig.directory));
routes.use('/appointments', appointmentsRouter);

export default routes;
