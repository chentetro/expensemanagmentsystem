import express from 'express';
import cors from 'cors'; // מומלץ להוסיף כדי לאפשר חיבור מהפרונט בעתיד
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import costRouter from './routes/cost.routes.js';
import reportRouter from './routes/report.routes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: true,
    credentials: true 
})); // מאפשר גישה מדפדפנים שונים

// הגדרת הנתיבים - שינוי מ-"/api/users" ל-"/api" כדי לעמוד בדרישות
app.use("/api/users", userRouter);
app.use("/api/costs", costRouter);
app.use("/api/reports", reportRouter);


export default app;