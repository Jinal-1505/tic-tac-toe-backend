import { Router } from 'express';
const indexRouter = Router();

import authRouter from './auth.route.js';

indexRouter.use('/auth', authRouter);

export default indexRouter;
