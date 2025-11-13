
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'

import { corsConfig } from './config/corsConfig.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors(corsConfig)); // per le richieste cross-origin
app.use(express.json()) // per il body parser
app.use(express.urlencoded({ extended: true }));  // per il body parser
app.use(cookieParser()); // per i cookie

app.use('/auth', authRoutes);

export default app;