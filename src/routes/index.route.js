import { Router } from 'express';
const indexRouter = Router();

import authRouter from './auth.route.js';
import gameRoomRouter from './gameRoom.route.js';
import leaderboardRouter from './leaderboard.route.js';

indexRouter.use('/auth', authRouter);
indexRouter.use('/gameRoom', gameRoomRouter);
indexRouter.use('/leaderboard', leaderboardRouter);

export default indexRouter;
