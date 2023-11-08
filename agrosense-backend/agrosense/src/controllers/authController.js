import {
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseAuth } from '../utils';
import { User } from '../models';

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
            role: 'user',
            firebaseId: firebaseResponse.user.uid,
        });

        await newUser.save();

        res.status(200).json({ status: 'success', message: firebaseResponse.user });
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

        res.status(500).json({ status: 'fail', message: error });
    }
}