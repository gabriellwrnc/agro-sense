import jwt from 'jsonwebtoken';
import { RefreshToken } from '../models';

export const createAccessToken = userId => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5m',
    });
};

export const checkExpiredToken = refreshToken => {
    try {
        const payload = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        );
        return { payload: payload, isExpired: false };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const payload = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                {
                    ignoreExpiration: true,
                },
            );
            return {
                payload: payload,
                isExpired: true,
            };
        }
    }
};

export const createAndSaveRefreshToken = async firebaseId => {
    try {
        const refreshToken = jwt.sign(
            { id: firebaseId },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' },
        );

        const newRefreshToken = new RefreshToken({
            firebaseId,
            refreshToken,
        });

        await newRefreshToken.save();

        return refreshToken;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'fail', message: error });
    }
};