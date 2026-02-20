/**
 * Validator: user registration and login input validation.
 */

import ApiError from '../../utils/apiError.js';

export const validateRegisterInput = (body) => {
    const { id, first_name, last_name, email, password, birthday } = body;

    if (!id || !first_name || !last_name || !email || !password || !birthday) {
        throw new ApiError(400, 'All fields are required');
    }

    const parsedId = Number(id);
    if (Number.isNaN(parsedId)) {
        throw new ApiError(400, 'ID must be a valid number');
    }

    return { id: parsedId, first_name, last_name, email, password, birthday };
};

export const validateLoginInput = (body) => {
    const { email, password } = body;

    if (!email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    return { email, password };
};
