import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import path from "path";

const environment = process.env.NODE_ENV || 'LOCAL';
dotenv.config({ path: path.join(__dirname, '..', '..', `.env.${environment}`) })

const credentials = {
    apiKey: process.env.FIREBASE_PROJECT_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_PROJECT_STORAGE_BUCKET,
};

const app = initializeApp(credentials);
const firebaseAuth = getAuth(app);

export default firebaseAuth;