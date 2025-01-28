import { Router } from 'express';
import { signUp, signIn, logout } from '../controllers/auth.controller.js';
const authRouter = Router();

export default authRouter;

//auth routes
authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/logout', logout);
