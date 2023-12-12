import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import jwt from 'jsonwebtoken';
import { RefreshToken, User } from '../models';
import {
    checkExpiredToken,
    createAccessToken,
    createAndSaveRefreshToken,
    firebaseAuth,
} from '../utils';

export const signUp = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    try {
        const firebaseResponse = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
        );

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(409)
                .json({ status: 'fail', message: 'Email already exist' });
        }

        const newUser = new User({
            name,
            email,
            phoneNumber,
            role: 'farmer',
            firebaseId: firebaseResponse.user.uid,
        });

        await newUser.save();

        res.status(200).json({ status: 'success' });
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            return res
                .status(409)
                .json({ status: 'fail', message: 'Email already exist' });
        }

        if (error.code === 'auth/invalid-email') {
            return res
                .status(400)
                .json({ status: 'fail', message: 'Invalid email' });
        }

        if (error.code === 'auth/invalid-credential') {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid credentials',
            });
        }

        res.status(500).json({ status: 'fail', message: error });
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const firebaseResponse = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
        );

        const user = await User.findOne({
            firebaseId: firebaseResponse.user.uid,
        });

        if (!user) {
            return res
                .status(404)
                .json({ status: 'fail', message: 'User not found' });
        }

        const accessToken = createAccessToken(user.firebaseId);
        const refreshToken = await createAndSaveRefreshToken(user.firebaseId);

        res.status(200).json({
            status: 'success',
            data: user,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.log('error', error);
        if (error.code === 'auth/user-not-found') {
            return res
                .status(404)
                .json({ status: 'fail', message: 'User not found' });
        }

        if (error.code === 'auth/wrong-password') {
            return res
                .status(402)
                .json({ status: 'fail', message: 'Invalid credentials' });
        }

        if (error.code === 'auth/invalid-login-credentials') {
            return res
                .status(402)
                .json({ status: 'fail', message: 'Invalid credentials' });
        }

        res.status(500).json({ status: 'fail', message: error });
    }
};

export const getNewToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken)
        return res
            .status(401)
            .json({ status: 'fail', message: 'Access denied, token missing!' });

    try {
        const decodedToken = checkExpiredToken(refreshToken);
        if (decodedToken.isExpired) {
            await RefreshToken.findOneAndDelete({
                firebaseId: decodedToken.payload.id,
                refreshToken,
            });
            const newRefreshToken = await createAndSaveRefreshToken(
                decodedToken.payload.id,
            );
            const accessToken = createAccessToken(decodedToken.payload.id);

            return res.status(200).json({
                status: 'success',
                accessToken,
                refreshToken: newRefreshToken,
            });
        }

        const accessToken = jwt.sign(
            { id: decodedToken.payload.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' },
        );

        res.status(200).json({ status: 'success', accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', message: error });
    }
};
