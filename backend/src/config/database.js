import mongoose from'mongoose';
import logger from "../config/logger.js"; // Logger import

const connectDB= async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        logger.info(`mongodb connected: ${connectionInstance.connection.host}`);
        console.log(`mongodb connected: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        logger.error('error connecting to mongodb:',error);
        console.error('error connecting to mongodb:',error);
        process.exit(1);
        
    }
}
export default connectDB;