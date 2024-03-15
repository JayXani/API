/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { resolve } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import './src/database'; // Assim que esse módulo for chamado o index.js do database é executado
import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRouter from './src/routes/userRoutes';
import tokenRouter from './src/routes/tokenRoutes';
import studentRoutes from './src/routes/studentRoutes';
import uploadRoutes from './src/routes/uploadRoutes';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user', userRouter);
    this.app.use('/token', tokenRouter);
    this.app.use('/student', studentRoutes);
    this.app.use('/upload', uploadRoutes);
  }
}
export default new App().app;
