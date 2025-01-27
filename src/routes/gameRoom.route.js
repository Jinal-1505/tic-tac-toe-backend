// User Management Routes
import { ValidateUser } from '../middlewares/auth.middleware.js';
import { createGameRoom, joinGameRoom, listActiveRoom } from '../controllers/gameRoom.controller.js';
import { Router } from 'express';

const gameRoomRouter = Router();
export default gameRoomRouter;

//Create Game Room
gameRoomRouter.route('/').post(ValidateUser, createGameRoom);

//Join Game Room
gameRoomRouter.route('/join').post(ValidateUser, joinGameRoom);

//List Active Room
gameRoomRouter.route('/list').get(ValidateUser, listActiveRoom);
