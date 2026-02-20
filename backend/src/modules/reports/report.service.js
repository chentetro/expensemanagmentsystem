import { Cost } from '../../models/cost.model.js';
import { Report } from '../../models/report.model.js';

export const buildOrGetMonthlyReport = async (userid, year, month) => {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);

    const relevantCosts = await Cost.find({
        userid,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const existingReport = await Report.findOne({ userid, year, month });
    if (existingReport) {
        const expensesInReport = Object.values(existingReport.data).flat().length;
        if (expensesInReport === relevantCosts.length) {
            return { report: existingReport, fromCache: true };
        }

        await Report.deleteOne({ _id: existingReport._id });
    }

    const categories = { food: [], health: [], housing: [], sports: [], education: [] };

    relevantCosts.forEach((cost) => {
        if (categories[cost.category]) {
            categories[cost.category].push({
                day: new Date(cost.createdAt).getDate(),
                description: cost.description,
                sum: cost.sum,
                currency: cost.currency
            });
        }
    });

    const newReport = await Report.create({
        userid,
        year,
        month,
        data: categories
    });

    return { report: newReport, fromCache: false };
};
