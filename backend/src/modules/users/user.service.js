import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user.model.js';
import ApiError from '../../utils/apiError.js';

const sanitizeUser = (userDoc) => {
    const user = userDoc.toObject();
    delete user.password;
    return user;
};

export const createUser = async ({ id, first_name, last_name, email, password, birthday }) => {
    const existingUser = await User.findOne({ $or: [{ id }, { email }] });
    if (existingUser) {
        throw new ApiError(409, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        id,
        first_name,
        last_name,
        email,
        password: hashedPassword,
        birthday
    });

    return sanitizeUser(newUser);
};

export const authenticateUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid password');
    }

    const token = jwt.sign(
        { userid: user.id },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '24h' }
    );

    return {
        token,
        user: sanitizeUser(user)
    };
};

export const findUserById = async (userid) => {
    const user = await User.findOne({ id: userid });
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return sanitizeUser(user);
};
