import ApiError from '../../utils/apiError.js';

export const validateReportQuery = (query) => {
    const { year, month } = query;

    if (!year || !month) {
        throw new ApiError(400, 'Year and month are required');
    }

    return { year: Number(year), month: Number(month) };
};
