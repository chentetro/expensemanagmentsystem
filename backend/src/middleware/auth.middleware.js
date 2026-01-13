import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

export const verifyToken = (req, res, next) => {
    // 1. חילוץ הטוקן מהעוגיות במקום מה-Header
    // שימי לב: זה דורש התקנה של 'cookie-parser' ב-app.js
    const token = req.cookies.token; 

    // 2. בדיקה אם הטוקן קיים
    if (!token) {
        logger.warn({ 
            method: req.method, 
            url: req.originalUrl, 
            status: 401 
        }, "Access denied: No token found in cookies");
        
        return res.status(401).json({ message: "Access denied. Please log in." });
    }

    try {
        // 3. אימות הטוקן נשאר אותו דבר
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. הזרקת נתוני המשתמש
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