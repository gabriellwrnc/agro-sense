import { Router } from 'express';
import multer from 'multer';
import {
    addPest,
    addPestImage,
    addSolution,
    addSymptom,
    addVerifiedCase,
    getAllCases,
    getAllSolutions,
    getAllUsers,
    getCaseById,
    getUserByEmail,
    verifiedCase,
} from '../controllers';

const adminRouter = Router();
const upload = multer();

adminRouter.post('/addSymptom', addSymptom);
adminRouter.post('/addSolution', addSolution);
adminRouter.post('/addPest', addPest);
adminRouter.post('/addPestImage', upload.single('image'), addPestImage);
adminRouter.post('/addVerifiedCase', addVerifiedCase);
adminRouter.get('/getAllUsers', getAllUsers);
adminRouter.get('/getAllCases', getAllCases);
adminRouter.get('/getAllSolutions', getAllSolutions);
adminRouter.get('/getCaseById', getCaseById);
adminRouter.post('/verifiedCase', verifiedCase);
adminRouter.get('/getUserByEmail', getUserByEmail);

export default adminRouter;
