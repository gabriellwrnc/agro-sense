import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import * as rfs from 'rotating-file-stream';
import { authRouter } from './routes';

const app = express();
const environment = process.env.NODE_ENV || 'LOCAL';
dotenv.config({ path: path.join(__dirname, '..', `.env.${environment}`) })


const port = process.env.PORT;
const db = process.env.DATABASE_URL;
const logDirectory = path.join(__dirname, 'logs');

console.log('port', port)
console.log('process.env.FIREBASE_PROJECT_API_KEY', process.env.FIREBASE_PROJECT_API_KEY)

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory,
});

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream }));

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

app.use('/api/auth', authRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});