/**
 * Config: Pino logger with MongoDB transport.
 */

import 'dotenv/config';
import pino from 'pino';

// Logger setup
const logger = pino({
    level: 'info', // Minimum log level to persist
    base: { service: 'expense-management-system' }, // Service name
    timestamp: pino.stdTimeFunctions.isoTime, // Human-readable timestamp format
}, 
// Configure transport target for MongoDB
pino.transport({
    target: 'pino-mongodb',
    options: {
        uri: process.env.MONGODB_URI, // Uses DB connection URI from .env
        collection: 'logs', // Collection where logs are stored
    },
}));

export default logger;