import { Router } from 'express';
import multer from 'multer';
import { addPest, addPestImage, addSolution, addSymptom } from '../controllers';

const adminRouter = Router();
const upload = multer();

adminRouter.post('/addSymptom', addSymptom);
adminRouter.post('/addSolution', addSolution);
adminRouter.post('/addPest', addPest);
adminRouter.post('/addPestImage', upload.single('image'), addPestImage);

export default adminRouter;
