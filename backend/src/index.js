import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

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

        // Use backticks so the port is interpolated correctly
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`server running on port ${port}`);

        });
    } catch (error) {
        console.log('error starting server:', error);
    }
};

// Important: keep the function call outside its declaration block
startServer();