/**
 * Middleware: JWT token verification from cookies.
 */

import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

export const verifyToken = (req, res, next) => {
    // 1. Extract token from cookies instead of the Authorization header
    // Note: this requires 'cookie-parser' to be configured in app.js
    const token = req.cookies.token; 

    // 2. Validate token presence
    if (!token) {
        logger.warn({ 
            method: req.method, 
            url: req.originalUrl, 
            status: 401 
        }, "Access denied: No token found in cookies");
        
        return res.status(401).json({ message: "Access denied. Please log in." });
    }

    try {
        // 3. Verify token (same logic as before)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Attach decoded user payload to the request
        req.user = decoded;
        
        next();
    } catch (error) {
        logger.error({ 
            method: req.method, 
            url: req.originalUrl, 
            status: 403 
        }, "Invalid token in cookie");
        
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};