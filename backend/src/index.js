import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';
import cors from 'cors';

app.use(cors());

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) => {
            console.log("error", error);
            throw error;
        });

        // שימוש ב-Backticks כדי שהפורט יוצג נכון
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`server running on port ${port}`);

        });
    } catch (error) {
        console.log('error starting server:', error);
    }
};

// חשוב: הקריאה לפונקציה חייבת להיות מחוץ לסוגריים שלה!
startServer();