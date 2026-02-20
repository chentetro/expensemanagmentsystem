/**
 * Controller: report request handlers.
 */

import logger from '../../config/logger.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { buildOrGetMonthlyReport } from './report.service.js';
import { validateReportQuery } from './report.validator.js';

export const getReport = asyncHandler(async (req, res) => {
    const userid = Number(req.user.userid);
    const { year, month } = validateReportQuery(req.query);

    const { report, fromCache } = await buildOrGetMonthlyReport(userid, year, month);

    logger.info(
        { method: 'GET', url: '/api/reports', status: fromCache ? 200 : 201, userid },
        fromCache ? 'Report up to date' : 'Report generated successfully'
    );

    res.status(fromCache ? 200 : 201).json(report);
});
