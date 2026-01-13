import { Cost } from "../models/cost.model.js";
import logger from "../config/logger.js";
import { Report } from "../models/report.model.js";

const addCost = async (req, res) => {
    const userid = Number(req.user.userid);
    const url = "/api/costs/add";
    // עדכון: הוספת currency לחילוץ מה-Body
    const { description, category, sum, currency, date } = req.body;

    try {
        // 1. ולידציה בסיסית (הוספתי בדיקה ל-currency)
        if (!description || !category || sum === undefined || !currency )  {
            return res.status(400).json({ message: "Description, category, sum, currency are required"});
        }

        // 2. בדיקת קטגוריה
        const existenum = ['food', 'health', 'housing', 'sports', 'education'];
        if (!existenum.includes(category)) {
            return res.status(400).json({ message: "Invalid category" });
        }

        // --- שינוי חדש: בדיקת מטבע תקין לפי דרישות הפרויקט ---
        const allowedCurrencies = ['USD', 'ILS', 'GBP', 'EURO'];
        if (!allowedCurrencies.includes(currency)) {
            return res.status(400).json({ message: "Invalid currency. Allowed: USD, ILS, GBP, EURO" });
        }

        // 3. בדיקת תקינות הסכום
        if (Number(sum) <= 0) {
            logger.warn({ method: 'POST', url, status: 400, userid }, `Invalid sum attempted: ${sum}`);
            return res.status(400).json({ message: "Sum must be a positive number" });
        }

        // 4. יצירת ההוצאה (כולל המטבע)
        const newCost = await Cost.create({
            userid,
            description,
            category,
            sum: Number(sum),
            currency, // נשמר ב-DB כפי שנדרש
            createdAt: date ? new Date(date) : new Date()
        });

        logger.info({ method: 'POST', url, status: 201, userid }, "Cost item added successfully");
        return res.status(201).json(newCost.toObject());

    } catch (error) {
        logger.error({ method: 'POST', url, status: 500, userid }, error.message);
        res.status(500).json({ message: error.message });
    }
};

const deleteCost = async (req, res) => {
    const { id } = req.params;
    const userid = Number(req.user.userid);
    const url = `/api/costs/delete/${id}`;
    try {
        const deletedCost = await Cost.findOneAndDelete({ _id: id, userid: userid });
        if (!deletedCost) {
            logger.warn({ method: 'DELETE', url, status: 404, userid }, "Cost not found or unauthorized");
            return res.status(404).json({ message: "Cost item not found or you are not authorized" });
        }

        const costDate = new Date(deletedCost.createdAt);
        await Report.findOneAndDelete({
            userid,
            year: costDate.getFullYear(),
            month: costDate.getMonth() + 1
        });

        logger.info({ method: 'DELETE', url, status: 200, userid }, "Cost deleted and report cache cleared");
        return res.status(200).json({ message: "Cost deleted successfully" });
    } catch (error) {
        logger.error({ method: 'DELETE', url, status: 500, userid }, error.message);
        res.status(500).json({ message: error.message });
    }
};

const updateCost = async (req, res) => {
    const { id } = req.params;
    const userid = Number(req.user.userid);
    // עדכון: הוספת currency
    const { description, category, sum, currency } = req.body;
    const url = `/api/costs/update/${id}`;

    try {
        const existenum = ['food', 'health', 'housing', 'sports', 'education'];
        if (category && !existenum.includes(category)) {
            return res.status(400).json({ message: "Invalid category" });
        }

        // ולידציה למטבע בעדכון
        const allowedCurrencies = ['USD', 'ILS', 'GBP', 'EURO'];
        if (currency && !allowedCurrencies.includes(currency)) {
            return res.status(400).json({ message: "Invalid currency" });
        }

        if (sum !== undefined && Number(sum) <= 0) {
            return res.status(400).json({ message: "Sum must be a positive number" });
        }

        const updatedCost = await Cost.findOneAndUpdate(
            { _id: id, userid }, 
            // עדכון השדות כולל currency
            { description, category, sum: sum !== undefined ? Number(sum) : undefined, currency },
            { new: true, runValidators: true } 
        );

        if (!updatedCost) {
            return res.status(404).json({ message: "Cost not found or unauthorized" });
        }

        const costDate = new Date(updatedCost.createdAt);
        await Report.findOneAndDelete({ 
            userid, 
            year: costDate.getFullYear(), 
            month: costDate.getMonth() + 1 
        });

        logger.info({ method: 'PUT', url, status: 200, userid }, "Cost updated and report cache cleared");
        return res.status(200).json(updatedCost);

    } catch (error) {
        logger.error({ method: 'PUT', url, status: 500, userid }, error.message);
        res.status(500).json({ message: error.message });
    }
};

const getCosts = async (req, res) => {
    const userid = Number(req.user.userid);
    const url = "/api/costs/list";
    try{
        const costs =  await Cost.find
        ({userid});
        logger.info({method: 'GET', url, status:200, userid}, "Fetched costs successfully");
        return res.status(200).json(costs);
    } catch (error){
        logger.error({method: 'GET', url, status:500, userid}, error.message);
        res.status(500).json({message: error.message});
    }
}

export { addCost, deleteCost, updateCost, getCosts };