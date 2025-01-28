import { Router } from 'express';
import { getLeaderBoard } from '../controllers/leaderboard.controller.js';
const leaderboardRouter = Router();

export default leaderboardRouter;

//leaderBoard routes
leaderboardRouter.get('/', getLeaderBoard);
