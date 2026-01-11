import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '1d' }
    );
}

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
}

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
        throw new Error('Invalid access token');
    }
}

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
}