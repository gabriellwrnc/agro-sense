import { Router } from 'express';
import { getAllSymptoms } from '../controllers';

const symptomRouter = Router();

symptomRouter.get('/', getAllSymptoms);

export default symptomRouter;
