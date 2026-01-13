import { Report } from "../models/report.model.js";
import { Cost } from "../models/cost.model.js";
import logger from "../config/logger.js";

const getReport = async (req, res) => {
    const { year, month } = req.query; 
    const userid = Number(req.user.userid); 
    const url = "/api/reports";

    try {
        if (!year || !month) {
            return res.status(400).json({ message: "Year and month are required" });
        }

        // 1. הגדרת טווח תאריכים לשאילתה
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59);

        // 2. שליפת ההוצאות העדכניות מה-DB
        const relevantCosts = await Cost.find({ 
            userid,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });

        // 3. בדיקה אם קיים דו"ח שמור
        const existingReport = await Report.findOne({ userid, year: Number(year), month: Number(month) });

        if (existingReport) {
            // ספירת כמות ההוצאות שרשומות בתוך הדו"ח הקיים
            const expensesInReport = Object.values(existingReport.data).flat().length;

            // אם הכמות שווה, הדו"ח מעודכן - נחזיר אותו
            if (expensesInReport === relevantCosts.length) {
                logger.info({ method: 'GET', url, status: 200, userid }, "Report up to date");
                return res.status(200).json(existingReport); // החזרת כל האובייקט
            }
            
            // אם לא שווה, נמחק את הדו"ח הישן
            await Report.deleteOne({ _id: existingReport._id });
        }

        // 4. בניית הדו"ח מחדש
        const categories = { food: [], health: [], housing: [], sports: [], education: [] };
        let totalSum = 0;

        relevantCosts.forEach(cost => {
            if (categories[cost.category]) {
                categories[cost.category].push({
                    day: new Date(cost.createdAt).getDate(),
                    description: cost.description,
                    sum: cost.sum,
                    currency: cost.currency
                });
            }
        });

        // 5. יצירת דו"ח חדש ומעודכן
        const newReport = await Report.create({
            userid,
            year: Number(year),
            month: Number(month),
            data: categories
        });
        return res.status(201).json(newReport);


    } catch (error) {
        logger.error({ method: 'GET', url, status: 500 }, error.message);
        res.status(500).json({ message: error.message });
    }
};

export { getReport };