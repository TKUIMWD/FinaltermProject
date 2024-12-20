require('dotenv').config()
import jwt from 'jsonwebtoken';

export const generateToken = (_id: string): string => {
    return jwt.sign({ _id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
