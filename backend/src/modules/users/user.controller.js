/**
 * Controller: user request handlers for registration and auth.
 */

import logger from '../../config/logger.js';
import asyncHandler from '../../utils/asyncHandler.js';
import {
    authenticateUser,
    createUser,
    findUserById
} from './user.service.js';
import {
    validateLoginInput,
    validateRegisterInput
} from './user.validator.js';

export const addUser = asyncHandler(async (req, res) => {
    const payload = validateRegisterInput(req.body);
    const user = await createUser(payload);

    logger.info(
        { method: 'POST', url: '/api/users/add', status: 201, userid: payload.id },
        'New user created successfully'
    );

    res.status(201).json(user);
});

export const loginUser = asyncHandler(async (req, res) => {
    const payload = validateLoginInput(req.body);
    const { token, user } = await authenticateUser(payload);

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });

    logger.info(
        { method: 'POST', url: '/api/users/login', status: 200, userid: user.id },
        'User logged in successfully'
    );

    res.status(200).json({
        message: 'Login successful',
        user
    });
});

export const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    logger.info(
        { method: 'POST', url: '/api/users/logout', status: 200, userid: req.user?.userid || 'N/A' },
        'User logged out successfully'
    );
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getUser = asyncHandler(async (req, res) => {
    const user = await findUserById(Number(req.user.userid));

    logger.info(
        { method: 'GET', url: '/api/users/me', status: 200, userid: req.user.userid },
        'Fetched user data successfully'
    );

    res.status(200).json(user);
});
