import { Router } from 'express';
import { getNewToken, signIn, signUp } from '../controllers';

const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/signIn', signIn);
authRouter.post('/getNewToken', getNewToken);

export default authRouter;