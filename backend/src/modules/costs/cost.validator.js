/**
 * Validator: request validation for cost create/update.
 */

import { ALLOWED_CURRENCIES, COST_CATEGORIES } from '../../constants/enums.js';
import ApiError from '../../utils/apiError.js';

export const validateCreateCostInput = (body) => {
    const { description, category, sum, currency, date } = body;

    if (!description || !category || sum === undefined || !currency) {
        throw new ApiError(400, 'Description, category, sum, currency are required');
    }

    if (!COST_CATEGORIES.includes(category)) {
        throw new ApiError(400, 'Invalid category');
    }

    if (!ALLOWED_CURRENCIES.includes(currency)) {
        throw new ApiError(400, 'Invalid currency. Allowed: USD, ILS, GBP, EUR');
    }

    if (Number(sum) <= 0) {
        throw new ApiError(400, 'Sum must be a positive number');
    }

    return {
        description,
        category,
        sum: Number(sum),
        currency,
        date
    };
};

export const validateUpdateCostInput = (body) => {
    const { description, category, sum, currency } = body;

    if (category && !COST_CATEGORIES.includes(category)) {
        throw new ApiError(400, 'Invalid category');
    }

    if (currency && !ALLOWED_CURRENCIES.includes(currency)) {
        throw new ApiError(400, 'Invalid currency');
    }

    if (sum !== undefined && Number(sum) <= 0) {
        throw new ApiError(400, 'Sum must be a positive number');
    }

    return {
        description,
        category,
        sum: sum !== undefined ? Number(sum) : undefined,
        currency
    };
};
