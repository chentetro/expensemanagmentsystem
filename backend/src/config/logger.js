//הקובץ שבו נגדיר את ה-Pino ונגיד לו לשלוח את הנתונים ל-MongoDB.
import 'dotenv/config';
import pino from 'pino';

// הגדרת הלוגר
const logger = pino({
    level: 'info', // רמת הפירוט המינימלית שנשמור
    base: { service: 'expense-management-system' }, // שם השירות שלנו
    timestamp: pino.stdTimeFunctions.isoTime, // פורמט זמן קריא
}, 
// כאן אנחנו אומרים לו לשלוח את הנתונים ל-MongoDB
pino.transport({
    target: 'pino-mongodb',
    options: {
        uri: process.env.MONGODB_URI, // משתמש בכתובת של ה-DB שלך מהקובץ .env
        collection: 'logs', // שם הטבלה שבה יישמרו הלוגים
    },
}));

export default logger;