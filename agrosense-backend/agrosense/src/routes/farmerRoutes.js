import { Router } from 'express';
import { consultate } from '../controllers';

const farmerRouter = Router();

farmerRouter.post('/consultate', consultate);

export default farmerRouter;
