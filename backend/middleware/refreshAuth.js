import jwt from 'jsonwebtoken';
import RefreshToken from '../models/RefreshToken.js';

export const validateRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const tokenExists = await RefreshToken.findOne({
            token: refreshToken,
            user: decoded.id
        });

        if (!tokenExists) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        if (tokenExists.expiresAt < new Date()) {
            await RefreshToken.deleteOne({ _id: tokenExists._id });
            return res.status(401).json({ message: 'Refresh token expired' });
        }

        req.userId = decoded.id;
        req.refreshToken = refreshToken;

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Refresh token expired' });
        }
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};