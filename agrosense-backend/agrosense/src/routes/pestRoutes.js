import { Router } from 'express';
import { getAllPests } from '../controllers';

const pestRouter = Router();

pestRouter.get('/', getAllPests);

export default pestRouter;
