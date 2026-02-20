/**
 * Middleware: 404 handler and global error handler.
 */

import logger from '../config/logger.js';
import ApiError from '../utils/apiError.js';

export const notFoundHandler = (req, res, next) => {
    next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    logger.error(
        {
            method: req.method,
            url: req.originalUrl,
            status: statusCode,
            userid: req.user?.userid
        },
        message
    );

    res.status(statusCode).json({ message });
};
