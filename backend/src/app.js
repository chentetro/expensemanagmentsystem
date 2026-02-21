// "/*
//  * Express app: middleware, routes, CORS, and error handling.
//  */

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './modules/users/user.routes.js';
import costRouter from './modules/costs/cost.routes.js';
import reportRouter from './modules/reports/report.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: 'https://expensemanagmentsystem-frontend.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use("/api/users", userRouter);
app.use("/api/costs", costRouter);
app.use("/api/reports", reportRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;